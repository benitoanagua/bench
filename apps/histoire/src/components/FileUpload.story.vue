<template>
  <Story title="Components/FileUpload">
    <Variant name="Por defecto">
      <bch-file-upload label="Documento" name="file" accept=".pdf,.doc,.docx"></bch-file-upload>
    </Variant>
    <Variant name="Sólo imágenes">
      <bch-file-upload label="Imagen" name="image" accept="image/*"></bch-file-upload>
    </Variant>
    <Variant name="Múltiples archivos">
      <bch-file-upload label="Archivos" name="files" multiple></bch-file-upload>
    </Variant>
    <Variant name="Con error">
      <bch-file-upload label="Archivo" name="file" error="Tipo no permitido"></bch-file-upload>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-file-upload label="Bloqueado" name="locked" disabled></bch-file-upload>
    </Variant>
  </Story>
</template>
