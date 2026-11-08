<template>
  <Story title="Components/Select">
    <Variant name="Por defecto">
      <bch-select label="País" name="country">
        <bch-combobox-option value="es">España</bch-combobox-option>
        <bch-combobox-option value="mx">México</bch-combobox-option>
        <bch-combobox-option value="ar">Argentina</bch-combobox-option>
      </bch-select>
    </Variant>
    <Variant name="Con sugerencia">
      <bch-select label="Idioma" name="lang" hint="Se usa en la interfaz">
        <bch-combobox-option value="es">Español</bch-combobox-option>
        <bch-combobox-option value="en">Inglés</bch-combobox-option>
      </bch-select>
    </Variant>
    <Variant name="Con error">
      <bch-select label="Categoría" name="cat" error="Selecciona una categoría">
        <bch-combobox-option value="a">Categoría A</bch-combobox-option>
        <bch-combobox-option value="b">Categoría B</bch-combobox-option>
      </bch-select>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-select label="Región" name="region" disabled>
        <bch-combobox-option value="eu">Europa</bch-combobox-option>
      </bch-select>
    </Variant>
  </Story>
</template>
