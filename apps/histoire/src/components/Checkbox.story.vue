<template>
  <Story title="Components/Checkbox">
    <Variant
      title="Playground"
      :initState="
        () => ({
          label: 'Aceptar términos',
          name: 'terms',
          checked: false,
          disabled: false,
          required: false,
        })
      "
    >
      <template #default="{ state }">
        <bch-checkbox
          :label="state.label"
          :name="state.name"
          :checked="state.checked"
          :disabled="state.disabled"
          :required="state.required"
          @bchChange="state.checked = $event.detail"
        ></bch-checkbox>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Estado: {{ state.checked ? 'marcado' : 'no marcado' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.name" title="Name" />
        <HstCheckbox v-model="state.checked" title="Marcado" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
        <HstCheckbox v-model="state.required" title="Requerido" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-checkbox label="Aceptar términos" name="terms"></bch-checkbox>
    </Variant>
    <Variant title="Marcado">
      <bch-checkbox label="Aceptar términos" name="terms" checked></bch-checkbox>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-checkbox label="Opción bloqueada" name="locked" disabled></bch-checkbox>
    </Variant>
    <Variant title="Requerido">
      <bch-checkbox label="Campo obligatorio" name="required" required></bch-checkbox>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Checkbox (`bch-checkbox`)

Control de selección binaria con etiqueta visible.

## Props

| Prop       | Tipo      | Default | Descripción           |
| ---------- | --------- | ------- | --------------------- |
| `checked`  | `boolean` | `false` | Estado marcado.       |
| `disabled` | `boolean` | `false` | Desactiva el control. |
| `label`    | `string`  | `''`    | Etiqueta visible.     |
| `name`     | `string`  | `''`    | Nombre del campo.     |
| `required` | `boolean` | `false` | Campo obligatorio.    |
| `value`    | `string`  | `'on'`  | Valor enviado.        |

## Eventos

| Evento      | Detail    | Cuándo se dispara            |
| ----------- | --------- | ---------------------------- |
| `bchChange` | `boolean` | El usuario cambia el estado. |

## Teclado

Focable con `Tab`; se marca/desmarca con `Espacio`.
</docs>
