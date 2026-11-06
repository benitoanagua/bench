# @bench/react

React bindings for BENCH web components: 52 typed wrappers (`BchButton`,
`BchInput`, …) for every `bch-*` tag. Works with React 18 and 19.

## Install

```sh
pnpm add @bench/react @bench/components @bench/tokens
```

## Use

```tsx
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import { BchButton, BchInput, BchDialog } from '@bench/react';

// Loading @bench/react registers the bch-*.custom elements for you.
export function Form({ open }: { open: boolean }) {
  return (
    <>
      <BchInput label="Account" name="account" required />
      <BchButton variant="primary" onBchPress={() => console.log('save')}>
        Save
      </BchButton>
      <BchDialog open={open} heading="Confirm">
        <p>Ready?</p>
      </BchDialog>
    </>
  );
}
```

Events: `onBch*` props are bridged to `addEventListener` on the element
(React 18 does not bind unknown custom-element event props itself). Non-primitive
props (arrays/objects) are assigned as element properties, not attributes.

MIT license.
