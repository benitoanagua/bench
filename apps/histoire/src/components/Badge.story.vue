<template>
  <Story title="Components/Badge">
    <Variant title="Playground" :initState="() => ({ label: 'Nuevo', tone: 'neutral' })">
      <template #default="{ state }">
        <bch-badge :tone="state.tone">{{ state.label }}</bch-badge>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstSelect
          v-model="state.tone"
          title="Tono"
          :options="['neutral', 'info', 'success', 'warning', 'danger']"
        />
      </template>
    </Variant>
    <Variant title="Neutral">
      <bch-badge tone="neutral">Neutral</bch-badge>
    </Variant>
    <Variant title="Informativo">
      <bch-badge tone="info">Información</bch-badge>
    </Variant>
    <Variant title="Éxito">
      <bch-badge tone="success">Éxito</bch-badge>
    </Variant>
    <Variant title="Advertencia">
      <bch-badge tone="warning">Advertencia</bch-badge>
    </Variant>
    <Variant title="Peligro">
      <bch-badge tone="danger">Peligro</bch-badge>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Badge (`bch-badge`)

Etiqueta pequeña de estado. Los tonos `risk` y `security` pertenecen a la
extensión financiera (§2.10) y solo pueden usarlos módulos que la califiquen.

## Props

| Prop   | Tipo                                                                                | Default     | Descripción  |
| ------ | ----------------------------------------------------------------------------------- | ----------- | ------------ |
| `tone` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'danger' \| 'risk' \| 'security'` | `'neutral'` | Tono visual. |
</docs>
