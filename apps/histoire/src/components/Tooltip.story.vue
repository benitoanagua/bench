<template>
  <Story title="Components/Tooltip">
    <Variant
      title="Playground"
      :initState="() => ({ text: 'Información adicional', placement: 'top' })"
    >
      <template #default="{ state }">
        <bch-tooltip :text="state.text" :placement="state.placement">
          <bch-button variant="secondary">Pasa el ratón</bch-button>
        </bch-tooltip>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="Texto del tooltip" />
        <HstSelect v-model="state.placement" title="Colocación" :options="['top', 'bottom']" />
      </template>
    </Variant>
    <Variant title="Arriba">
      <bch-tooltip text="Información adicional" placement="top">
        <bch-button variant="secondary">Pasa el ratón</bch-button>
      </bch-tooltip>
    </Variant>
    <Variant title="Abajo">
      <bch-tooltip text="Acción secundaria" placement="bottom">
        <bch-button variant="secondary">Pasa el ratón</bch-button>
      </bch-tooltip>
    </Variant>
    <Variant title="Por defecto / Visible">
      <bch-tooltip
        text="Información adicional"
        placement="top"
        :open="true"
      >
        <bch-button variant="secondary" ref="trigger">Información</bch-button>
      </bch-tooltip>
    </Variant>
  </Story>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const trigger = ref();
onMounted(() => {
  // Forzar foco para mostrar el tooltip en estado visible
  if (trigger.value) {
    trigger.value.focus();
  }
});
</script>

<docs lang="md">
# Tooltip (`bch-tooltip`)

Tooltip anclado a un disparador. Se muestra al pasar el ratón y al recibir el
foco el elemento envuelto.

## Props

| Prop        | Tipo                | Default | Descripción                        |
| ----------- | ------------------- | ------- | ---------------------------------- |
| `text`      | `string`            | `''`    | Texto del tooltip.                 |
| `placement` | `'top' \| 'bottom'` | `'top'` | Colocación respecto al disparador. |

## Comportamiento

La variant **"Por defecto / Visible"** abre el tooltip inmediatamente con el
elemento en foco. Las variants "Arriba" y "Abajo" requieren pasar el ratón o
mover el foco al elemento para que aparezcan.

## Métodos

| Método    | Descripción      |
| --------- | ---------------- |
| `show()`  | Abre el tooltip. |
| `close()` | Cierra el tooltip. |
</docs>