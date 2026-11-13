<template>
  <Story title="Components/Combobox">
    <Variant
      title="Playground"
      :initState="
        () => ({
          value: '',
          disabled: false,
          error: '',
          allowCustomValue: false,
          placeholder: 'Selecciona…',
        })
      "
    >
      <template #default="{ state }">
        <bch-combobox
          label="País"
          name="country"
          :value="state.value"
          :disabled="state.disabled"
          :error="state.error"
          :placeholder="state.placeholder"
          :allow-custom-value="state.allowCustomValue"
          @bch-input="state.value = $event.detail"
          @bch-change="state.value = $event.detail"
        >
          <bch-combobox-option value="es">España</bch-combobox-option>
          <bch-combobox-option value="mx">México</bch-combobox-option>
          <bch-combobox-option value="ar">Argentina</bch-combobox-option>
        </bch-combobox>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Valor: {{ state.value || '(vacío)' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.value" title="Valor" />
        <HstText v-model="state.placeholder" title="Placeholder" />
        <HstText v-model="state.error" title="Error" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
        <HstCheckbox v-model="state.allowCustomValue" title="Valor personalizado permitido" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-combobox label="País" name="country" placeholder="Selecciona…">
        <bch-combobox-option value="es">España</bch-combobox-option>
        <bch-combobox-option value="mx">México</bch-combobox-option>
        <bch-combobox-option value="ar">Argentina</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant title="Con sugerencia">
      <bch-combobox label="Ciudad" name="city" hint="Escribe para buscar">
        <bch-combobox-option value="mad">Madrid</bch-combobox-option>
        <bch-combobox-option value="bcn">Barcelona</bch-combobox-option>
        <bch-combobox-option value="val">Valencia</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant title="Valor personalizado permitido">
      <bch-combobox
        label="Etiquetas"
        name="tags"
        allow-custom-value
        placeholder="Escribe una etiqueta…"
      >
        <bch-combobox-option value="urgente">Urgente</bch-combobox-option>
        <bch-combobox-option value="revisar">Revisar</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant title="Con error">
      <bch-combobox label="Inválido" name="bad" error="No es una opción válida" value="zz">
        <bch-combobox-option value="es">España</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-combobox label="Bloqueado" name="locked" disabled value="es">
        <bch-combobox-option value="es">España</bch-combobox-option>
      </bch-combobox>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Combobox (`bch-combobox` + `bch-combobox-option`)

Combobox tipo-a-fecha siguiendo WAI-ARIA 1.2: input con `role="combobox"` y
popup `role="listbox"`, navegación con `aria-activedescendant`.

## Props

| Prop               | Tipo      | Default        | Descripción                        |
| ------------------ | --------- | -------------- | ---------------------------------- |
| `value`            | `string`  | `''`           | Valor seleccionado.                |
| `label`            | `string`  | `''`           | Etiqueta visible.                  |
| `name`             | `string`  | `''`           | Nombre del campo.                  |
| `placeholder`      | `string`  | `''`           | Texto de ayuda del input.          |
| `hint`             | `string`  | `''`           | Texto de ayuda secundario.         |
| `error`            | `string`  | `''`           | Texto de error (estado inválido).  |
| `disabled`         | `boolean` | `false`        | Desactiva el control.              |
| `required`         | `boolean` | `false`        | Campo obligatorio.                 |
| `allowCustomValue` | `boolean` | `false`        | Permite valores no listados.       |
| `noResultsText`    | `string`  | `'No results'` | Texto cuando no hay coincidencias. |

## Eventos

| Evento      | Detail   | Cuándo se dispara                   |
| ----------- | -------- | ----------------------------------- |
| `bchInput`  | `string` | El usuario escribe en el input.     |
| `bchChange` | `string` | El valor cambia (selección o blur). |

## Teclado

`↓`/`↑` navegan opciones, `Enter` confirma, `Escape` cierra y restaura el valor.
</docs>
