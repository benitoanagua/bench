# Patrones de aplicación (tier c)

ADR-009 clasifica los patrones del §4 del spec en tres tiers. Los de tier
(c) **no son código de biblioteca**: son guías de integración que explican cómo
una aplicación compone las piezas de BENCH para resolverlos, más una demo
mínima que lo demuestra.

BENCH no aporta estado de dominio, ni almacenamiento, ni red, ni autenticación.
Todo lo que aparece aquí es composición: los componentes pone la forma, la
aplicación pone los datos.

## Trazabilidad

Cada patrón del §4 clasificado como (c) tiene su guía y su demo en la vista
_Patrones_ del showcase (`apps/showcase`, ancla `#demo-…`).

| Spec §4 | Patrón                          | Guía                                                      | Demo                       |
| ------- | ------------------------------- | --------------------------------------------------------- | -------------------------- |
| 4.1     | Leader keys y paleta Ctrl+K     | [command-palette](./command-palette.md)                   | `#demo-command-palette`    |
| 4.2     | Menús contextuales (8–10)       | [context-menus](./context-menus.md)                       | `#demo-context-menu`       |
| 4.3     | Persistencia de layout          | [panel-layout-persistence](./panel-layout-persistence.md) | `#demo-layout-persistence` |
| 4.3     | Panel inspector                 | [inspector-panel](./inspector-panel.md)                   | `#demo-inspector`          |
| 4.3     | Grupos de tabs y workspace      | [workspace-switcher](./workspace-switcher.md)             | `#demo-workspace`          |
| 4.3     | Window placement multi-monitor  | [window-placement](./window-placement.md)                 | `#demo-window-placement`   |
| 4.3     | Record cards (HyperCard)        | [record-cards](./record-cards.md)                         | `#demo-record-cards`       |
| 4.4     | Modos con feedback y cursores   | [modes-and-cursors](./modes-and-cursors.md)               | `#demo-modes`              |
| 4.4     | Balloon Help                    | [balloon-help](./balloon-help.md)                         | `#demo-balloon-help`       |
| 4.5     | Macros (grabar/reproducir)      | [macros](./macros.md)                                     | `#demo-macros`             |
| 4.5     | Patrón Apply                    | [apply-pattern](./apply-pattern.md)                       | `#demo-apply`              |
| 4.5     | Panel de historial (undo)       | [undo-history](./undo-history.md)                         | `#demo-undo`               |
| 4.5     | Plantillas (estado provisional) | [templates](./templates.md)                               | `#demo-templates`          |
| 4.6     | Persistencia IndexedDB + Worker | [persistence](./persistence.md)                           | `#demo-persistence`        |
| 4.6     | Caps Lock y selector de org     | [secure-fields](./secure-fields.md)                       | `#demo-secure-fields`      |

## Qué NO hay aquí

- Nada de esto vive en `@bench/components`: si un patrón necesita guardar,
  guardar en IndexedDB, enviar a un servidor o decidir permisos, ese código es
  de la aplicación.
- Las demos del showcase son volontairement pequeñas: muestran el contrato de
  composición, no un producto. El repositorio de la aplicación es donde vive
  el resto.
