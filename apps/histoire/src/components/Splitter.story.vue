<script setup>
// El bch-splitter es SOLO el divisor (hit-area de ~6px, §4.3): no renderiza
// paneles. La app dueña compone el layout y aplica el delta de `bchDrag` a
// sus paneles; la story muestra ese patrón real.
import { ref } from 'vue';

const delta = ref(0);
const deltaV = ref(0);
</script>

<template>
  <Story title="Components/Splitter">
    <Variant title="Playground" :initState="() => ({ orientation: 'horizontal', delta: 0 })">
      <template #default="{ state }">
        <div
          style="display: flex; height: 220px; border: 1px solid var(--bch-color-border-container)"
        >
          <div
            style="padding: 8px; background: var(--bch-color-surface-muted, #eef0f2)"
            :style="{ width: `calc(50% + ${state.delta}px)` }"
          >
            Panel izquierdo
          </div>
          <bch-splitter
            :orientation="state.orientation"
            @bchDrag="state.delta += $event.detail.deltaPx"
          ></bch-splitter>
          <div style="padding: 8px; background: var(--bch-color-surface-muted, #dfe3e6); flex: 1">
            Panel derecho
          </div>
        </div>
      </template>
      <template #controls="{ state }">
        <HstSelect
          v-model="state.orientation"
          title="Orientación"
          :options="['horizontal', 'vertical']"
        />
        <HstNumber v-model="state.delta" title="Delta acumulado (px)" />
      </template>
    </Variant>
    <Variant title="Horizontal">
      <div
        style="display: flex; height: 200px; border: 1px solid var(--bch-color-border-container)"
      >
        <div style="padding: 8px; background: var(--bch-color-surface-muted, #eef0f2); width: 50%">
          Panel izquierdo
        </div>
        <bch-splitter orientation="horizontal" @bchDrag="delta += $event.detail.deltaPx"></bch-splitter>
        <div style="padding: 8px; background: var(--bch-color-surface-muted, #dfe3e6); flex: 1">
          Panel derecho
        </div>
      </div>
    </Variant>
    <Variant title="Vertical">
      <div
        style="display: flex; flex-direction: column; height: 300px; border: 1px solid var(--bch-color-border-container)"
      >
        <div
          style="padding: 8px; background: var(--bch-color-surface-muted, #eef0f2)"
          :style="{ height: `calc(50% + ${deltaV}px)` }"
        >
          Panel superior
        </div>
        <bch-splitter orientation="vertical" @bchDrag="deltaV += $event.detail.deltaPx"></bch-splitter>
        <div style="padding: 8px; background: var(--bch-color-surface-muted, #dfe3e6); flex: 1">
          Panel inferior
        </div>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Splitter (`bch-splitter`)

Divisor redimensionable entre dos paneles. `horizontal` divide columnas;
`vertical` divide filas. El componente es **sólo el divisor** (hit-area de
~6px): la app dueña compone el layout y aplica el delta de `bchDrag` a sus
paneles, como muestran las variantes.

## Props

| Prop          | Tipo                         | Default        | Descripción      |
| ------------- | ---------------------------- | -------------- | ---------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Eje de división. |

## Eventos

| Evento    | Cuándo se dispara                       | Detalle                      |
| --------- | --------------------------------------- | ---------------------------- |
| `bchDrag` | El usuario mueve el divisor.            | `detail.deltaPx` del arrastre. |

## Accesibilidad

El divisor expone `role="separator"` con `aria-orientation`. También es
operable por teclado (flechas mueven el divisor).
</docs>
