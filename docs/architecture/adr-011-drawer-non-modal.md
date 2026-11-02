# ADR-011: `bch-drawer` es un offcanvas no modal; la variante modal es `bch-dialog`

Estado: aceptado

## Context

El spec §4.3 describe el patrón _offcanvas_ (panel lateral que entra desde un
borde) y, en §3, el patrón _modal_ (diálogo que exige una decisión antes de
continuar). Son primos cercanos pero no equivalentes: el offcanvas es
navegación —el usuario va a otro lugar— y el modal es una decisión —el usuario
responde y el flujo se detiene—.

`bch-drawer` nació con un scrim a pantalla completa y cierre por Escape, clic
en el scrim y botón de cierre, pero **sin** trampa de foco, **sin**
`role="dialog"` y **sin** `aria-modal`: el foco puede seguir saliendo del
panel mientras está abierto. Esa asimetría (bloquea el puntero, no el teclado)
es fácil de leer como "modal" y por eso la ambigüedad había que cerrarla por
escrito.

ADR-009 clasifica el patrón Offcanvas en tier (a) y remitía a "ADR-010" como
decisión de semántica. ADR-010 es, en realidad, el de las capas tipográficas:
la referencia era errónea y quedaba sin documento que respaldara el
comportamiento. Esta ADR reemplaza esa referencia y fija el contrato.

## Decision

1. **`bch-drawer` es un offcanvas no modal.** Su contrato es:
   - no declara `role="dialog"` ni `aria-modal`;
   - no atrapa el foco y no bloquea la lectura del resto de la página; el
     scrim bloquea el puntero (decisión visual documentada), no el teclado;
   - se cierra con `Escape` (controlable con `closeOnEscape`), con clic en el
     scrim y con el botón de cierre;
   - `side` acepta `start`/`end` (lógicos, se invierten con `dir=rtl`) y
     `left`/`right` (físicos, compatibilidad).
2. **La variante modal es `bch-dialog`**, no un drawer con prop: usa `<dialog>`
   nativo con `showModal()`, con foco atrapado por la plataforma y `::backdrop`.
   `closeOnEscape` decide si Escape cierra; `tone="critical"` aplica la línea
   triple de §2.3 y `--bch-shadow-critical` de §2.4 para confirmaciones
   irreversibles.
3. **Regla para las aplicaciones**: si la interacción pide una _decisión_
   (confirmar, descartar, algo irreversible) se usa `bch-dialog`; si pide _ir a
   otro sitio_ (menú, filtros, navegación, inspector) se usa `bch-drawer`.
4. **El contrato está protegido por tests**: la spec de `bch-drawer` falla si
   alguien reintroduce `role="dialog"` o `aria-modal`, de modo que la decisión
   no se erosione por accidente.

## Alternativas consideradas

- **Hacer `bch-drawer` modal** (trampa de foco + `aria-modal`): descartado. El
  drawer es de uso recurrente en una herramienta que se abre ocho horas al día;
  atrapar el foco en cada apertura penaliza al usuario sin ganar nada, porque
  la navegación no exige una decisión.
- **Un único componente con prop `modal`**: descartado. La semántica de un
  modal (rol, `aria-modal`, trampa de foco, `inert` del resto) es incompatible
  con la de un offcanvas; esconderla detrás de una prop produce dos
  contratos contradictorios en el mismo tag.
- **Eliminar el scrim del drawer**: descartado. El panel lateral necesita
  separar visualmente lo que tapa; el problema no era el scrim, sino la
  ambigüedad sobre la semántica, que es lo que esta ADR cierra.

## Consequences

- No existe "drawer modal". Si una aplicación necesita un panel lateral modal,
  compone `bch-dialog` con su propio contenido y ancho; si necesita navegación,
  usa `bch-drawer`.
- La ausencia de trampa de foco en `bch-drawer` es intencionada y documentada:
  quien necesite bloquear el flujo completo debe elegir `bch-dialog`.
- El scrim del drawer es un `<button>` real (foco, teclado y nombre accesible),
  no un pseudo-elemento decorativo: se puede cerrar con teclado.
- Las guías de integración y las demos del showcase distinguen explícitamente
  navegación (`bch-drawer`) de decisión (`bch-dialog`).

## Referencias

- Spec `bench-design-system.md` §4.3 (offcanvas), §3 (modales), §2.3 (línea
  triple), §2.4 (elev-3).
- ADR-009 (tier (a) para el patrón offcanvas).
- ADR-002 (adaptadores: el contrato es el custom element, no el framework).
