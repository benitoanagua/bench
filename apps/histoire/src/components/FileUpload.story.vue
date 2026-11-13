<template>
  <Story title="Components/FileUpload">
    <Variant
      title="Playground"
      :initState="
        () => ({
          label: 'Documento',
          name: 'file',
          accept: '.pdf,.doc,.docx',
          multiple: false,
          disabled: false,
          error: '',
        })
      "
    >
      <template #default="{ state }">
        <bch-file-upload
          :label="state.label"
          :name="state.name"
          :accept="state.accept"
          :multiple="state.multiple"
          :disabled="state.disabled"
          :error="state.error"
        ></bch-file-upload>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.name" title="Name" />
        <HstText v-model="state.accept" title="Accept (tipos de archivo)" />
        <HstCheckbox v-model="state.multiple" title="Múltiples archivos" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
        <HstText v-model="state.error" title="Error" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-file-upload label="Documento" name="file" accept=".pdf,.doc,.docx"></bch-file-upload>
    </Variant>
    <Variant title="Solo imágenes">
      <bch-file-upload label="Imagen" name="image" accept="image/*"></bch-file-upload>
    </Variant>
    <Variant title="Múltiples archivos">
      <bch-file-upload label="Archivos" name="files" multiple></bch-file-upload>
    </Variant>
    <Variant title="Con error">
      <bch-file-upload label="Archivo" name="file" error="Tipo no permitido"></bch-file-upload>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-file-upload label="Bloqueado" name="locked" disabled></bch-file-upload>
    </Variant>
  </Story>
</template>

<docs lang="md">
# FileUpload (`bch-file-upload`)

Zona de soltar archivos + explorador nativo con validación de tipo y tamaño en
cliente (complementaria, no sustituye la validación del servidor).

## Props

| Prop           | Tipo      | Default | Descripción                                   |
| -------------- | --------- | ------- | --------------------------------------------- |
| `label`        | `string`  | `''`    | Etiqueta visible.                             |
| `name`         | `string`  | `''`    | Nombre del campo.                             |
| `accept`       | `string`  | `''`    | Tipos de archivo aceptados (ej. `.pdf,.doc`). |
| `maxSizeBytes` | `number`  | -       | Tamaño máximo en bytes.                       |
| `multiple`     | `boolean` | `false` | Varios archivos.                              |
| `disabled`     | `boolean` | `false` | Desactiva el control.                         |
| `required`     | `boolean` | `false` | Campo obligatorio.                            |
| `error`        | `string`  | `''`    | Texto de error.                               |
</docs>
