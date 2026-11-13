<template>
  <Story title="Components/Spinner">
    <Variant title="Playground" :initState="() => ({ label: 'Cargando' })">
      <template #default="{ state }">
        <bch-spinner :label="state.label"></bch-spinner>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta accesible" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-spinner label="Cargando"></bch-spinner>
    </Variant>
    <Variant title="Con etiqueta personalizada">
      <bch-spinner label="Procesando solicitud…"></bch-spinner>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Spinner (`bch-spinner`)

Indicador de carga circular e indeterminado.

## Props

| Prop    | Tipo     | Default     | Descripción         |
| ------- | -------- | ----------- | ------------------- |
| `label` | `string` | `'Loading'` | Etiqueta accesible. |
</docs>
