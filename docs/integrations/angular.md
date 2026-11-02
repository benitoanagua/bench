# Angular

Importa `BenchModule` desde `@bench/angular` o configura
`CUSTOM_ELEMENTS_SCHEMA` en la aplicación consumidora. El comportamiento de
los componentes nunca se duplica en Angular.

## Eventos

Angular enlaza eventos de custom elements con paréntesis y el nombre exacto
del evento público:

```html
<bch-slider
  label="Volumen"
  [value]="volume"
  (bchInput)="volume = $event.detail"
  (bchChange)="commitVolume($event.detail)"
></bch-slider>

<bch-pagination [page]="page" [pageCount]="12" (bchChange)="page = $event.detail"></bch-pagination>
```

El `detail` es el payload tipado del evento Stencil; no se envuelve ni se
transforma en el adaptador.
