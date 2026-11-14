<script setup>
import { ref, onMounted } from 'vue';
const region = ref();
const showSuccess = () => {
  void region.value.show({ tone: 'success', message: 'Operación completada', duration: 3000 });
};
const showError = () => {
  void region.value.show({ tone: 'danger', message: 'Algo salió mal', duration: 3000 });
};

// Mostrar toasts de ejemplo al montar la variant "Por defecto / Visible"
onMounted(() => {
  region.value.show({ tone: 'success', message: 'Guardado con éxito', duration: 3000 });
  region.value.show({ tone: 'info', message: 'Cambios guardados', duration: 3000 });
});
</script>

<template>
  <Story title="Components/Toast">
    <Variant
      title="Por defecto / Visible"
      :initState="() => ({ placement: 'bottom', maxVisible: 3 })"
    >
      <template #default="{ state }">
        <bch-toast-region
          ref="region"
          :placement="state.placement"
          :max-visible="state.maxVisible"
        ></bch-toast-region>
        <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px">
          <bch-button variant="primary" @click="showSuccess">Mostrar toast</bch-button>
          <bch-button variant="secondary" @click="showError">Mostrar error</bch-button>
        </div>
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

    <Variant title="Por defecto">
      <bch-toast-region ref="region"></bch-toast-region>
    </Variant>

    <Variant title="Colocación superior">
      <bch-toast-region placement="top"></bch-toast-region>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Toast (`bch-toast-region`)

Área de notificaciones con cola real de descauso. Montar una región por app y
llamar a `.show()` mediante ref:

```js
const region = document.querySelector('bch-toast-region');
await region.show({ tone: 'success', message: 'Guardado.' });
```

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