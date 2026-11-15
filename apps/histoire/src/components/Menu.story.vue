<script setup>
// `open` es prop mutable de bch-menu: los controles del Playground permiten
// abrir/cerrar el menú sin interactuar con el disparador.
const initState = () => ({ open: false, label: 'Acciones', placement: 'bottom-start' });
</script>

<template>
  <Story title="Components/Menu">
    <Variant title="Playground" :initState="initState">
      <template #default="{ state }">
        <bch-menu
          :label="state.label"
          :placement="state.placement"
          :open="state.open"
          @bchOpenChange="state.open = $event.detail"
        >
          <bch-button slot="trigger">{{ state.label }}</bch-button>
          <bch-menu-item value="edit">Editar</bch-menu-item>
          <bch-menu-item value="duplicate">Duplicar</bch-menu-item>
          <bch-menu-item value="delete" tone="critical">Eliminar</bch-menu-item>
        </bch-menu>
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.open" title="Abierto" />
        <HstText v-model="state.label" title="Etiqueta (aria-label)" />
        <HstSelect
          v-model="state.placement"
          title="Colocación"
          :options="['bottom-start', 'bottom-end']"
        />
      </template>
    </Variant>

    <!-- El menú necesita un elemento con slot="trigger"; sin él no hay nada
         que abrir y el lienzo queda vacío. -->
    <Variant title="Por defecto / Abierto">
      <bch-menu label="Acciones" placement="bottom-start" :open="true">
        <bch-button slot="trigger">Acciones</bch-button>
        <bch-menu-item value="edit">Editar</bch-menu-item>
        <bch-menu-item value="duplicate">Duplicar</bch-menu-item>
        <bch-menu-item value="delete" tone="critical">Eliminar</bch-menu-item>
      </bch-menu>
    </Variant>

    <Variant title="Con elemento deshabilitado">
      <bch-menu label="Opciones" placement="bottom">
        <bch-button slot="trigger">Opciones</bch-button>
        <bch-menu-item value="view">Ver</bch-menu-item>
        <bch-menu-item value="edit" disabled>Editar</bch-menu-item>
        <bch-menu-item value="delete">Eliminar</bch-menu-item>
      </bch-menu>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Menu (`bch-menu`)

Menú contextual con un disparador y elementos accionables. El primer elemento
con `slot="trigger"` (normalmente un `bch-button`) abre el menú; los
`bch-menu-item` hijos componen el contenido. Soporta colocación y tono
crítico para acciones de eliminación.

## Props

| Prop        | Tipo                            | Default          | Descripción            |
| ----------- | ------------------------------- | ---------------- | ---------------------- |
| `open`      | `boolean`                       | `false`          | Visibilidad del menú.  |
| `label`     | `string`                        | `''`             | Nombre accesible.      |
| `placement` | `'bottom-start' \| 'bottom-end'` | `'bottom-start'` | Posición del menú.     |

## Slots

| Slot       | Descripción                                                    |
| ---------- | -------------------------------------------------------------- |
| `trigger`  | Elemento disparador (obligatorio; sin él el menú no abre).      |
| (default)  | `bch-menu-item` con el contenido del menú.                     |

## Items

| Item            | Descripción                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ |
| `bch-menu-item` | Elemento de menú accionable. Usa `tone="critical"` para acciones de eliminación.             |

## Eventos

| Evento         | Cuándo se dispara        |
| -------------- | ------------------------ |
| `bchOpenChange`| El menú abre o se cierra.|
| `bchSelect`    | Se selecciona un item.   |

## Teclado

`ArrowDown`/`ArrowUp` navegan entre items, `Home`/`End` saltan al primero/último,
`Enter` activa el item y `Escape` cierra el menú devolviendo el foco al
disparador.
</docs>
