# Registro de limpieza y hardening — BENCH

Documento estable que consolida las auditorías y planes de remediación
transitorios (`cleanup-2026-10-27` y `remediation-2026-10-29`, ya retirados).
Guarda las **decisiones tomadas**, los **elementos conservados de forma
deliberada** y los **trabajos abiertos** que requieren decisión humana. Los
transitorios `pnpm check` de cada fecha se eliminan a propósito: derivan con el
tiempo y la fuente de verdad de cada comprobación es el propio `pnpm check`.

## Base

- PR #1 (`chore/cleanup-dead-transient-audit`) fusionado en `main`.
- Segunda pasada de limpieza profunda: `chore/deep-cleanup`.
- Herramientas de control vigentes: `knip` (`check:dead-code`),
  `check:api`, `check:dependencies`, `check:tokens`, `check:matrix`,
  `check:links`, `check:icons-consistency`, `lint`, `typecheck`, `test`,
  `build`, `build:storybook`.

## Decisiones consolidadas (tomadas y fusionadas)

- **`packages/primitives` eliminado** (`bch-stack`, `bch-surface`): sin
  consumidores dentro del workspace. Ver
  [`docs/architecture/adr-009-catalog-scope.md`](../architecture/adr-009-catalog-scope.md).
- **`packages/components/src/components.d.ts` fuera de versionado**: lo genera
  Stencil en cada build. Excluido en `.gitignore`.
- **Contratos e2e reubicados**: `contracts.spec.ts` movido de `src/` a
  `visual/`; scripts de `@bench/testing` actualizados.
- **Contrato React fijado en 18**: `@bench/react` declara `react`/`react-dom`
  `^18.3.0` como `peerDependencies` y `@types/react`/`@types/react-dom` `^18`
  como dev. Lo exige `tooling/validation/dependency-consistency.mjs`. Es parte
  de la API pública del adaptador, no código muerto.
- **Guía `docs/guides/dates-and-time.md`** creada para `date-picker` y
  `time-picker`.
- **Reproducibilidad del `pnpm check` en clon limpio** (`turbo.json`):
  `typecheck` pasa a `dependsOn: ["^build"]` y `test` a `dependsOn: ["build"]`.
  Ambos fallos eran latentes y preexistentes, ocultos por la caché de Turbo:
  el `typecheck` de `@bench/foundation` y los `node --test` de foundation
  importan el `dist` construido de sus dependencias/proPIO, que no existía aún
  en un checkout limpio. Se elimina además un `import` duplicado e inutilizado
  en `packages/foundation/src/density.ts`.
- **Baselines visuales no versionados**: `.gitignore` excluye imágenes y
  `*-snapshots/`. La matriz visual (52 tags × 4 viewports × 2 temas) genera las
  capturas con `--update-snapshots` en Ubuntu CI y las publica como artefacto
  `visual-baselines`; no se versionan. La comparación entre commits todavía no
  está cableada (el job actual demuestra que la matriz renderiza de forma
  determinista en el SO de referencia).
- **Contratos y a11y data-driven**: `contracts.spec.ts` y `a11y.spec.ts` ya no
  mantienen listas artesanales; recorren los 52 tags exportados y resuelven la
  story canónica desde `apps/storybook/src` + `index.json`
  (`packages/testing/visual/story-catalog.ts`). El audit axe se limita al
  subárbol del tag (`include(tag)`): varias stories comparten superficie
  (Showcase) y el resto de la composición no forma parte del contrato del
  componente.
- **Excepciones de axe justificadas por tag**: `bch-tabs`/`bch-tab`
  (`aria-required-parent`/`children`), `bch-breadcrumbs`/`bch-breadcrumb-item`
  (`list`/`listitem`) y `bch-splitter` (`aria-required-attr`). En los tres
  casos el incumplimiento es del modelo de axe frente a la proyección de slots
  con Stencil `scoped`, no de la semántica real (que sí cubren las specs
  unitarias y el contrato). Ninguna excepción se aplica sin justificación
  escrita junto al tag.
- **A11y corregida por la auditoría**: `bch-file-upload` etiqueta su input
  nativo (`<label for>`) y saca el input de focus del dropzone `role="button"`
  (un control focusable anidado en un widget es inválido), y `bch-status-bar`
  pasa de `--bch-color-text-disabled` (2.48:1) a `--bch-color-text-muted`.
- **Lint de diseño ampliado**: `design-rules.mjs` falla ante colores crudos
  (hex/rgb/hsl) fuera de la capa de tokens, con la excepción documentada de los
  scrims translúcidos de dialog/drawer. En `showcase/*.css` también falla ante
  px fuera de la escala; `0.5px`, `1px` y `-2px` quedan como geometría óptica
  explícita. Los valores de spacing/radios se migraron a `var(--bch-*)` o rem
  sin cambio visual.
- **Specs de componentes ampliadas**: tree, tabs, menu, dialog, drawer, splitter
  y slider tienen cobertura Stencil. Los specs destaparon tres correcciones:
  el árbol trataba `expanded=""` (reflejo booleano de Stencil) como colapsado;
  las flechas de tabs enfocaban el host en vez del botón interno; y el click de
  un tab deshabilitado no tenía guarda (mock-doc no emula `disabled`).
- **Foundation con `node:test`**: `dom.ts` y `accessibility.ts` tienen tests
  puros (sin jsdom) que verifican selector de focusables, filtrado de hijos
  directos, generación de ids y gestión de `aria-describedby`.
- **Typecheck de `@bench/components` aislado del build**: `stencil build --dev`
  (el typecheck del paquete) escribía en `dist/` y borraba `esm/`. Si Turbo
  reutilizaba la caché del build, el `dist/` quedaba incompleto y los tests de
  `@bench/react` fallaban al resolver `@bench/components`. Ahora el typecheck
  emite en `.typecheck/` (`stencil.typecheck.config.ts`) y `dist/` solo lo
  escribe un build real.

## Estado de verificación tras la limpieza

- `pnpm check`: verde. La deuda de formato preexistente en
  `packages/testing/visual/a11y.spec.ts` e `interaction.spec.ts` se corrigió
  con `prettier` (cambio de formato, sin alteración de lógica).
- CI `e2e`: `test:contracts` 58/58 y `test:a11y` 54/54 en verde (data-driven
  sobre los 52 tags). Los conteos de fallo que aparecían en los informes
  fechados estaban obsoletos.
- `test:visual`: fuera de `pnpm check` y del job `e2e`; requiere baselines
  generados explícitamente (§ trabajos abiertos).

## Elementos conservados deliberadamente

- **42 tokens reservados/contractuales** sin consumidor interno: inventario en
  [`docs/foundations/tokens.md`](../foundations/tokens.md); los valida
  `check:tokens`. Son contrato público, no deuda.
- **Demos HTML** en `docs/demos/` y **stories de sistema** (`ComponentGallery`,
  `ProductionMatrix`, `Quality`, `VisualStates`, `Overlays`, `Forms`,
  `Showcase`): documentan y validan patrones del sistema.
- **Componentes compuestos** en `packages/components/src/showcase/`
  (`bch-metric-card`, `bch-status`, `bch-alert`, `bch-empty-state`,
  `bch-data-table`, `bch-toolbar`): exportados, consumidos por `apps/showcase`
  y `apps/storybook`, y cubiertos por la matriz de componentes.
- **Pruebas de auditoría de accesibilidad/interacción** (`a11y.spec.ts`,
  `interaction.spec.ts`): son pruebas del producto, no informes transitorios.
- **Excepciones de Knip**, cada una justificada:
  - `packages/components` → `jest`, `jest-cli`: los necesita `stencil test
--spec` (`src/showcase/showcase.spec.ts`).
  - `packages/react` → `@types/react-dom`: contrato peer público del adaptador.
  - `packages/fonts` → `@ibm/plex-mono`, `@ibm/plex-sans`: entradas del
    generador `tooling/typography/build.mjs`.
  - `packages/icons` → `@carbon/icons`: entrada del generador
    `tooling/icons/generate.mjs`.
- **`.changeset/*`**: metadatos de release pendientes, necesarios para el
  changelog.
- **`tooling/validation/validate-functions-manifest.mjs`**: validador del
  manifiesto `bench.functions.json` (ADR-009 tier b). Cableado en `pnpm check`
  como `check:functions`; el manifiesto de referencia vive en
  `apps/showcase/bench.functions.json`.

## Trabajos abiertos (requieren decisión humana)

1. **Baselines visuales**: la generación en CI ya existe, pero falta comparar
   contra una referencia estable entre commits (p. ej. descargar el artefacto
   de `main` antes de ejecutar). Mientras tanto, el job solo prueba
   determinismo en Ubuntu.
2. **Soporte React 19**: ¿ampliar el contrato peer de `@bench/react` más allá
   de React 18?
3. **ADR-009 Fase 4 (cerrado)**: los helpers de tier (b) viven en
   `@bench/foundation` (`rankFunctions`, `buildAliasTable`, `fuzzyScore`,
   `createThrottledRenderer`), el manifiesto de referencia es
   `apps/showcase/bench.functions.json` y `validate-functions-manifest.mjs`
   entra en `pnpm check` como `check:functions`.
4. **Specs unitarias de componentes**: tree, tabs, menu, dialog, drawer,
   splitter y slider ya están cubiertos; quedan data-table y los tags sin spec
   propia.
5. **Licencia y gobernanza**: elegir licencia y crear `LICENSE`,
   `SECURITY.md` y `CONTRIBUTING.md`.

## Limitaciones conocidas

- Los tests e2e dependen de IDs de Storybook que pueden cambiar al reestructurar
  stories.
- `dependency-consistency.mjs` valida hoy solo la mayor versión de Storybook y
  de los tipos de React; no comprueba consistencia de Playwright ni Stencil
  (existe una horquilla `@playwright/test` `^1.54`/`^1.55` sin resolver).
