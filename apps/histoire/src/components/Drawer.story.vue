<template>
  <Story title="Components/Drawer">
    <Variant
      title="Playground"
      :initState="
        () => ({ open: false, label: 'Panel lateral', side: 'right', closeOnEscape: true })
      "
    >
      <template #default="{ state }">
        <bch-button @click="state.open = true">Abrir cajón</bch-button>
        <bch-drawer
          :open="state.open"
          :label="state.label"
          :side="state.side"
          :close-on-escape="state.closeOnEscape"
          @bchClose="state.open = false"
        >
          Contenido del cajón lateral.
          <div style="margin-top: 16px; display: flex; justify-content: flex-end">
            <bch-button variant="primary" @click="state.open = false">Cerrar</bch-button>
          </div>
        </bch-drawer>
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.open" title="Abierto" />
        <HstText v-model="state.label" title="Etiqueta (aria-label)" />
        <HstSelect v-model="state.side" title="Lado" :options="['left', 'right', 'start', 'end']" />
        <HstCheckbox v-model="state.closeOnEscape" title="Cerrar con Escape" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-drawer label="Panel lateral" side="right"> Contenido del cajón lateral. </bch-drawer>
    </Variant>
    <Variant title="Lado izquierdo">
      <bch-drawer label="Menú" side="left"> Opciones de navegación. </bch-drawer>
    </Variant>
    <Variant title="Sin cerrar con Escape">
      <bch-drawer label="Forzado" close-on-escape="false">
        Cierre obligado mediante botón.
        <div style="margin-top: 16px; display: flex; justify-content: flex-end">
          <bch-button variant="primary">Cerrar cajón</bch-button>
        </div>
      </bch-drawer>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Drawer (`bch-drawer`)

Panel lateral deslizable. `start`/`end` son lógicos (espejan con `dir`);
`left`/`right` son físicos y se mantienen para compatibilidad.

## Props

| Prop            | Tipo                                    | Default | Descripción            |
| --------------- | --------------------------------------- | ------- | ---------------------- |
| `open`          | `boolean`                               | `false` | Visibilidad del cajón. |
| `label`         | `string`                                | `''`    | Nombre accesible.      |
| `side`          | `'left' \| 'right' \| 'start' \| 'end'` | `'end'` | Lado de anclaje.       |
| `closeOnEscape` | `boolean`                               | `true`  | Cierra con `Escape`.   |

## Métodos

| Método    | Descripción      |
| --------- | ---------------- |
| `show()`  | Abre el cajón.   |
| `close()` | Cierra el cajón. |

## Eventos

| Evento     | Cuándo se dispara   |
| ---------- | ------------------- |
| `bchClose` | El cajón se cierra. |
</docs>
