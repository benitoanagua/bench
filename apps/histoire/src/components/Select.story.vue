<template>
  <Story title="Components/Select">
    <Variant
      title="Playground"
      :initState="
        () => ({
          value: '',
          disabled: false,
          error: '',
          label: 'País',
          hint: '',
          selectName: 'country',
        })
      "
    >
      <template #default="{ state }">
        <bch-select
          :label="state.label"
          :name="state.selectName"
          :value="state.value"
          :disabled="state.disabled"
          :error="state.error"
          :hint="state.hint"
          @bch-change="state.value = $event.detail"
        >
          <option value="es">España</option>
          <option value="mx">México</option>
          <option value="ar">Argentina</option>
        </bch-select>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Valor: {{ state.value || '(vacío)' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.value" title="Valor" />
        <HstText v-model="state.hint" title="Sugerencia" />
        <HstText v-model="state.error" title="Error" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-select label="País" name="country">
        <option value="es">España</option>
        <option value="mx">México</option>
        <option value="ar">Argentina</option>
      </bch-select>
    </Variant>
    <Variant title="Con sugerencia">
      <bch-select label="Idioma" name="lang" hint="Se usa en la interfaz">
        <bch-select-option value="es">Español</bch-select-option>
        <bch-select-option value="en">Inglés</bch-select-option>
      </bch-select>
    </Variant>
    <Variant title="Con error">
      <bch-select label="Categoría" name="cat" error="Selecciona una categoría">
        <bch-select-option value="a">Categoría A</bch-select-option>
        <bch-select-option value="b">Categoría B</bch-select-option>
      </bch-select>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-select label="Región" name="region" disabled>
        <bch-select-option value="eu">Europa</bch-select-option>
      </bch-select>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Select (`bch-select` + `bch-select-option`)

Select nativo estilizado (proyecta las opciones sobre un `<select>` real).

## Props

| Prop                    | Tipo      | Default | Descripción          |
| ----------------------- | --------- | ------- | -------------------- |
| `value`                 | `string`  | `''`    | Valor seleccionado.  |
| `label` / `hint`        | `string`  | `''`    | Textos del campo.    |
| `error`                 | `string`  | `''`    | Mensaje de error.    |
| `name`                  | `string`  | `''`    | Nombre del campo.    |
| `disabled` / `required` | `boolean` | `false` | Estados del control. |

## Eventos

| Evento      | Detail   | Cuándo se dispara             |
| ----------- | -------- | ----------------------------- |
| `bchChange` | `string` | El usuario elige otra opción. |
</docs>
