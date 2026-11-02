/**
 * Ranking over the function index of §4.1 (ADR-009 tier b).
 *
 * The manifest (`bench.functions.json`) belongs to the application; these
 * helpers only order the entries it declares. They are pure: no DOM, no
 * timers, no network, no storage.
 *
 * Order of signals (from the spec §4.1):
 *
 * 1. exact alias — absolute priority, the user typed the shortcut;
 * 2. exact name;
 * 3. substring in the name, then in a synonym, then in the breadcrumb path;
 * 4. fuzzy match over the same haystacks.
 *
 * Ties are broken by usage frequency, then by recency, then by id so the
 * order is stable and reproducible.
 */
import { fuzzyScore, normalizeText } from './fuzzy.js';
import type { BchFunctionEntry } from './omnibar-parser.js';

export type { BchFunctionEntry };

/** Alias → entry. Aliases are unique per the manifest schema. */
export type AliasTable = ReadonlyMap<string, BchFunctionEntry>;

/** Which signal put an entry in the result list. */
export type RankReason = 'alias' | 'nombre' | 'sinonimo' | 'ruta' | 'fuzzy' | 'uso';

export type RankedFunction = {
  entry: BchFunctionEntry;
  score: number;
  reason: RankReason;
};

export type RankOptions = {
  /** Maximum number of results. Unlimited by default. */
  limit?: number;
  /** Prebuilt alias table; built from `entries` when omitted. */
  aliasTable?: AliasTable;
  /** Recently used entry ids, most recent first. */
  recentIds?: readonly string[];
};

/** Score of an exact alias match — wins over everything else. */
export const ALIAS_SCORE = 1000;
/** Score of an exact name match. */
export const NOMBRE_SCORE = 900;
/** Score of a substring match in the name. */
export const NOMBRE_SUBSTRING_SCORE = 700;
/** Score of a substring match in a synonym. */
export const SINONIMO_SUBSTRING_SCORE = 600;
/** Score of a substring match in the breadcrumb path. */
export const RUTA_SUBSTRING_SCORE = 500;
/** Maximum contribution of the fuzzy signal (below any substring match). */
export const FUZZY_MAX_SCORE = 400;

/**
 * Builds the alias table. The first entry that declares an alias wins, so a
 * duplicated alias never silently changes the target of an existing shortcut.
 */
export function buildAliasTable(entries: readonly BchFunctionEntry[]): AliasTable {
  const table = new Map<string, BchFunctionEntry>();
  for (const entry of entries) {
    if (!entry.alias) continue;
    const key = normalizeText(entry.alias);
    if (key === '' || table.has(key)) continue;
    table.set(key, entry);
  }
  return table;
}

/** Resolves an alias to its entry, ignoring case and diacritics. */
export function resolveAlias(table: AliasTable, alias: string): BchFunctionEntry | undefined {
  return table.get(normalizeText(alias));
}

function frequencyOf(entry: BchFunctionEntry): number {
  return entry.frecuenciaUso ?? 0;
}

/**
 * Orders the entries for a query. An empty query does not match anything: it
 * returns the whole index ordered by usage frequency and recency, which is the
 * "recent and frequent" view of §4.1.
 */
export function rankFunctions(
  entries: readonly BchFunctionEntry[],
  query: string,
  options: RankOptions = {},
): RankedFunction[] {
  const table = options.aliasTable ?? buildAliasTable(entries);
  const wanted = normalizeText(query);
  const recent = new Map<string, number>();
  (options.recentIds ?? []).forEach((id, index) => {
    if (!recent.has(id)) recent.set(id, options.recentIds!.length - index);
  });

  const ranked: RankedFunction[] = [];
  for (const entry of entries) {
    if (wanted === '') {
      ranked.push({ entry, score: frequencyOf(entry), reason: 'uso' });
      continue;
    }
    if (entry.alias && normalizeText(entry.alias) === wanted) {
      ranked.push({ entry, score: ALIAS_SCORE, reason: 'alias' });
      continue;
    }
    if (normalizeText(entry.nombre) === wanted) {
      ranked.push({ entry, score: NOMBRE_SCORE, reason: 'nombre' });
      continue;
    }
    const nombre = normalizeText(entry.nombre);
    const nombreIndex = nombre.indexOf(wanted);
    if (nombreIndex >= 0) {
      ranked.push({
        entry,
        score: NOMBRE_SUBSTRING_SCORE - Math.min(nombreIndex, 99),
        reason: 'nombre',
      });
      continue;
    }
    const sinonimos = (entry.sinonimos ?? []).map(normalizeText);
    const sinonimoIndex = sinonimos.findIndex((value) => value.includes(wanted));
    if (sinonimoIndex >= 0) {
      ranked.push({
        entry,
        score: SINONIMO_SUBSTRING_SCORE - Math.min(sinonimoIndex, 99),
        reason: 'sinonimo',
      });
      continue;
    }
    const path = entry.path.map(normalizeText);
    const pathIndex = path.findIndex((value) => value.includes(wanted));
    if (pathIndex >= 0) {
      ranked.push({
        entry,
        score: RUTA_SUBSTRING_SCORE - Math.min(pathIndex, 99),
        reason: 'ruta',
      });
      continue;
    }
    const fuzzy = Math.max(
      fuzzyScore(wanted, entry.nombre),
      ...sinonimos.map((value) => fuzzyScore(wanted, value)),
      ...path.map((value) => fuzzyScore(wanted, value)),
    );
    if (fuzzy > 0) {
      ranked.push({ entry, score: FUZZY_MAX_SCORE * fuzzy, reason: 'fuzzy' });
    }
  }

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const byFrequency = frequencyOf(b.entry) - frequencyOf(a.entry);
    if (byFrequency !== 0) return byFrequency;
    const byRecency = (recent.get(b.entry.id) ?? 0) - (recent.get(a.entry.id) ?? 0);
    if (byRecency !== 0) return byRecency;
    return a.entry.id.localeCompare(b.entry.id);
  });

  return options.limit === undefined ? ranked : ranked.slice(0, options.limit);
}
