<template>
  <Story title="Components/Input">
    <Variant
      title="Playground"
      :initState="
        () => ({
          label: 'Correo electrónico',
          name: 'email',
          value: '',
          type: 'text',
          placeholder: '',
          error: '',
          disabled: false,
          readonly: false,
          required: false,
        })
      "
    >
      <template #default="{ state }">
        <bch-input
          :label="state.label"
          :name="state.name"
          :value="state.value"
          :type="state.type"
          :placeholder="state.placeholder"
          :error="state.error"
          :disabled="state.disabled"
          :readonly="state.readonly"
          :required="state.required"
          @bch-input="state.value = $event.detail"
        ></bch-input>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Valor: {{ state.value || '(vacío)' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.name" title="Name" />
        <HstText v-model="state.value" title="Valor" />
        <HstSelect
          v-model="state.type"
          title="Tipo"
          :options="['text', 'email', 'password', 'number', 'tel', 'url']"
        />
        <HstText v-model="state.placeholder" title="Placeholder" />
        <HstText v-model="state.error" title="Error" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
        <HstCheckbox v-model="state.readonly" title="Sólo lectura" />
        <HstCheckbox v-model="state.required" title="Requerido" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-input
        label="Correo electrónico"
        name="email"
        placeholder="nombre@ejemplo.com"
      ></bch-input>
    </Variant>
    <Variant title="Con sugerencia">
      <bch-input label="Usuario" name="user" hint="Entre 6 y 20 caracteres"></bch-input>
    </Variant>
    <Variant title="Con error">
      <bch-input
        label="Correo electrónico"
        name="email"
        error="Introduce un correo válido"
      ></bch-input>
    </Variant>
    <Variant title="Contraseña">
      <bch-input label="Contraseña" name="password" type="password"></bch-input>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-input label="Campo bloqueado" name="locked" disabled value="No editable"></bch-input>
    </Variant>
    <Variant title="Sólo lectura">
      <bch-input label="Referencia" name="ref" readonly value="REF-2026"></bch-input>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Input (`bch-input`)

Campo de texto con etiqueta, sugerencia, error y estados.

## Props

| Prop                                 | Tipo      | Default  | Descripción                  |
| ------------------------------------ | --------- | -------- | ---------------------------- |
| `value`                              | `string`  | `''`     | Valor del campo.             |
| `type`                               | `string`  | `'text'` | Tipo nativo del input.       |
| `label` / `hint` / `placeholder`     | `string`  | `''`     | Textos del campo.            |
| `error`                              | `string`  | `''`     | Mensaje de error.            |
| `name`                               | `string`  | `''`     | Nombre del campo.            |
| `disabled` / `readonly` / `required` | `boolean` | `false`  | Estados del campo.           |
| `autocomplete` / `inputmode`         | `string`  | -        | Atributos nativos del input. |

## Eventos

| Evento     | Detail   | Cuándo se dispara   |
| ---------- | -------- | ------------------- |
| `bchInput` | `string` | El usuario escribe. |
</docs>
