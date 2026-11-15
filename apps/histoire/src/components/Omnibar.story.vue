<script setup>
// bch-omnibar espera el índice de funciones de la app (BchFunctionEntry[],
// §4.1): id, nombre, path, tipo. Pasar cadenas sueltas rompe el ranking.
const entries = [
  {
    id: 'fn-nueva-factura',
    nombre: 'Nueva factura',
    path: ['Ventas', 'Facturación'],
    sinonimos: ['crear factura'],
    tipo: 'accion',
    frecuenciaUso: 42,
  },
  {
    id: 'fn-listado-facturas',
    nombre: 'Listado de facturas',
    path: ['Ventas', 'Facturación'],
    tipo: 'pantalla',
    frecuenciaUso: 17,
  },
];
</script>

<template>
  <Story title="Components/Omnibar">
    <Variant title="Playground" :initState="() => ({ placeholder: 'Buscar funciones…' })">
      <template #default="{ state }">
        <bch-omnibar :placeholder="state.placeholder" :entries="entries"></bch-omnibar>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.placeholder" title="Placeholder" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-omnibar placeholder="Buscar funciones…" :entries="entries"></bch-omnibar>
    </Variant>
    <Variant title="Índice vacío">
      <bch-omnibar placeholder="No hay resultados"></bch-omnibar>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Omnibar (`bch-omnibar`)

Punto de entrada único a las funciones del sistema (§4.1). Recibe el índice de
funciones mediante `entries` (objetos `BchFunctionEntry`, no cadenas) y las
ordena por coincidencia de alias, nombre o ruta de breadcrumb.

## Props

| Prop          | Tipo                 | Default                              | Descripción                      |
| ------------- | -------------------- | ------------------------------------ | -------------------------------- |
| `entries`     | `BchFunctionEntry[]` | `[]`                                 | Índice de funciones (app-owned). |
| `placeholder` | `string`             | `'Search functions or filter (field:value)'` | Placeholder del input.   |

## Eventos

| Evento     | Cuándo se dispara                            | Detalle                                  |
| ---------- | -------------------------------------------- | ---------------------------------------- |
| `bchRun`   | El usuario ejecuta una entrada con Enter.    | `BchFunctionEntry` o `{ text }` (texto). |
| `bchInput` | Cambia el texto de búsqueda.                 | Texto actual.                            |
</docs>
