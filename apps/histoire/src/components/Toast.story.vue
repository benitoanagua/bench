<script setup>
import { onMounted, ref } from 'vue';

// Cada variant con controles tiene su propia región; HstVue monta una
// variant a la vez, así que una sola ref alcanza.
const region = ref();

// La variant "Por defecto / Visible" usa esta ref: si está montada, muestro
// toasts de ejemplo al cargar para que el lienzo no esté vacío sin
// interacción. `duration: 0` los mantiene persistentes (estables para
// screenshots) hasta que el usuario los descarte.
const regionVisible = ref();

const showSuccess = () => {
  void region.value?.show({ tone: 'success', message: 'Operación completada', duration: 5000 });
};
const showError = () => {
  void region.value?.show({ tone: 'danger', message: 'Algo salió mal', duration: 5000 });
};

onMounted(() => {
  if (!regionVisible.value) return;
  void regionVisible.value.show({ tone: 'success', message: 'Operación completada', duration: 0 });
  void regionVisible.value.show({ tone: 'danger', message: 'Algo salió mal', duration: 0 });
});
</script>

<template>
  <Story title="Components/Toast">
    <Variant title="Por defecto / Visible" :initState="() => ({ placement: 'bottom', maxVisible: 3 })">
      <template #default="{ state }">
        <bch-toast-region
          ref="regionVisible"
          :placement="state.placement"
          :max-visible="state.maxVisible"
        ></bch-toast-region>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.placement" title="Colocación" :options="['top', 'bottom']" />
        <HstNumber v-model="state.maxVisible" title="Máximo visibles a la vez" min="1" />
      </template>
    </Variant>

    <Variant title="Playground" :initState="() => ({ placement: 'bottom', maxVisible: 3 })">
      <template #default="{ state }">
        <bch-toast-region
          ref="region"
          :placement="state.placement"
          :max-visible="state.maxVisible"
        ></bch-toast-region>
        <div style="margin-top: 16px; display: flex; gap: 8px; flex-direction: column">
          <bch-button variant="primary" @click="showSuccess">Mostrar toast</bch-button>
          <bch-button variant="secondary" @click="showError">Mostrar error</bch-button>
        </div>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.placement" title="Colocación" :options="['top', 'bottom']" />
        <HstNumber v-model="state.maxVisible" title="Máximo visibles a la vez" min="1" />
      </template>
    </Variant>

    <!-- Región vacía: representa el estado antes de mostrar toasts; el
         Playground es la variant con contenido. -->
    <Variant title="Por defecto">
      <bch-toast-region ref="region"></bch-toast-region>
    </Variant>

    <Variant title="Colocación superior">
      <bch-toast-region placement="top" ref="region"></bch-toast-region>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Toast (`bch-toast-region`)

Área de notificaciones con cola real de descarte. Montar una región por app y
llamar a `.show()` mediante ref:

```js
const region = document.querySelector('bch-toast-region');
await region.show({ tone: 'success', message: 'Guardado.' });
```

La variant **"Por defecto / Visible"** muestra dos toasts de ejemplo al montar
(`duration: 0`, persistentes hasta descartarlos). El **Playground** dispara
toasts con los botones "Mostrar toast" / "Mostrar error".

## Props

| Prop         | Tipo                | Default    | Descripción               |
| ------------ | ------------------- | ---------- | ------------------------- |
| `placement`  | `'top' \| 'bottom'` | `'bottom'` | Lugar de la pantalla.     |
| `maxVisible` | `number`            | `3`        | Toasts visibles a la vez. |

## Método

| Método          | Descripción                        |
| --------------- | ---------------------------------- |
| `show(options)` | Añade un toast y devuelve su `id`. |
| `dismiss(id)`   | Descarta un toast.                 |
| `clear()`       | Vacía la región.                   |
</docs>
