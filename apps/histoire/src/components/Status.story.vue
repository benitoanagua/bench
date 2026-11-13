<template>
  <Story title="Components/Status">
    <Variant title="Playground" :initState="() => ({ label: 'Operativo', tone: 'neutral' })">
      <template #default="{ state }">
        <bch-status :label="state.label" :tone="state.tone"></bch-status>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstSelect
          v-model="state.tone"
          title="Tono"
          :options="['neutral', 'success', 'warning', 'danger', 'info', 'risk', 'security']"
        />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-status tone="success" label="Operativo"></bch-status>
    </Variant>
    <Variant title="Advertencia">
      <bch-status tone="warning" label="Atención requerida"></bch-status>
    </Variant>
    <Variant title="Error">
      <bch-status tone="danger" label="Fallo del sistema"></bch-status>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Status (`bch-status`)

Insignia de estado breve (texto + punto de color).

## Props

| Prop    | Tipo                                                                                | Default     | Descripción       |
| ------- | ----------------------------------------------------------------------------------- | ----------- | ----------------- |
| `label` | `string`                                                                            | `''`        | Texto del estado. |
| `tone`  | `'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'risk' \| 'security'` | `'neutral'` | Tono visual.      |
</docs>
