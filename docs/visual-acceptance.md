# BENCH — Criterios de aceptación visual

El Showcase es la superficie de referencia de BENCH. Las comparaciones visuales se generan desde BENCH y no contra STRATA.

## Viewports

- 320×800
- 375×812
- 768×1024
- 1440×900

## Estados

- light / dark
- default / hover / active / focus-visible / disabled / loading / error
- reduced motion cuando aplique

## Criterios

1. Ningún contenido debe provocar overflow horizontal en los viewports soportados.
2. Los controles interactivos deben conservar un área táctil cómoda y foco visible.
3. Los tokens semánticos son la única fuente de color, tipografía, spacing, radius y motion.
4. Los iconos se renderizan exclusivamente mediante `bch-icon` y Carbon Icons.
5. Las diferencias intencionales deben documentarse antes de actualizar una baseline.
