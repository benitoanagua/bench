/**
 * Pure parser for the omnibar filter/command grammar (spec §4.1).
 *
 * Grammar:
 *
 *   comando        := filtro (conector filtro)* | accion_macro | limpieza | busqueda_libre
 *   filtro         := campo operador? valor
 *   operador       := ":" | ":>" | ":<" | ":>=" | ":<="
 *   conector       := " " (AND implicit) | " or " (OR explicit)
 *   accion_macro   := "run:" nombre_macro | nombre_macro_corto
 *   limpieza       := "clear"
 *   valor          := texto libre (case-insensitive, partial) | numero | fecha ISO
 *   nombre_macro_corto := "m" + entero (m1, m2, ...)
 *
 * The parser is pure: no DOM, no timers, no side effects. The result is an
 * AST the consumer (bch-omnibar or the app) walks to interpret the query.
 * Unknown fields produce an explicit error node — never a silent failure —
 * with the message defined in the spec, e.g.
 * `no existe el campo 'monto' en esta vista`.
 */

/** Function index entry as defined by the `bench.functions.json` manifest (§4.1). */
export type BchFunctionEntry = {
  /** Stable identifier; never changes between versions */
  id: string;
  nombre: string;
  /** Breadcrumb, e.g. ["Facturación", "Ventas", "Nueva factura"] */
  path: string[];
  sinonimos?: string[];
  /** Short user/admin-defined alias with absolute priority over fuzzy match */
  alias?: string;
  permisos?: string[];
  tipo: 'pantalla' | 'accion' | 'macro' | 'reporte';
  frecuenciaUso?: number;
};

export type BchOmniFilterValue = string | number | Date | null;

export type BchOmniFilterNode = {
  kind: 'filter';
  field: string;
  op: ':' | ':>' | ':<' | ':>=' | ':<=';
  value: BchOmniFilterValue;
  raw: string;
};
export type BchOmniOrNode = { kind: 'or'; branches: BchOmniFilterNode[] };
export type BchOmniMacroNode = { kind: 'macro'; name: string; raw: string };
export type BchOmniClearNode = { kind: 'clear' };
export type BchOmniFreeTextNode = { kind: 'free-text'; text: string };
export type BchOmniErrorNode = {
  kind: 'error';
  message: string;
  raw: string;
};

export type BchOmniAst =
  | BchOmniFilterNode
  | BchOmniOrNode
  | BchOmniMacroNode
  | BchOmniClearNode
  | BchOmniFreeTextNode
  | BchOmniErrorNode;

const OPERATORS = [':>=', ':<=', ':>', ':<', ':'] as const;
const OR_SEPARATOR = /\s+or\s+/i;

/** Not a filter field: reserved command words that carry meaning on their own. */
const RESERVED_WORDS = new Set(['and', 'or', 'clear', 'run']);

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})(T.*)?$/;

function parseValue(raw: string): BchOmniFilterValue {
  const dateMatch = ISO_DATE.exec(raw);
  if (dateMatch) {
    const date = new Date(raw);
    if (!Number.isNaN(date.getTime())) return date;
  }
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  return raw;
}

function describeFirstNode(ast: BchOmniAst): string {
  switch (ast.kind) {
    case 'filter':
      return `${ast.field}${ast.op}${typeof ast.value === 'string' ? `'${ast.value}'` : String(ast.value)}`;
    case 'or':
      return ast.branches.map(describeFirstNode).join(' OR ');
    case 'macro':
      return `macro '${ast.raw}'`;
    case 'clear':
      return 'clear — limpiar filtros';
    case 'free-text':
      return ast.text;
    case 'error':
      return ast.message;
  }
}

/**
 * Human-readable interpretation of the query, for the live hint line the
 * omnibar shows under the input while typing (§4.1: "El dropdown muestra cómo
 * se interpretará el texto mientras se escribe").
 */
export function describeOmnibarQuery(ast: BchOmniAst): string {
  return describeFirstNode(ast);
}

function parseTerm(term: string, fields: string[] | undefined): BchOmniAst {
  // Macro short form: m + integer (m1, m2, ...)
  if (/^m\d+$/.test(term)) {
    return { kind: 'macro', name: term, raw: term };
  }
  // "run:" macro by name — only meaningful with a name after the prefix.
  if (/^run:.+/.test(term)) {
    return { kind: 'macro', name: term.slice(4), raw: term };
  }
  const colonIndex = term.indexOf(':');
  if (colonIndex > 0) {
    const field = term.slice(0, colonIndex);
    const rest = term.slice(colonIndex); // starts with ':'
    const op = OPERATORS.find((candidate) => rest.startsWith(candidate));
    if (op) {
      const valueRaw = rest.slice(op.length);
      if (fields && !fieldExists(field, fields)) {
        return {
          kind: 'error',
          message: `no existe el campo '${field}' en esta vista`,
          raw: term,
        };
      }
      return {
        kind: 'filter',
        field,
        op,
        value: valueRaw.length > 0 ? parseValue(valueRaw) : null,
        raw: term,
      };
    }
  }
  return { kind: 'free-text', text: term };
}

function fieldExists(field: string, fields: string[]): boolean {
  const wanted = field.toLowerCase();
  return fields.some((f) => f.toLowerCase() === wanted);
}

/**
 * Parse a full omnibar query into an AST.
 *
 * `fields` is the list of column identifiers visible in the current context;
 * when provided, any filter field not in the list produces an explicit
 * `{ kind: 'error' }` node (spec §4.1 — never a silent failure).
 *
 * implicit AND between groups: `a:1 b:2` → two filter nodes (the caller ANDs
 * them); `a:1 or b:2` → an `or` node with both filters as branches.
 */
export function parseOmnibar(text: string, fields?: string[]): BchOmniAst {
  const trimmed = text.trim();
  if (trimmed === '') return { kind: 'free-text', text: '' };

  // Whole-command precedences: limpieza and macro runs are not filters.
  if (/^run:.+$/i.test(trimmed)) {
    return { kind: 'macro', name: trimmed.slice(4), raw: trimmed };
  }
  if (/^m\d+$/i.test(trimmed)) {
    return { kind: 'macro', name: trimmed, raw: trimmed };
  }
  if (/^clear$/i.test(trimmed)) {
    return { kind: 'clear' };
  }

  const groups = trimmed.split(OR_SEPARATOR);
  if (groups.length > 1) {
    const branches: BchOmniFilterNode[] = [];
    for (const group of groups) {
      let allTermsParse = true;
      for (const term of group.split(/\s+/).filter(Boolean)) {
        const ast = parseTerm(term, fields);
        if (ast.kind === 'error') return ast;
        if (ast.kind === 'filter') branches.push(ast);
        else allTermsParse = false;
      }
      if (!allTermsParse) {
        return { kind: 'free-text', text: trimmed };
      }
    }
    if (branches.length === 0) return { kind: 'free-text', text: trimmed };
    return { kind: 'or', branches };
  }

  // Single group: either filters ANDed with free text or just filters.
  // Any free-text term downgrades the whole query to a search.
  let filters: BchOmniAst[] = [];
  for (const term of trimmed.split(/\s+/).filter(Boolean)) {
    const ast = parseTerm(term, fields);
    if (ast.kind === 'error') return ast;
    if (ast.kind === 'filter') filters.push(ast);
    else return { kind: 'free-text', text: trimmed };
  }
  if (filters.length === 0) return { kind: 'free-text', text: trimmed };
  if (filters.length === 1) return filters[0];
  return {
    kind: 'or',
    branches: filters.filter((n): n is BchOmniFilterNode => n.kind === 'filter'),
  };
}
