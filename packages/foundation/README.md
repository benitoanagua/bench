# @bench/foundation

Pure helpers for BENCH applications: density management, focusable-element
selection, id generation, fuzzy ranking for command palettes (omnibar) and a
throttled renderer factory. No DOM rendering, no framework binding.

## Install

```sh
pnpm add @bench/foundation @bench/tokens
```

## Use

```ts
import { setDensity, watchBreakpoint } from '@bench/foundation';
import { getFocusable, uniqueId } from '@bench/foundation';

setDensity('compact');
const stop = watchBreakpoint('md', (isDesktop) => {
  // collapse or expand navigation
});
```

[Full guide →](https://github.com/benitoanagua/bench/blob/main/docs/guides/layout-and-multitasking.md)

MIT license.
