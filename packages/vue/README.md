# @bench/vue

Vue bindings for BENCH web components: typed props/events for every `bch-*` tag
and `GlobalComponents` declarations for template autocomplete. Works with
Vue 3.5+.

## Install

```sh
pnpm add @bench/vue @bench/components @bench/tokens
```

## Use

```ts
// main.ts
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import { BenchVue } from '@bench/vue';

// Installing the plugin registers the bch-* custom elements.
createApp(App).use(BenchVue).mount('#app');
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
const open = ref(true);
</script>

<template>
  <bch-button variant="primary" @bch-press="save()">Save</bch-button>
  <bch-dialog :open="open" heading="Confirm">Ready?</bch-dialog>
</template>
```

Templates get every `bch-*` tag typed via Vue's `GlobalComponents`
augmentation.

MIT license.
