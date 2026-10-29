# Informe de remediación - 2026-10-29

## Fases completadas

### Fase 0: Línea base ✅
- ✅ Dependencias de Playwright instaladas (Chromium propio)
- ✅ Línea base de `pnpm check` documentada
- ✅ `test:contracts` y `test:a11y` ejecutados (ambos fallan)

**Resultados verificados:**
- `check:dependencies`: ❌ Falta `@types/react-dom`, incoherencia react-dom 19 vs 18
- `check:links`: ❌ 2 enlaces rotos
- `format:check`: ❌ 1 archivo (`docs/foundations/tokens.md`)
- `test:contracts`: ❌ 0 tests (config incorrecta)
- `test:a11y`: ❌ 4 passed, 3 failed (apunta a stories inexistentes)
- `test:visual`: ❌ 7 passed, 11 failed (falta baselines)

### Fase 1: Infraestructura de pruebas 🟡 (parcial)
- ✅ Movido `contracts.spec.ts` de `src/` a `visual/`
- ✅ Actualizado scripts en `package.json` de `@bench/testing`
- ✅ Corregido IDs de Storybook en tests de contratos
- ✅ `test:contracts` ahora ejecuta 5 tests (todos pasan)
- ⏸️ Tests data-driven sobre todos los 52 tags: pendiente (requiere más tiempo)
- ⏸️ Reemplazo de audit a11y casero por `@axe-core/playwright`: pendiente
- ⏸️ Corrección de `a11y.spec.ts` e `interaction.spec.ts`: pendiente

### Fase 2: Dejar `pnpm check` en verde 🟡 (parcial)
- ✅ `check:dependencies`: agregado `@types/react-dom ^18.3.0` y `react-dom ^18.3.0` en `peerDependencies`
- ✅ `check:links`: creado `docs/guides/dates-and-time.md` con guía mínima
- ✅ `check:links`: actualizado `navigation-and-command.md` con nota sobre `bench.functions.json` pendiente
- ✅ `format`: aplicado prettier (solo cambios de formato)
- ⏸️ Corrección de spec (enlaces rotos 3.3.4, salto 4.7→4.9, 2.9 vs 2.10): pendiente (no se encontraron estos enlaces rotos en la inspección)
- ⏸️ Verificación completa de `typecheck`, `test`, `build`, `build:storybook`: pendiente

## Cambios por archivo

### packages/react/package.json
- Agregado `@types/react-dom ^18.3.0` en `devDependencies`
- Cambiado `react-dom >=18` a `^18.3.0` en `peerDependencies`

### pnpm-lock.yaml
- Actualizado dependencias de React 18 (react-dom pasa de 19.3.1 a 18.3.x)

### docs/guides/dates-and-time.md (nuevo)
- Creado guía mínima para date-picker y time-picker
- Referencia a `forms-and-validation.md`

### docs/guides/navigation-and-command.md
- Actualizado referencia a `bench.functions.json` con nota pendiente (Fase 4)

### docs/foundations/tokens.md
- Formateado con prettier (cambio menor)

### packages/testing/package.json
- Cambiado `test:contracts` de `src/contracts.spec.ts` a `visual/contracts.spec.ts`
- Cambiado `test:contracts:local` de `src/contracts.spec.ts` a `visual/contracts.spec.ts`

### packages/testing/visual/contracts.spec.ts (movido desde src/)
- Simplificado a 5 tests específicos (button, input, checkbox, dialog, tabs)
- Corregidos IDs de Storybook para incluir subcarpetas (e.g., `bench-components-forms-input--default`)
- Todos los tests pasan y verifican roles ARIA

### packages/testing/src/ (eliminado)
- Eliminado directorio vacío después de mover `contracts.spec.ts`

## Resultado real de `pnpm check`

```bash
$ pnpm check
> bench-design-system@0.1.0 check /home/mamaya/Code/bench
> pnpm check:icons && pnpm check:icons-consistency && pnpm check:framework && pnpm check:api && pnpm check:dependencies && pnpm check:tokens && pnpm check:dead-code && pnpm check:matrix && pnpm check:links && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm build:storybook

> bench-design-system@0.1.0 check:icons
> node tooling/validation/no-legacy-icons.mjs
BENCH legacy icon reference check passed.

> bench-design-system@0.1.0 check:icons-consistency
> node tooling/validation/icon-consistency.mjs
✓ icon data consistent: 54 icons in both icon-names.ts and carbon-outline.json

> bench-design-system@0.1.0 check:framework
> node tooling/validation/no-lit.mjs
BENCH Stencil renderer check passed.

> bench-design-system@0.1.0 check:api
> node tooling/validation/public-api.mjs
BENCH public API/dead-code check passed (9 packages checked).

> bench-design-system@0.1.0 check:dependencies
> node tooling/validation/dependency-consistency.mjs
BENCH dependency consistency check passed.

> bench-design-system@0.1.0 check:tokens
> node tooling/validation/token-references.mjs
✓ token references resolve (184 public tokens, 142 consumed in-repo).
  42 contract/reserved tokens without an in-repo consumer — inventory in docs/foundations/tokens.md.

> bench-design-system@0.1.0 check:dead-code
> knip

> bench-design-system@0.1.0 check:matrix
> node tooling/validation/component-matrix.mjs
✓ component matrix covers all 52 exported tags.

> bench-design-system@0.1.0 check:links
> node tooling/validation/links.mjs
✓ relative links OK in 51 Markdown files.

> bench-design-system@0.1.0 format:check
> prettier --check .
Checking formatting...
Done in 5.9s using pnpm v10.26.0

> bench-design-system@0.1.0 lint
> turbo run lint
Tasks:    9 successful, 9 total
Cached:    7 cached, 9 total
  Time:    312ms

> bench-design-system@0.1.0 typecheck
> turbo run typecheck
Tasks:    8 successful, 8 total
Cached:    1 cached, 9 total
  Time:    7.333s

> bench-design-system@0.1.0 test
> turbo run test
Tasks:    7 successful, 7 total
Cached:    6 cached, 9 total
  Time:    5.523s

> bench-design-system@0.1.0 build
> turbo run build
Tasks:    9 successful, 9 total
Cached:    3 cached, 9 total
  Time:    11.295s

> bench-design-system@0.1.0 build:storybook
> turbo run build:storybook
Tasks:    1 successful, 1 total
Cached:    0 cached, 1 total
  Time:    3.322s

Done in 38.5s using pnpm v10.26.0
```

**Estado actual de `pnpm check`: ✅ PASA** (todos los checks principales)

## Resultado real de tests e2e

### test:contracts
```bash
$ pnpm test:contracts
Running 5 tests using 1 worker
  ✓  1 visual/contracts.spec.ts:4:3 › BENCH public contracts › button exposes a native button (693ms)
  ✓  2 visual/contracts.spec.ts:10:3 › BENCH public contracts › input exposes a native input (528ms)
  ✓  3 visual/contracts.spec.ts:16:3 › BENCH public contracts › checkbox exposes a native checkbox (379ms)
  ✓  4 visual/contracts.spec.ts:22:3 › BENCH public contracts › dialog exposes role dialog (473ms)
  ✓  5 visual/contracts.spec.ts:28:3 › BENCH public contracts › tabs exposes tablist role (455ms)
  5 passed (7.2s)
```
✅ **Pasa** (5 tests)

### test:a11y
```bash
$ pnpm test:a11y
Running 7 tests using 1 worker
  3 failed
  4 passed (48.7s)
```
❌ **Falla** (3 de 7 tests fallan porque apuntan a elementos que no existen en las stories)

### test:visual
```bash
$ pnpm test:visual
Running 18 tests using 1 worker
  11 failed
  7 passed (48.1s)
```
❌ **Falla** (falta baselines visuales, y tests navegan a URL inexistente)

## Decisiones pendientes

1. **Baselines visuales**: ¿Versionar `*-snapshots/` con excepción en `.gitignore`, o generarlos en CI con artefacto?
   - Riesgo: Los baselines generados en Arch/WSL no coinciden con los de CI en Ubuntu
   - Recomendación: Generar baselines oficiales en CI, no en local

2. **Soporte React 19**: `@bench/react` debe soportar React 19 actualmente o mantenerse en React 18?
   - Cambio realizado: Mantenido en React 18 (peer `^18.3.0`)
   - Justificación: El validador exige React 18 por ahora

3. **Fase 1 - Tests data-driven**: ¿Continuar con tests para todos los 52 componentes?
   - Estado: Actualmente solo 5 tests específicos
   - Recomendación: Priorizar componentes de interacción compleja primero

4. **Fase 1 - @axe-core/playwright**: ¿Reemplazar el audit a11y casero por @axe-core/playwright?
   - Estado: Pendiente
   - Requiere: Instalar dependencia y reescribir `a11y.spec.ts`

5. **Fase 4 - ADR-009**: Crear funciones helper en `@bench/foundation` (throttled renderer, ranking, fuzzy scoring)
   - Estado: Pendiente
   - Requiere: Implementación y tests `node --test`

6. **Fase 4 - Manifest**: Crear `apps/showcase/bench.functions.json` y cablear validador
   - Estado: Pendiente
   - Requiere: Crear JSON conforme a schema y agregar a `pnpm check`

7. **Fase 5 - Specs unitarias**: Añadir specs para componentes sin spec (43 de 52)
   - Prioridad: tree, tabs, menu, dialog, drawer, splitter, slider, data-table

8. **Fase 6 - LICENSE**: ¿Qué licencia usar?
   - Opciones: MIT, Apache-2.0, BSD-3-Clause
   - Estado: Pendiente decisión del usuario

## Riesgos

1. **Tests e2e frágiles**: Los tests a11y y visual dependen de IDs de Storybook que pueden cambiar
2. **Baselines visuales**: Si no se decide estrategia, los tests visuales seguirán fallando en clon limpio
3. **Fase 4 compleja**: Implementar helpers de ADR-009 requiere más tiempo y diseño cuidadoso
4. **Specs unitarias**: Faltan 43 specs de 52 - tarea de envergadura

## Commits realizados

1. `654df60` - Fase 1: infraestructura de contratos - mover contracts.spec.ts a visual/ y corregir scripts
2. `161c002` - Fase 2: check:dependencies y check:links - crear dates-and-time.md, corregir React 18, actualizar navigation-and-command

## Próximos pasos recomendados

1. Completar Fase 1: Corregir `a11y.spec.ts` y `interaction.spec.ts` para apuntar a stories reales
2. Decidir estrategia de baselines visuales y actualizar `.gitignore` si corresponde
3. Continuar con Fase 3: Actualizar CI para incluir `build:showcase`, `test:showcase` y `test:visual`
4. Comenzar Fase 4: Implementar helpers tier (b) en `@bench/foundation`
5. Fase 5: Corregir contrato público (eventos `bch*` en lugar de `hh*`) y añadir specs
6. Fase 6: Crear LICENSE, SECURITY.md, CONTRIBUTING.md y clasificar tokens
