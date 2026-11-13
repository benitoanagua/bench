<template>
  <Story title="Patterns/Forms">
    <Variant title="Formulario de contacto">
      <bch-form-field label="Nombre completo" hint="Nombre y apellidos">
        <bch-input name="fullname" placeholder="María García López"></bch-input>
      </bch-form-field>
      <bch-form-field label="Correo electrónico" name="email" hint="Dirección de correo">
        <bch-input name="email" type="email" placeholder="nombre@ejemplo.com"></bch-input>
      </bch-form-field>
      <bch-form-field label="Asunto" name="subject">
        <bch-select name="subject">
          <option value="consulta">Consulta</option>
          <option value="soporte">Soporte técnico</option>
          <option value="facturacion">Facturación</option>
        </bch-select>
      </bch-form-field>
      <bch-form-field label="Mensaje" name="message">
        <bch-textarea
          name="message"
          rows="4"
          placeholder="¿En qué podemos ayudarte?"
        ></bch-textarea>
      </bch-form-field>
      <bch-form-field label="Aceptar términos" name="terms">
        <bch-checkbox name="terms" required>Acepto los términos y condiciones</bch-checkbox>
      </bch-form-field>
      <bch-button variant="primary" full-width>Enviar mensaje</bch-button>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Formulario (patrón)

Combinación de `bch-form-field`, `bch-input`, `bch-select`, `bch-textarea`,
`bch-checkbox` y `bch-button` para un formulario de contacto.
</docs>
