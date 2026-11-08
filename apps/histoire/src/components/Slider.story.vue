<template>
  <Story title="Components/Slider">
    <Variant name="Por defecto">
      <bch-slider label="Volumen" min="0" max="100" step="1" value="50"></bch-slider>
    </Variant>
    <Variant name="Con etiqueta de valor">
      <bch-slider label="Brillo" min="0" max="100" step="5" value="80" show-value></bch-slider>
    </Variant>
    <Variant name="Rango">
      <bch-slider label="Rango" min="0" max="100" step="1" value="30,70"></bch-slider>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-slider label="Bloqueado" min="0" max="100" value="40" disabled></bch-slider>
    </Variant>
  </Story>
</template>
