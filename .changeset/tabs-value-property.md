---
'@bench/components': patch
---

Arreglar la sincronización de `bch-tabs` con sus hijos.

El grupo leía el valor de cada `bch-tab` y `bch-tab-panel` **solo del
atributo** (`getAttribute('value')`). Desde HTML plano funciona, pero desde
JSX (Stencil, Storybook) o React 19 el valor se escribe como **propiedad**
del elemento: el atributo no existía, la comparación fallaba y el grupo se
quedaba sin pestaña activa y con todos los paneles ocultos. Ahora la propiedad
manda sobre el atributo, con el atributo como reserva.

Además:

- Cambiar `value` desde fuera (la aplicación, un router, un binding) ya
  reordena el grupo: antes solo lo reconfiguraba un clic en una pestaña.
- El panel oculto **se oculta de verdad**: `bch-tab-panel` hereda
  `:host { display: block }`, que gana al `[hidden]` del user agent, así que
  los paneles inactivos seguían en pantalla.
