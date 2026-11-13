<template>
  <Story title="Components/Slider">
    <Variant
      title="Playground"
      :initState="
        () => ({
          value: 50,
          min: 0,
          max: 100,
          step: 1,
          label: 'Volumen',
          showValue: false,
          disabled: false,
        })
      "
    >
      <template #default="{ state }">
        <bch-slider
          :value="state.value"
          :min="state.min"
          :max="state.max"
          :step="state.step"
          :label="state.label"
          :show-value="state.showValue"
          :disabled="state.disabled"
          @bch-input="state.value = Number($event.detail)"
          @bch-change="state.value = Number($event.detail)"
        ></bch-slider>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Valor: {{ state.value }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstNumber v-model="state.value" title="Valor" :min="state.min" :max="state.max" />
        <HstNumber v-model="state.min" title="Mínimo" />
        <HstNumber v-model="state.max" title="Máximo" />
        <HstNumber v-model="state.step" title="Paso" min="1" />
        <HstText v-model="state.label" title="Etiqueta" />
        <HstCheckbox v-model="state.showValue" title="Mostrar valor" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-slider label="Volumen" min="0" max="100" step="1" value="50"></bch-slider>
    </Variant>
    <Variant title="Con etiqueta de valor">
      <bch-slider label="Brillo" min="0" max="100" step="5" value="80" show-value></bch-slider>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-slider label="Bloqueado" min="0" max="100" value="40" disabled></bch-slider>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Slider (`bch-slider`)

Control de rango con `<input type="range">` nativo.

## Props

| Prop          | Tipo      | Default     | Descripción             |
| ------------- | --------- | ----------- | ----------------------- |
| `value`       | `number`  | `0`         | Valor actual.           |
| `min` / `max` | `number`  | `0` / `100` | Límites del rango.      |
| `step`        | `number`  | `1`         | Paso.                   |
| `showValue`   | `boolean` | `false`     | Mostrar valor numérico. |
| `disabled`    | `boolean` | `false`     | Desactiva el control.   |
| `label`       | `string`  | `''`        | Etiqueta accesible.     |

## Eventos

| Evento      | Detail   | Cuándo se dispara                |
| ----------- | -------- | -------------------------------- |
| `bchInput`  | `number` | El usuario arrastra el pulgar.   |
| `bchChange` | `number` | El valor cambia definitivamente. |
</docs>
