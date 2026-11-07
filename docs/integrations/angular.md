# Angular

Angular no necesita wrappers por componente: los custom elements son de
primera clase en templates en cuanto el registro ocurre. `@bench/angular`
aporta las dos cosas que genuinamente faltan — `CUSTOM_ELEMENTS_SCHEMA` (para
que la comprobación de tipos de template acepte los tags `bch-*`) y el
registro de los elementos vía `@bench/components/loader`, idempotente y seguro
sin `window` (Angular Universal). El comportamiento de los componentes nunca
se duplica en Angular.

## Instalación y registro

```sh
pnpm add @bench/angular @bench/components @bench/tokens
```

Importar `@bench/angular` ya registra los `bch-*`; `BenchModule` añade el
esquema al bootstrap de la aplicación:

```ts
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import '@bench/tokens/type-scale.css';
import { importProvidersFrom } from '@angular/core';
import { BenchModule } from '@bench/angular';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BenchModule)],
});
```

`BENCH_CUSTOM_ELEMENTS_SCHEMA` queda exportado para apps que prefieren importar
el esquema a mano en `@Component.schemas`.

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
