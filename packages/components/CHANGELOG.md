# @bench/components

## 0.2.0

### Minor Changes

- 875d32d: Primer release público de BENCH (0.2.0, versión alineada en los 7 paquetes
  publicables).

  Resumen de lo que entra desde los cambios internos acumulados:

  - **Tokens**: la escala, los temas y la escala tipográfica se documentan como
    tres hojas de estilo obligatorias (`tokens.css`, `themes.css`,
    `type-scale.css`); el build copia las tres a `dist` y `./type-scale.css` se
    publica en `exports`.
  - **Adaptadores**: los 52 tags tienen wrapper tipado en React y Vue; los
    handlers `onBch*` se enlazan con `addEventListener` (React 18 no los
    registraba) y los props no primitivos se asignan como propiedad del elemento.
    Los adaptadores registran los custom elements vía
    `defineCustomElements()` del loader, idempotente y seguro en SSR.
  - **Iconos de Carbon**: el generador resuelve el `fill:none` del rectángulo de
    encuadre (los glifos ya no se pintan como cuadrados sólidos).
  - **Accesibilidad**: `bch-tab`/`bch-tab-panel` se vinculan por ids reales
    (derivados del grupo y del valor) y el valor se compara por propiedad además
    de por atributo; `bch-file-upload` etiqueta su input nativo;
    `bch-status-bar` sube el contraste del texto deshabilitado;
    `bch-tree` reconoce `expanded=""`, las flechas de tabs enfocan el botón
    interno y el tab deshabilitado ignora el click.
  - **Empaquetado**: `files`, `license`, `repository`, `homepage`, `bugs`,
    `publishConfig`, `engines` y `sideEffects` completos en los paquetes
    publicables, `exports` con `types`+`import`, y el paquete components expone
    `./components` (bundle `dist-custom-elements`).
  - **Cobertura**: specs Stencil nuevas (input, select, checkbox, tooltip),
    tests reales de tokens e icons y helpers tier (b) de ADR-009 en foundation.

### Patch Changes

- Updated dependencies [875d32d]
  - @bench/icons@0.2.0
