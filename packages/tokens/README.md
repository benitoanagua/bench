# @bench/tokens

Design tokens for BENCH: color, spacing, radii, typography scale and
breakpoints as CSS custom properties (`--bch-*`), plus plain-JS breakpoint
helpers.

## Install

```sh
pnpm add @bench/tokens
```

## Use

```ts
// Global styles: primitives, semantic themes and the type scale.
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import '@bench/tokens/type-scale.css';
```

```ts
import { breakpoints, minWidthQuery, watchBreakpoint, benchTokens } from '@bench/tokens';
import { setDensity } from '@bench/foundation';

const stop = watchBreakpoint('md', (isDesktop) => {
  // collapse or expand navigation
});
```

All values are `--bch-*` CSS custom properties; the JS exports mirror the same
scales (breakpoints, spacing, radii, control sizes, z-index layers, type roles).
[Full guide →](https://github.com/benitoanagua/bench/blob/main/docs/guides/tokens-and-theming.md)

MIT license.
