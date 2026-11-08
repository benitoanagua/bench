<template>
  <Story title="Components/Combobox">
    <Variant name="Por defecto">
      <bch-combobox label="País" name="country" placeholder="Selecciona…">
        <bch-combobox-option value="es">España</bch-combobox-option>
        <bch-combobox-option value="mx">México</bch-combobox-option>
        <bch-combobox-option value="ar">Argentina</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant name="Con sugerencia">
      <bch-combobox label="Ciudad" name="city" hint="Escribe para buscar">
        <bch-combobox-option value="mad">Madrid</bch-combobox-option>
        <bch-combobox-option value="bcn">Barcelona</bch-combobox-option>
        <bch-combobox-option value="val">Valencia</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant name="Valor personalizado permitido">
      <bch-combobox
        label="Etiquetas"
        name="tags"
        allow-custom-value
        placeholder="Escribe una etiqueta…"
      >
        <bch-combobox-option value="urgente">Urgente</bch-combobox-option>
        <bch-combobox-option value="revisar">Revisar</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-combobox label="Bloqueado" name="locked" disabled value="es">
        <bch-combobox-option value="es">España</bch-combobox-option>
      </bch-combobox>
    </Variant>
  </Story>
</template>
