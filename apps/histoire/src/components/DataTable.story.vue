<template>
  <Story title="Components/DataTable">
    <Variant
      title="Playground"
      :initState="() => ({ pageSize: 5, filterable: true, showTotals: false })"
    >
      <template #default="{ state }">
        <bch-data-table
          :columns="columns"
          :rows="rows"
          :page-size="state.pageSize"
          :filterable="state.filterable"
          :show-totals="state.showTotals"
          caption="Registros"
        ></bch-data-table>
      </template>
      <template #controls="{ state }">
        <HstNumber v-model="state.pageSize" title="Tamaño de página" min="1" />
        <HstCheckbox v-model="state.filterable" title="Filtrado habilitado" />
        <HstCheckbox v-model="state.showTotals" title="Mostrar fila de totales" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-data-table label="Registros" caption="Lista de elementos" page-size="10">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elemento A</td>
              <td>Activo</td>
              <td>2026-01-10</td>
            </tr>
            <tr>
              <td>Elemento B</td>
              <td>Inactivo</td>
              <td>2026-01-11</td>
            </tr>
          </tbody>
        </table>
      </bch-data-table>
    </Variant>
  </Story>
</template>

<script setup>
const columns = [
  { key: 'nombre', type: 'text', label: 'Nombre' },
  { key: 'estado', type: 'text', label: 'Estado' },
  { key: 'fecha', type: 'text', label: 'Fecha' },
];
const rows = [
  { nombre: 'Elemento A', estado: 'Activo', fecha: '2026-01-10' },
  { nombre: 'Elemento B', estado: 'Inactivo', fecha: '2026-01-11' },
  { nombre: 'Elemento C', estado: 'Activo', fecha: '2026-01-12' },
  { nombre: 'Elemento D', estado: 'Pendiente', fecha: '2026-01-13' },
  { nombre: 'Elemento E', estado: 'Activo', fecha: '2026-01-14' },
  { nombre: 'Elemento F', estado: 'Inactivo', fecha: '2026-01-15' },
  { nombre: 'Elemento G', estado: 'Activo', fecha: '2026-01-16' },
  { nombre: 'Elemento H', estado: 'Pendiente', fecha: '2026-01-17' },
];
</script>

<docs lang="md">
# DataTable (`bch-data-table`)

Tabla interactiva real: ordenado, filtrado y paginado del lado del cliente
(sin recarga de página).

## Props

| Prop         | Tipo                                        | Default | Descripción                            |
| ------------ | ------------------------------------------- | ------- | -------------------------------------- |
| `columns`    | `BchTableColumn[]`                          | `[]`    | Definición de columnas.                |
| `rows`       | `(Record<string, string> \| BchTableRow)[]` | `[]`    | Filas de datos.                        |
| `pageSize`   | `number`                                    | `0`     | Filas por página (0 = sin paginación). |
| `filterable` | `boolean`                                   | `false` | Habilitar filtro de texto.             |
| `showTotals` | `boolean`                                   | `false` | Mostrar fila de totales.               |
| `caption`    | `string`                                    | `''`    | Título de la tabla.                    |

## Eventos

| Evento            | Detail | Cuándo se dispara                         |
| ----------------- | ------ | ----------------------------------------- |
| `bchPageChange`   | -      | El usuario cambia de página.              |
| `bchSortChange`   | -      | El usuario ordena una columna.            |
| `bchFilterChange` | -      | El usuario aplica un filtro.              |
| `bchCellChange`   | -      | El usuario confirma una edición de celda. |
| `bchPaste`        | -      | El usuario pega una tabla (portapapeles). |
</docs>
