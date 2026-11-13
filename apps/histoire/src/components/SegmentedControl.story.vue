<template>
  <Story title="Components/SegmentedControl">
    <Variant title="Playground" :initState="() => ({ value: 'day', label: 'Vista' })">
      <template #default="{ state }">
        <bch-segmented-control
          :label="state.label"
          :value="state.value"
          @bch-change="state.value = $event.detail"
        >
          <bch-segmented-item value="day">Día</bch-segmented-item>
          <bch-segmented-item value="week">Semana</bch-segmented-item>
          <bch-segmented-item value="month">Mes</bch-segmented-item>
        </bch-segmented-control>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Seleccionado: {{ state.value }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstSelect v-model="state.value" title="Valor" :options="['day', 'week', 'month']" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-segmented-control label="Vista" value="list">
        <bch-segmented-item value="day">Día</bch-segmented-item>
        <bch-segmented-item value="week">Semana</bch-segmented-item>
        <bch-segmented-item value="month">Mes</bch-segmented-item>
      </bch-segmented-control>
    </Variant>
    <Variant title="Con opción deshabilitada">
      <bch-segmented-control label="Filtro" value="all">
        <bch-segmented-item value="all">Todos</bch-segmented-item>
        <bch-segmented-item value="active" disabled>Activos</bch-segmented-item>
        <bch-segmented-item value="archived">Archivados</bch-segmented-item>
      </bch-segmented-control>
    </Variant>
  </Story>
</template>

<docs lang="md">
# SegmentedControl (`bch-segmented-control` + `bch-segmented-item`)

Select mutuamente exclusivo entre un conjunto pequeño de opciones.

## Props

### bch-segmented-control

| Prop    | Tipo     | Default | Descripción                   |
| ------- | -------- | ------- | ----------------------------- |
| `label` | `string` | `''`    | Etiqueta accesible del grupo. |
| `value` | `string` | `''`    | Valor seleccionado.           |

### bch-segmented-item

| Prop       | Tipo      | Default | Descripción             |
| ---------- | --------- | ------- | ----------------------- |
| `value`    | `string`  | `''`    | Valor del segmento.     |
| `disabled` | `boolean` | `false` | Segmento deshabilitado. |

## Eventos

| Evento      | Detail   | Cuándo se dispara                    |
| ----------- | -------- | ------------------------------------ |
| `bchChange` | `string` | El usuario selecciona otro segmento. |
</docs>
