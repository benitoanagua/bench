<template>
  <Story title="Components/Breadcrumbs">
    <Variant title="Playground" :initState="() => ({ label: 'Ruta de navegación', maxItems: 0 })">
      <template #default="{ state }">
        <bch-breadcrumbs :label="state.label" :max-items="state.maxItems">
          <bch-breadcrumb-item href="/inicio">Inicio</bch-breadcrumb-item>
          <bch-breadcrumb-item href="/categoria">Categoría</bch-breadcrumb-item>
          <bch-breadcrumb-item href="/subcategoria">Subcategoría</bch-breadcrumb-item>
          <bch-breadcrumb-item href="/producto" current>Producto</bch-breadcrumb-item>
        </bch-breadcrumbs>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta (aria-label)" />
        <HstNumber
          v-model="state.maxItems"
          title="Máximo de items antes de colapsar (0 = sin colapsar)"
          min="0"
        />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-breadcrumbs label="Ruta de navegación">
        <bch-breadcrumb-item href="/inicio">Inicio</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/categoria">Categoría</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/producto" current>Producto</bch-breadcrumb-item>
      </bch-breadcrumbs>
    </Variant>
    <Variant title="Colapsado">
      <bch-breadcrumbs label="Ruta" max-items="2">
        <bch-breadcrumb-item href="/inicio">Inicio</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/categoria">Categoría</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/subcategoria">Subcategoría</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/producto" current>Producto</bch-breadcrumb-item>
      </bch-breadcrumbs>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Breadcrumbs (`bch-breadcrumbs` + `bch-breadcrumb-item`)

Ruta de navegación jerárquica. `max-items` colapsa los elementos intermedios
detrás de un ellipsis clicable cuando se excede el límite.

## Props

### bch-breadcrumbs

| Prop       | Tipo     | Default        | Descripción                                                    |
| ---------- | -------- | -------------- | -------------------------------------------------------------- |
| `label`    | `string` | `'Breadcrumb'` | Etiqueta de navegación (aria-label).                           |
| `maxItems` | `number` | `0`            | Máximo de items visibles antes de colapsar (0 = sin colapsar). |

### bch-breadcrumb-item

| Prop      | Tipo      | Default | Descripción             |
| --------- | --------- | ------- | ----------------------- |
| `href`    | `string`  | `''`    | Destino del enlace.     |
| `current` | `boolean` | `false` | Marca la página actual. |

## Teclado

Los items son enlaces nativos: se focan con `Tab` y se activan con `Enter`.
</docs>
