<template>
  <Story title="Components/Textarea">
    <Variant
      title="Playground"
      :initState="
        () => ({
          label: 'Comentarios',
          name: 'comments',
          value: '',
          rows: 4,
          placeholder: '',
          error: '',
          disabled: false,
          readonly: false,
          required: false,
        })
      "
    >
      <template #default="{ state }">
        <bch-textarea
          :label="state.label"
          :name="state.name"
          :value="state.value"
          :rows="state.rows"
          :placeholder="state.placeholder"
          :error="state.error"
          :disabled="state.disabled"
          :readonly="state.readonly"
          :required="state.required"
          @bch-input="state.value = $event.detail"
        ></bch-textarea>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Valor: {{ state.value || '(vacío)' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.name" title="Name" />
        <HstText v-model="state.value" title="Valor" />
        <HstNumber v-model="state.rows" title="Filas" min="1" />
        <HstText v-model="state.placeholder" title="Placeholder" />
        <HstText v-model="state.error" title="Error" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
        <HstCheckbox v-model="state.readonly" title="Sólo lectura" />
        <HstCheckbox v-model="state.required" title="Requerido" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-textarea label="Comentarios" name="comments" placeholder="Escribe aquí…"></bch-textarea>
    </Variant>
    <Variant title="Con sugerencia">
      <bch-textarea label="Descripción" name="desc" hint="Máximo 500 caracteres"></bch-textarea>
    </Variant>
    <Variant title="Con error">
      <bch-textarea label="Observaciones" name="obs" error="Campo requerido"></bch-textarea>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-textarea label="Bloqueado" name="locked" disabled>Texto no editable</bch-textarea>
    </Variant>
    <Variant title="Filas personalizadas">
      <bch-textarea label="Área grande" name="big" rows="6">Contenido inicial</bch-textarea>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Textarea (`bch-textarea`)

Área de texto multilínea.

## Props

Igual que `bch-input`, más:

| Prop   | Tipo     | Default | Descripción     |
| ------ | -------- | ------- | --------------- |
| `rows` | `number` | `4`     | Filas visibles. |

## Eventos

| Evento     | Detail   | Cuándo se dispara   |
| ---------- | -------- | ------------------- |
| `bchInput` | `string` | El usuario escribe. |
</docs>
