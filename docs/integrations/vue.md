# Vue

Usa `BenchVue` con `app.use(BenchVue)` para que el compilador trate los tags
`bch-*` como custom elements nativos. `@bench/vue` declara además los 52 tags
en `GlobalComponents` con sus props y eventos reales, para que las plantillas
tengan comprobación de tipos.

```ts
import { createApp } from 'vue';
import { BenchVue } from '@bench/vue';
import App from './App.vue';

createApp(App).use(BenchVue).mount('#app');
```

## Eventos

Los eventos públicos se enlazan con `@bchChange`, `@bchSelect`, etc. El
adaptador de Vue registra el listener nativo; no hay estado duplicado en el
paquete de integración.

```vue
<script setup lang="ts">
import { ref } from 'vue';

const page = ref(1);
</script>

<template>
  <bch-slider
    label="Volumen"
    :value="50"
    @bchInput="(event) => console.log(event.detail)"
    @bchChange="(event) => console.log('confirmado', event.detail)"
  />

  <bch-pagination :page="page" :page-count="12" @bchChange="(event) => (page = event.detail)" />

  <bch-alert tone="warning" heading="Sesión" dismissible @bchDismiss="onDismiss" />
</template>
```

En TSX o en objetos de render, los handlers se pasan con el mismo nombre que
en React (`onBchChange`, `onBchSelect`, …).
