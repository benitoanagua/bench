# Navigation and command

Bench gives every function two paths: the persistent navigation and the
omnibar. Both read the same function index.

## Function manifest

The application owns a `bench.functions.json` manifest:

```json
{
  "functions": [
    {
      "id": "nf",
      "nombre": "Nueva factura",
      "path": ["Facturación", "Ventas", "Nueva factura"],
      "tipo": "pantalla",
      "alias": "nf",
      "sinonimos": ["factura", "invoice"],
      "permisos": ["billing.write"],
      "frecuenciaUso": 120
    }
  ]
}
```

Validate it in CI before deploying:

```bash
node tooling/validation/validate-functions-manifest.mjs apps/showcase/bench.functions.json
```

The validator rejects duplicate ids/aliases, missing `path`, unknown `tipo`
values and negative `frecuenciaUso`. The example manifest will be created in
`apps/showcase/bench.functions.json` (Fase 4).

## Omnibar

```html
<bch-omnibar id="command" placeholder="Search functions or filter (field:value)"></bch-omnibar>
<script type="module">
  const commands = document.querySelector('#command');
  commands.entries = manifest.functions;
  commands.addEventListener('bchRun', ({ detail }) => {
    if ('text' in detail) {
      // Free-text search: route to the app's search surface.
      return;
    }
    // detail is a BchFunctionEntry: route to its screen / run its action.
  });
</script>
```

Ranking is deterministic: exact alias, exact name, substring across name +
synonyms + path, then `frecuenciaUso` as the tie-breaker. The raw query is
always offered as a free-text result, so the list is never empty.

`bchInput` emits on every keystroke if the app wants live preview. All keyboard
handling lives inside the input — arrows, `Enter` and `Escape` — so the omnibar
never installs a global listener.

The pure parser for `campo:valor` lives in `@bench/foundation`:

```ts
import { parseOmnibar, describeOmnibarQuery } from '@bench/foundation';

const ast = parseOmnibar('monto:>1000 or cliente:acme', ['monto', 'cliente']);
// filter nodes, OR branches, macro/clear nodes, free text, or an explicit
// error node such as "no existe el campo 'moneda' en esta vista"

describeOmnibarQuery(ast); // human-readable summary of the AST
```

The optional second argument is the list of fields that exist **in the current
view**; a filter on a field outside that list produces the explicit error node
instead of silently matching nothing.

## Leader keys and the command palette (tier c)

Global shortcuts are application-level orchestration:

```ts
let armed = false;

window.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    document.querySelector('bch-omnibar')?.focus();
    return;
  }
  if (event.key === 'Escape') armed = false;
  if (event.key === 'g') armed = true;
  if (armed && event.key === 'i') {
    armed = false;
    router.go('/invoices');
  }
});
```

Show the armed phase with the shell's own affordance and
`bch-mode-badge`. Bench does not own the shortcut table, the armed timeout or
the route mapping.

## Navigation primitives

- `bch-nav` / `bch-nav-item` — semantic navigation with `active` and
  `bchNavigate`.
- `bch-breadcrumbs` / `bch-breadcrumb-item` — hierarchy; `maxItems` collapses
  long trails.
- `bch-tree` — treeview for the same function index when hierarchy matters.

Related: [ADR-009](../architecture/adr-009-catalog-scope.md),
[omnibar demo](../demos/bench-demo-layout-interaccion.html).
