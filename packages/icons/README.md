# @bench/icons

IBM Carbon icon data resolved at build time: typed icon-name validation and
helper accessors for consuming components and applications. Icons are
attributed [via `THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## Install

```sh
pnpm add @bench/icons
```

## Use

```ts
import { isCarbonIconName, resolveCarbonIcon } from '@bench/icons';

isCarbonIconName('data--table'); // true/false against the generated dataset
const svg = resolveCarbonIcon('data--table');
```

[Full guide →](https://github.com/benitoanagua/bench/blob/main/docs/guides/typography-and-icons.md)

MIT license.
