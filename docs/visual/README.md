# Visual Quality

BENCH visual regression is defined by BENCH itself, not by comparison with another design system.

## Viewports

| Name         | Width | Height |
| ------------ | ----: | -----: |
| mobile       |   320 |    800 |
| mobile-large |   375 |    812 |
| tablet       |   768 |   1024 |
| desktop      |  1440 |    900 |

## State coverage

Components are captured in the states that apply to them:

- default
- hover
- active
- focus-visible
- disabled
- loading
- error
- light theme
- dark theme
- reduced motion

## Baseline policy

Baselines are generated from BENCH Storybook stories. They are deterministic artifacts and must only change when the visual contract intentionally changes.

## Criterios de aceptación visual

El Showcase es la superficie de referencia de BENCH. Las comparaciones visuales se generan desde BENCH.

### Estados
- light / dark
- default / hover / active / focus-visible / disabled / loading / error
- reduced motion cuando aplique

### Criterios
1. Ningún contenido debe provocar overflow horizontal en los viewports soportados.
2. Los controles interactivos deben conservar un área táctil cómoda y foco visible.
3. Los tokens semánticos son la única fuente de color, tipografía, spacing, radius y motion.
4. Los iconos se renderizan exclusivamente mediante `bch-icon` y Carbon Icons.
5. Las diferencias intencionales deben documentarse antes de actualizar una baseline.
