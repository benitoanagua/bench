<template>
  <Story title="Components/Dialog">
    <Variant
      title="Playground"
      :initState="
        () => ({ open: false, label: 'Confirmar acción', tone: 'standard', closeOnEscape: true })
      "
    >
      <template #default="{ state }">
        <bch-button @click="state.open = true">Abrir diálogo</bch-button>
        <bch-dialog
          :open="state.open"
          :label="state.label"
          :tone="state.tone"
          :close-on-escape="state.closeOnEscape"
          @bchClose="state.open = false"
        >
          ¿Está seguro de que desea continuar?
          <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end">
            <bch-button variant="secondary" @click="state.open = false">Cancelar</bch-button>
            <bch-button variant="primary" @click="state.open = false">Aceptar</bch-button>
          </div>
        </bch-dialog>
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.open" title="Abierto" />
        <HstText v-model="state.label" title="Etiqueta (aria-label)" />
        <HstSelect v-model="state.tone" title="Tono" :options="['standard', 'critical']" />
        <HstCheckbox v-model="state.closeOnEscape" title="Cerrar con Escape" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-dialog label="Confirmar acción" tone="standard">
        ¿Está seguro de que desea continuar?
      </bch-dialog>
    </Variant>
    <Variant title="Crítico">
      <bch-dialog label="Eliminar elemento" tone="critical">
        Esta acción no se puede deshacer.
      </bch-dialog>
    </Variant>
    <Variant title="Sin cerrar con Escape">
      <bch-dialog label="Diálogo forzado" close-on-escape="false">
        Debe usar un botón para cerrar este diálogo.
        <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end">
          <bch-button variant="primary">Cerrar diálogo</bch-button>
        </div>
      </bch-dialog>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Dialog (`bch-dialog`)

Modal bloqueante con anclaje de foco. Usar `tone="critical"` solo para acciones
irreversibles (Regla 8).

## Props

| Prop            | Tipo                       | Default      | Descripción                    |
| --------------- | -------------------------- | ------------ | ------------------------------ |
| `open`          | `boolean`                  | `false`      | Visibilidad del diálogo.       |
| `label`         | `string`                   | `''`         | Nombre accesible (aria-label). |
| `tone`          | `'standard' \| 'critical'` | `'standard'` | Tono visual.                   |
| `closeOnEscape` | `boolean`                  | `true`       | Cierra con la tecla `Escape`.  |

## Métodos

| Método    | Descripción                           |
| --------- | ------------------------------------- |
| `show()`  | Abre el diálogo y atrapa el foco.     |
| `close()` | Cierra el diálogo y devuelve el foco. |

## Eventos

| Evento     | Cuándo se dispara     |
| ---------- | --------------------- |
| `bchClose` | El diálogo se cierra. |

## Teclado

`Escape` cierra el diálogo (salvo `close-on-escape="false"`). El foco queda
atrapado dentro del diálogo mientras está abierto y vuelve al disparador al
cerrar.
</docs>
