<template>
  <Story title="Components/Splitter">
    <Variant title="Playground" :initState="() => ({ orientation: 'horizontal' })">
      <template #default="{ state }">
        <bch-splitter
          :orientation="state.orientation"
          style="height: 220px; border: 1px solid var(--bch-color-border-container)"
        >
          <div slot="start" style="padding: 8px; background: #eef0f2">Panel izquierdo</div>
          <div slot="end" style="padding: 8px; background: #dfe3e6">Panel derecho</div>
        </bch-splitter>
      </template>
      <template #controls="{ state }">
        <HstSelect
          v-model="state.orientation"
          title="Orientación"
          :options="['horizontal', 'vertical']"
        />
      </template>
    </Variant>
    <Variant title="Horizontal">
      <bch-splitter
        orientation="horizontal"
        style="height: 200px; border: 1px solid var(--bch-color-border-container)"
      >
        <div slot="start" style="padding: 8px; background: #eef0f2">Panel izquierdo</div>
        <div slot="end" style="padding: 8px; background: #dfe3e6">Panel derecho</div>
      </bch-splitter>
    </Variant>
    <Variant title="Vertical">
      <bch-splitter
        orientation="vertical"
        style="width: 100%; height: 300px; border: 1px solid var(--bch-color-border-container)"
      >
        <div slot="start" style="padding: 8px; background: #eef0f2">Panel superior</div>
        <div slot="end" style="padding: 8px; background: #dfe3e6">Panel inferior</div>
      </bch-splitter>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Splitter (`bch-splitter`)

Divisor redimensionable entre dos paneles. `horizontal` divide columnas;
`vertical` divide filas.

## Props

| Prop          | Tipo                         | Default        | Descripción      |
| ------------- | ---------------------------- | -------------- | ---------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Eje de división. |

## Accesibilidad

El divisor expone `role="separator"` con `aria-orientation`.
</docs>
