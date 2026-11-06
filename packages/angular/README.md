# @bench/angular

Angular integration for BENCH web components. Angular ships no per-component
wrappers: custom elements are native to Angular templates. This package
contributes the one thing Angular genuinely needs — `CUSTOM_ELEMENTS_SCHEMA`
so template type-checking accepts `bch-*` tags — and registers the elements
from `@bench/components/loader`.

## Install

```sh
pnpm add @bench/angular @bench/components @bench/tokens
```

## Use

```ts
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import { BenchModule } from '@bench/angular';

bootstrapApplication(AppComponent, {
  // importing @bench/angular registers the bch-* custom elements.
  providers: [importProvidersFrom(BenchModule)],
});
```

```ts
@Component({ imports: [CommonModule], schemas: [] })
export class AppComponent {}
```

`BENCH_CUSTOM_ELEMENTS_SCHEMA` is also exported for apps that prefer importing
the schema directly into `@Component.schemas`.

Listen to custom events from templates: `<bch-button (bchPress)="save()" />`
(works because Angular binds unknown events with `addEventListener`).

MIT license.
