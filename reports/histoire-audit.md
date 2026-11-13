# Auditoría UI/UX — catálogo Histoire (Bench)

**Estado:** Fase 0 diagnóstico confirmado con e2e contra el build actual. Se borra al terminar.

## Versiones verificadas en node_modules

- histoire 1.0.0-beta.1, @histoire/plugin-vue 1.0.0-beta.1, @axe-core/playwright 4.14.0.
- API verificada contra las declaraciones instaladas (no se inventan APIs).

## Features de Histoire 1.0.0-beta.1 DISPONIBLES (verificadas en node_modules)

- `theme.darkClass` (sandboxDarkClass está deprecated), `defaultColorScheme`, `storeColorScheme`, `hideColorSchemeSwitch`, `theme.colors`, `theme.logo`, `theme.favicon`, `theme.logoHref`.
- `responsivePresets`, `backgroundPresets`, `autoApplyContrastColor`.
- `setupFile` (browser/server), `collectMaxThreads`, `viteIgnorePlugins`, `defaultStoryProps`, `routerMode`, `vite.base`.
- `tree.groups`, `tree.order`, `tree.file`.
- `<Variant title="...">` + `:initState="() => ({...})"` (prop del plugin de Vue) + `<template #controls="{ state }">`.
- Controles: HstText, HstTextarea, HstNumber, HstSlider, HstCheckbox, HstSelect, HstRadio, HstButtonGroup, HstCheckboxList, HstJson, HstColorSelect, HstColorShades, HstTokenList, HstTokenGrid, HstCopyIcon, HstButton.
- Layout por story: `layout: { type: 'single' } | { type: 'grid', width }`.

## Features DESCARTADAS (no existen en 1.0.0-beta.1)

- `initState` en el config compartido (sí existe como prop de `<Variant>` en plugin-vue).
- Plugins de a11y / screenshot / Percy de Histoire: no existen en esta versión → e2e usa `@axe-core/playwright` directo y `toHaveSnapshot()` de Playwright.

## Tabla de problemas → causa → arreglo (confirmados con e2e)

| #   | Story / variant                  | Problema                                                                    | Causa                                                        | Arreglo                                                                                                                                      | Estado e2e                        |
| --- | -------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| 1   | Todas (146 variants)             | Título "untitled" en el árbol                                               | `<Variant name="...">` no existe; el atributo es `title`     | Renombrar `name` → `title` en todos los `<Variant>`                                                                                          | contract/a11y pasan; árbol roto   |
| 2   | Components/Toast × 3             | `<b-toast-region>` no se define ni hidrata                                  | Tag real es `bch-toast-region`; la story usa uno inexistente | `b-toast-region` → `bch-toast-region`                                                                                                        | **FALLA** contrato de hidratación |
| 3   | Components/IconButton            | La story no renderiza `bch-icon-button`                                     | IconButton.story.vue renderiza solo `<bch-icon>`             | Añadir `<bch-icon-button>` al story                                                                                                          | **FALLA** contrato                |
| 4   | Components/StatusBar             | La story no renderiza `bch-status-bar`                                      | StatusBar.story.vue renderiza solo `<bch-status>`            | Añadir `<bch-status-bar>` con sus slots                                                                                                      | **FALLA** contrato                |
| 5   | Dialog/Drawer/Menu/Tooltip/Toast | Variants `open` apilados en un mismo sandbox; se pisan / colapsan           | Variants estáticos sin contenedor ni trigger propio          | Un overlay abierto por variant; contenedor con altura mínima; trigger de apertura                                                            | por confirmar en catálogo         |
| 6   | Todas                            | Sin controles `Hst*`, sin `initState`, sin `<docs>`                         | Historias 100% estáticas                                     | Playground por componente + variants de estado + docs                                                                                        | por confirmar                     |
| 7   | histoire.config.ts               | No `theme.darkClass`, `backgroundPresets`, `responsivePresets`              | No configurado                                               | Añadir al config                                                                                                                             | por confirmar                     |
| 8   | histoire.setup.ts                | Densidad solo vía `?density=`                                               | Sin control de densidad en el catálogo                       | Control de densidad por story (Playground) + mantener URL                                                                                    | por confirmar                     |
| 9   | e2e/playwright.config.ts         | Ruta absoluta al dist; sin `executablePath`; sin `workers: 2`               | No portable; Chromium de Playwright sin args WSL             | `import.meta.dirname`/`fileURLToPath`, `executablePath` (CHROMIUM_PATH → /usr/bin/chromium → /usr/sbin/chromium), args, headless, workers: 2 | FIXED                             |
| 10  | e2e/static-server.js             | `require` en paquete ESM                                                    | `"type": "module"`                                           | Convertido a ESM (import)                                                                                                                    | FIXED                             |
| 11  | e2e/helpers.ts                   | `storyForTag` confundía kebab vs PascalCase y prefijos (icon-button ← icon) | Comparación sin normalizar                                   | `kebabCase`, dos pasadas (exacto, luego prefijo), alias de hijos                                                                             | FIXED                             |
| 12  | e2e/contracts.spec.ts #1         | `bch-nav-item` / `bch-toast-region` sin coverage                            | Hijos y tags compuestos sin resolver                         | Alias de hijos + prefijo `bch-toast` cubre `bch-toast-region`                                                                                | FIXED                             |
| 13  | e2e/a11y.spec.ts                 | `page.goto(ref)` recibía un objeto, no una URL                              | Bug de copia                                                 | `storyUrl(tag)`; axe en claro y oscuro                                                                                                       | FIXED                             |
| 14  | package.json raíz                | `test:contracts` === `test:a11y` (mismo comando)                            | Duplicado                                                    | `--grep` o separación                                                                                                                        | por hacer                         |
| 15  | .gitignore                       | `*.png` excluido                                                            | Bloquea baselines visuales                                   | Excepción `!apps/histoire/e2e/baselines/**`                                                                                                  | por hacer                         |
| 16  | package.json @bench/histoire     | `test:e2e` sin `--config`                                                   | Playwright no encuentra e2e/playwright.config.ts             | Añadir `--config e2e/playwright.config.ts`                                                                                                   | FIXED                             |

## Hallazgos del barrido inicial (contratos contra el build actual)

- 51/52 contratos pasan. Única falla legítima: `bch-toast-region` no se renderiza (problema #2).
- Tema: el puente `class dark → data-bch-theme` funciona (theme.spec pasa).
  --router hash + /bench/: funciona (smoke pasa).

## Próximo paso (FASE 1)

Ejecutar el barrido completo `catalog.spec.ts` e `a11y.spec.ts` sobre el catálogo actual; anclar fallos (axe, solapamiento de overlays, vacío/colapso) en este reporte antes de la Fase 2.
