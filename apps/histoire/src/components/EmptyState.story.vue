<template>
  <Story title="Components/EmptyState">
    <Variant
      title="Playground"
      :initState="
        () => ({
          heading: 'No hay resultados',
          description: 'Intenta con otros términos de búsqueda.',
          provisional: false,
        })
      "
    >
      <template #default="{ state }">
        <bch-empty-state
          :heading="state.heading"
          :description="state.description"
          :provisional="state.provisional"
        ></bch-empty-state>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.heading" title="Encabezado" />
        <HstText v-model="state.description" title="Descripción" />
        <HstCheckbox v-model="state.provisional" title="Provisional (borrador)" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-empty-state
        heading="No hay resultados"
        description="Intenta con otros términos de búsqueda."
      ></bch-empty-state>
    </Variant>
    <Variant title="Provisional">
      <bch-empty-state
        heading="Configuración pendiente"
        description="Completa los ajustes iniciales para continuar."
        provisional
      ></bch-empty-state>
    </Variant>
  </Story>
</template>

<docs lang="md">
# EmptyState (`bch-empty-state`)

Estado de lista vacía. Usar `provisional` solo cuando el contenido está aún no
confirmado (borrador), nunca como decoración (Regla 8).

## Props

| Prop          | Tipo      | Default | Descripción                            |
| ------------- | --------- | ------- | -------------------------------------- |
| `heading`     | `string`  | `''`    | Encabezado principal.                  |
| `description` | `string`  | `''`    | Descripción secundaria.                |
| `provisional` | `boolean` | `false` | Estado provisional, aún no confirmado. |
</docs>
