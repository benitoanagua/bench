<template>
  <Story title="Components/Omnibar">
    <Variant
      title="Playground"
      :initState="() => ({ placeholder: 'Buscar funciones…', entries: ['Función 1', 'Función 2'] })"
    >
      <template #default="{ state }">
        <bch-omnibar :placeholder="state.placeholder" :entries="state.entries"></bch-omnibar>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.placeholder" title="Placeholder" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-omnibar placeholder="Buscar funciones…"></bch-omnibar>
    </Variant>
    <Variant title="Índice vacío">
      <bch-omnibar placeholder="No hay resultados"></bch-omnibar>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Omnibar (`bch-omnibar`)

Punto de entrada único a las funciones del sistema (§4.1). Recibe el índice de
funciones mediante `entries` y las ranking por coincidencia de alias, nombre o
ruta de breadcrumb.

## Props

| Prop          | Tipo                 | Default                                      | Descripción                      |
| ------------- | -------------------- | -------------------------------------------- | -------------------------------- |
| `entries`     | `BchFunctionEntry[]` | `[]`                                         | Índice de funciones (app-owned). |
| `placeholder` | `string`             | `'Search functions or filter (field:value)'` | Placeholder del input.           |
</docs>
