<template>
  <Story title="Patterns/Forms">
    <Variant name="Formulario de contacto">
      <bch-form-field label="Nombre completo" name="fullname" hint="Nombre y apellidos">
        <bch-input name="fullname" placeholder="María García López"></bch-input>
      </bch-form-field>
      <bch-form-field label="Correo electrónico" name="email" hint="Dirección de correo">
        <bch-input name="email" type="email" placeholder="nombre@ejemplo.com"></bch-input>
      </bch-form-field>
      <bch-form-field label="Asunto" name="subject">
        <bch-select name="subject">
          <bch-combobox-option value="consulta">Consulta</bch-combobox-option>
          <bch-combobox-option value="soporte">Soporte técnico</bch-combobox-option>
          <bch-combobox-option value="facturacion">Facturación</bch-combobox-option>
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
