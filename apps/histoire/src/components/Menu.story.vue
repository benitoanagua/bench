<template>
  <Story title="Components/Menu">
    <Variant title="Por defecto / Abierto">
      <bch-menu label="Acciones" placement="bottom-start">
        <bch-menu-item value="edit">Editar</bch-menu-item>
        <bch-menu-item value="duplicate">Duplicar</bch-menu-item>
        <bch-menu-item value="delete" tone="critical">Eliminar</bch-menu-item>
      </bch-menu>
    </Variant>

    <Variant title="Con elemento deshabilitado">
      <bch-menu label="Opciones" placement="bottom">
        <bch-menu-item value="view">Ver</bch-menu-item>
        <bch-menu-item value="edit" disabled>Editar</bch-menu-item>
        <bch-menu-item value="delete">Eliminar</bch-menu-item>
      </bch-menu>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Menu (`bch-menu`)

Menú contextual conitems accionables. Soporta colocación y tono crítico para
acciones de eliminación u objetos.

## Props

| Prop        | Tipo                | Default     | Descripción            |
| ----------- | ------------------- | ----------- | ---------------------- |
| `label`     | `string`            | `''`        | Nombre accesible.      |
| `placement` | `'bottom-start'`    | `'bottom-start'` | Posición del menú.   |

## Items

| Item        | Descripción |
| ----------- | ----------- |
| `bch-menu-item` | Elemento de menú accionable. Usa `tone="critical"` para acciones de eliminación. |

## Eventos

| Evento     | Cuándo se dispara |
| ---------- | ----------------- |
| `bchSelect` | Se selecciona un item. |
</docs>