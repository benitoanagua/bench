<template>
  <Story title="Components/Pagination">
    <Variant title="Playground" :initState="() => ({ page: 1, pageCount: 10, siblingCount: 1 })">
      <template #default="{ state }">
        <bch-pagination
          label="Paginación"
          :page="state.page"
          :page-count="state.pageCount"
          :sibling-count="state.siblingCount"
          @bch-change="state.page = $event.detail"
        ></bch-pagination>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Página actual: {{ state.page }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstNumber v-model="state.page" title="Página actual" min="1" :max="state.pageCount" />
        <HstNumber v-model="state.pageCount" title="Total de páginas" min="1" />
        <HstNumber v-model="state.siblingCount" title="Hermanos alrededor" min="0" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-pagination label="Paginación" page="1" page-count="10"></bch-pagination>
    </Variant>
    <Variant title="Página intermedia">
      <bch-pagination label="Páginas" page="5" page-count="20"></bch-pagination>
    </Variant>
    <Variant title="Hermanos ampliados">
      <bch-pagination label="Ampliada" page="7" page-count="20" sibling-count="2"></bch-pagination>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Pagination (`bch-pagination`)

Navegación paginada con ventana de páginas y elipses.

## Props

| Prop           | Tipo     | Default | Descripción                                |
| -------------- | -------- | ------- | ------------------------------------------ |
| `page`         | `number` | `1`     | Página actual.                             |
| `pageCount`    | `number` | `1`     | Total de páginas.                          |
| `siblingCount` | `number` | `1`     | Páginas visibles a cada lado de la actual. |

## Eventos

| Evento      | Detail   | Cuándo se dispara            |
| ----------- | -------- | ---------------------------- |
| `bchChange` | `number` | El usuario cambia de página. |
</docs>
