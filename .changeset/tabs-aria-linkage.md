---
'@bench/components': patch
---

Vincular `bch-tab` y `bch-tab-panel` por identificadores reales. El botón del
tab usaba un id aleatorio (`bch-tab-<random>`) mientras el panel apuntaba a
`bch-tab-<valor>`: tanto `aria-controls` como `aria-labelledby` quedaban
colgando, sin destino, y el `tabpanel` se quedaba sin nombre accesible.

Ahora ambos componentes derivan el id del grupo (`bch-tabs`) y del valor:
`bch-tabs` con id produce `<grupo>-tab-<valor>` y `<grupo>-panel-<valor>`; sin
id de grupo se usa el patrón `bch-tab-<valor>` / `bch-tab-panel-<valor>`. El
`id` del host del panel ya no se copia al `<section>`, lo que además evitaba
duplicar ids cuando se declaraba uno.
