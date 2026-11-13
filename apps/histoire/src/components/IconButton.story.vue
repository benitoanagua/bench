<template>
  <Story title="Components/IconButton">
    <Variant
      title="Playground"
      :initState="
        () => ({ name: 'search', label: 'Buscar', size: 'medium', disabled: false, loading: false })
      "
    >
      <template #default="{ state }">
        <bch-icon-button
          :name="state.name"
          :label="state.label"
          :size="state.size"
          :disabled="state.disabled"
          :loading="state.loading"
        ></bch-icon-button>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.name" title="Nombre del ícono" />
        <HstText v-model="state.label" title="Etiqueta accesible" />
        <HstSelect v-model="state.size" title="Tamaño" :options="['small', 'medium', 'large']" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
        <HstCheckbox v-model="state.loading" title="Carga" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-icon-button name="search" aria-label="Buscar"></bch-icon-button>
    </Variant>
    <Variant title="Con carga">
      <bch-icon-button name="sync" aria-label="Sincronizando" loading></bch-icon-button>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-icon-button name="edit" aria-label="Editar" disabled></bch-icon-button>
    </Variant>
    <Variant title="Tamaños">
      <div style="display: flex; gap: 12px; align-items: center">
        <bch-icon-button name="home" size="small" aria-label="Inicio"></bch-icon-button>
        <bch-icon-button name="home" size="medium" aria-label="Inicio"></bch-icon-button>
        <bch-icon-button name="home" size="large" aria-label="Inicio"></bch-icon-button>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# IconButton (`bch-icon-button`)

Botón solo-ícono. Siempre requiere `label` (nombre accesible).

## Props

| Prop                   | Tipo                             | Default    | Descripción                     |
| ---------------------- | -------------------------------- | ---------- | ------------------------------- |
| `name`                 | `string`                         | -          | Nombre del ícono.               |
| `label`                | `string`                         | -          | Nombre accesible (obligatorio). |
| `size`                 | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamaño.                         |
| `disabled` / `loading` | `boolean`                        | `false`    | Estados desactivado/carga.      |

## Eventos

| Evento     | Detail       | Cuándo se dispara   |
| ---------- | ------------ | ------------------- |
| `bchPress` | `MouseEvent` | Al pulsar el botón. |
</docs>
