---
'@bench/components': patch
---

Corregir tres comportamientos detectados al añadir las specs de la Fase 3: `bch-tree` ahora reconoce `expanded=""` (el reflejo booleano de Stencil) y solo considera raíces los nodos sin `slot="children"`; las flechas de `bch-tabs` enfocan el botón interno del tab en vez del host; y `bch-tab` ignora clicks cuando está deshabilitado.

Correcciones de accesibilidad detectadas por la auditoría axe data-driven: `bch-file-upload` etiqueta su input nativo con un `<label for>` y mueve el input fuera del dropzone (un control de formulario focusable no puede anidarse dentro de un `role="button"`), y `bch-status-bar` usa `--bch-color-text-muted` en vez del color de texto deshabilitado, que quedaba en 2.48:1.

Añadir specs Stencil para tree, tabs, menu, dialog, drawer, splitter y slider.
