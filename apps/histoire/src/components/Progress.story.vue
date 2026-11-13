<template>
  <Story title="Components/Progress">
    <Variant
      title="Playground"
      :initState="() => ({ value: 45, tone: 'action', indeterminate: false })"
    >
      <template #default="{ state }">
        <bch-progress
          :value="state.value"
          :tone="state.tone"
          :indeterminate="state.indeterminate"
          label="Progreso"
        ></bch-progress>
      </template>
      <template #controls="{ state }">
        <HstNumber v-model="state.value" title="Valor" min="0" max="100" />
        <HstSelect
          v-model="state.tone"
          title="Tono"
          :options="['action', 'success', 'danger', 'warning']"
        />
        <HstCheckbox v-model="state.indeterminate" title="Indeterminado" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-progress label="Carga" value="45"></bch-progress>
    </Variant>
    <Variant title="Indeterminado">
      <bch-progress label="Procesando" indeterminate></bch-progress>
    </Variant>
    <Variant title="Tonos">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <bch-progress label="Éxito" value="70" tone="success"></bch-progress>
        <bch-progress label="Advertencia" value="50" tone="warning"></bch-progress>
        <bch-progress label="Error" value="30" tone="danger"></bch-progress>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Progress (`bch-progress`)

Barra de progreso lineal. Combinar con `<bch-spinner>` para carga circular.

## Props

| Prop            | Tipo                                             | Default    | Descripción                  |
| --------------- | ------------------------------------------------ | ---------- | ---------------------------- |
| `value`         | `number`                                         | `0`        | Progreso (0-100).            |
| `tone`          | `'action' \| 'success' \| 'danger' \| 'warning'` | `'action'` | Tono visual.                 |
| `indeterminate` | `boolean`                                        | `false`    | Progreso sin valor definido. |
| `label`         | `string`                                         | `''`       | Etiqueta accesible.          |
</docs>
