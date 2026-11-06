# Getting started

Bench is a Stencil + Web Components design system. Components are real custom
elements (`bch-*`), so they work with any framework or with plain HTML.

## Work on the repository

```bash
pnpm install
pnpm build        # tokens, icons, fonts, components, integrations, showcase
pnpm showcase     # reference application at :5173
pnpm storybook    # component catalogue and a11y harness at :6006
```

`pnpm check` is the full gate: icon/matrix/link/token/dead-code validators,
formatting, lint, typecheck, unit tests, builds and the Storybook build.

## Consume Bench in an application

```bash
pnpm add @bench/components @bench/tokens
```

Fonts are not bundled in a Bench package: the type system is IBM Plex, so
install IBM's packaged webfonts and import them yourself (self-hosted,
OFL-licensed; no CDN at runtime). Bench's own generated assets (`@bench/fonts`
inside this monorepo, [typography guide](./typography-and-icons.md)) wrap the
same sources:

```bash
pnpm add @ibm/plex-sans @ibm/plex-mono
```

```ts
import '@ibm/plex-sans/css/ibm-plex-sans-default.min.css';
import '@ibm/plex-mono/css/ibm-plex-mono-default.min.css';
```

Load the three token stylesheets once (primitives, themes and type scale), then
register the custom elements:

```ts
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import '@bench/tokens/type-scale.css';
import { defineCustomElements } from '@bench/components/loader';

defineCustomElements();
```

Use components as native tags:

```html
<bch-button variant="primary" id="save">Save</bch-button>
<bch-input label="Account" name="account" required></bch-input>
<bch-badge tone="success">Active</bch-badge>
```

Listen to custom events with `bch` prefixes. They bubble and are composed, so
framework bindings and plain DOM both see them:

```ts
document.querySelector('#save')?.addEventListener('bchPress', () => {
  // persist the form
});
```

## Theme and density

```html
<html data-bch-theme="dark" data-bch-density="compact">
  ...
</html>
```

`data-bch-theme` accepts `light` (default) and `dark`; Bench ships real dark
values, not an inverted filter. Density accepts `compact`, `comfortable`
(default) and `spacious`. The `terminal` density is panel-scoped: it requires
`data-bch-density="terminal"` **and** `data-bch-panel="raw-data"` on the same
element.

Prefer the runtime helper over writing attributes by hand when the user can
change density:

```ts
import { setDensity, watchBreakpoint } from '@bench/foundation';

setDensity('compact');
const stop = watchBreakpoint('md', (isDesktop) => {
  // collapse or expand navigation
});
```

## Where to go next

- [Tokens and theming](./tokens-and-theming.md)
- [Component matrix](../components/component-matrix.md)
- [Showcase](../showcase.md) — the composition reference
- [Normative specification](../bench-design-system.md)
