<template>
  <Story title="Components/FormField">
    <Variant
      title="Playground"
      :initState="
        () => ({ label: 'Nombre completo', hint: 'Nombre y apellidos', error: '', required: false })
      "
    >
      <template #default="{ state }">
        <bch-form-field
          :label="state.label"
          :hint="state.hint"
          :error="state.error"
          :required="state.required"
        >
          <bch-input name="fullname" placeholder="María García López"></bch-input>
        </bch-form-field>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.hint" title="Sugerencia" />
        <HstText v-model="state.error" title="Error" />
        <HstCheckbox v-model="state.required" title="Requerido" />
      </template>
    </Variant>
    <Variant title="Envuelve control personalizado">
      <bch-form-field label="Nombre completo" hint="Nombre y apellidos">
        <bch-input name="fullname"></bch-input>
      </bch-form-field>
    </Variant>
    <Variant title="Con error">
      <bch-form-field label="Correo" error="Introduce un correo válido">
        <bch-input name="email"></bch-input>
      </bch-form-field>
    </Variant>
  </Story>
</template>

<docs lang="md">
# FormField (`bch-form-field`)

Etiqueta, sugerencia y mensaje de error para un control de formulario. Asocia
la etiqueta con el control interno para accesibilidad.

## Props

| Prop       | Tipo      | Default | Descripción                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `label`    | `string`  | `''`    | Etiqueta del campo.                 |
| `hint`     | `string`  | `''`    | Texto de ayuda.                     |
| `error`    | `string`  | `''`    | Mensaje de error (estado inválido). |
| `required` | `boolean` | `false` | Campo obligatorio.                  |
</docs>
