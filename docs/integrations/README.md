# Framework integrations

BENCH is framework-agnostic. `@bench/components` is the canonical Web Components package. Framework packages only provide ergonomic integration; they must not duplicate component behavior.

- `@bench/react`: typed JSX entry points
- `@bench/vue`: Custom Elements compiler configuration
- `@bench/angular`: Custom Elements schema integration

## Patrones de aplicación (tier c)

Los patrones que son _composición_, no biblioteca, tienen su guía y su demo en
[`patterns/`](./patterns/README.md): leader keys y paleta de comandos, menús
contextuales, persistencia de layout, panel inspector, workspaces, window
placement multi-monitor, record cards, modos y cursores, balloon help,
macros, patrón Apply, historial, plantillas, persistencia con IndexedDB y
campos sensibles.
