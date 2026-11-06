# @bench/components

Stencil + Web Components collection: the `bch-*` custom-element library of
BENCH. Components are lazy-loaded from `@bench/components/loader`, or available
as statically importable element classes from `@bench/components/components`.

## Install

```sh
pnpm add @bench/components @bench/tokens
```

## Use

```ts
// Tokens once, then the loader registers every bch-* element.
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import { defineCustomElements } from '@bench/components/loader';

defineCustomElements();
```

```html
<bch-button variant="primary" id="save">Save</bch-button>
<bch-input label="Account" name="account" required></bch-input>
<bch-badge tone="success">Active</bch-badge>
```

```ts
document.querySelector('#save')?.addEventListener('bchPress', () => {
  // custom events are `bch*` and bubble
});
```

Alternative: `import '@bench/components/components'` for the static
custom-elements bundle (`defineCustomElementBchButton` per tag).

[Component matrix →](https://github.com/benitoanagua/bench/blob/main/docs/components/component-matrix.md)

MIT license.
