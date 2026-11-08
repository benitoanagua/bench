<template>
  <Story title="Components/Textarea">
    <Variant name="Por defecto">
      <bch-textarea label="Comentarios" name="comments" placeholder="Escribe aquí…"></bch-textarea>
    </Variant>
    <Variant name="Con sugerencia">
      <bch-textarea label="Descripción" name="desc" hint="Máximo 500 caracteres"></bch-textarea>
    </Variant>
    <Variant name="Con error">
      <bch-textarea label="Observaciones" name="obs" error="Campo requerido"></bch-textarea>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-textarea label="Bloqueado" name="locked" disabled>Texto no editable</bch-textarea>
    </Variant>
    <Variant name="Filas personalizadas">
      <bch-textarea label="Área grande" name="big" rows="6">Contenido inicial</bch-textarea>
    </Variant>
  </Story>
</template>
