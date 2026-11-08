<template>
  <Story title="Components/Input">
    <Variant name="Por defecto">
      <bch-input label="Correo electrónico" name="email" placeholder="nombre@ejemplo.com"></bch-input>
    </Variant>
    <Variant name="Con sugerencia">
      <bch-input label="Usuario" name="user" hint="Entre 6 y 20 caracteres"></bch-input>
    </Variant>
    <Variant name="Con error">
      <bch-input label="Correo electrónico" name="email" error="Introduce un correo válido"></bch-input>
    </Variant>
    <Variant name="Contraseña">
      <bch-input label="Contraseña" name="password" type="password"></bch-input>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-input label="Campo bloqueado" name="locked" disabled value="No editable"></bch-input>
    </Variant>
    <Variant name="Sólo lectura">
      <bch-input label="Referencia" name="ref" readonly value="REF-2026"></bch-input>
    </Variant>
  </Story>
</template>
