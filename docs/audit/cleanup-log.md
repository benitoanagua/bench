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
- **Baselines visuales no versionados**: `.gitignore` excluye imágenes y
  `*-snapshots/`. La estrategia oficial (generar en CI) queda como trabajo
  abierto (§ abajo).

## Estado de verificación tras la limpieza

- `pnpm check`: verde. La deuda de formato preexistente en
  `packages/testing/visual/a11y.spec.ts` e `interaction.spec.ts` se corrigió
  con `prettier` (cambio de formato, sin alteración de lógica).
- CI `e2e`: `test:contracts` 5/5 y `test:a11y` 7/7 en verde. Los conteos de
  fallo que aparecían en los informes fechados estaban obsoletos.
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
  manifiesto `bench.functions.json` (ADR-009 tier b, Fase 4). Referenciado por
  la documentación; ver trabajo abierto antes de cablearlo o retirarlo.

## Trabajos abiertos (requieren decisión humana)

1. **Baselines visuales**: generar en CI como artefacto oficial frente a
   versionar `*-snapshots/` con excepción. Riesgo: baselines de Arch/WSL no
   coinciden con Ubuntu de CI.
2. **Soporte React 19**: ¿ampliar el contrato peer de `@bench/react` más allá
   de React 18?
3. **Contratos data-driven**: cubrir los 52 tags; sustituir la auditoría a11y
   artesanal por `@axe-core/playwright`.
4. **ADR-009 Fase 4**: helpers de tier (b) en `@bench/foundation`, crear
   `apps/showcase/bench.functions.json` y decidir si
   `validate-functions-manifest.mjs` entra en `pnpm check`.
5. **Specs unitarias de componentes**: cobertura actual limitada (~9 de 52);
   priorizar tree, tabs, menu, dialog, drawer, splitter, slider, data-table.
6. **Licencia y gobernanza**: elegir licencia y crear `LICENSE`,
   `SECURITY.md` y `CONTRIBUTING.md`.

## Limitaciones conocidas

- Los tests e2e dependen de IDs de Storybook que pueden cambiar al reestructurar
  stories.
- `dependency-consistency.mjs` valida hoy solo la mayor versión de Storybook y
  de los tipos de React; no comprueba consistencia de Playwright ni Stencil
  (existe una horquilla `@playwright/test` `^1.54`/`^1.55` sin resolver).
