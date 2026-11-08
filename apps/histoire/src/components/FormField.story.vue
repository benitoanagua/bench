<template>
  <Story title="Components/FormField">
    <Variant name="Envuelve control personalizado">
      <bch-form-field label="Nombre completo" hint="Nombre y apellidos">
        <bch-input name="fullname"></bch-input>
      </bch-form-field>
    </Variant>
    <Variant name="Con error">
      <bch-form-field label="Correo" error="Introduce un correo válido">
        <bch-input name="email"></bch-input>
      </bch-form-field>
    </Variant>
  </Story>
</template>
