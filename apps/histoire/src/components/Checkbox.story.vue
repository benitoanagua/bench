<template>
  <Story title="Components/Checkbox">
    <Variant name="Por defecto">
      <bch-checkbox label="Aceptar términos" name="terms"></bch-checkbox>
    </Variant>
    <Variant name="Marcado">
      <bch-checkbox label="Aceptar términos" name="terms" checked></bch-checkbox>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-checkbox label="Opción bloqueada" name="locked" disabled></bch-checkbox>
    </Variant>
    <Variant name="Requerido">
      <bch-checkbox label="Campo obligatorio" name="required" required></bch-checkbox>
    </Variant>
  </Story>
</template>
