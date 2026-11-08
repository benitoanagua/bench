<template>
  <Story title="Components/Avatar">
    <Variant name="Con iniciales">
      <bch-avatar name="María García" size="medium"></bch-avatar>
    </Variant>
    <Variant name="Con imagen">
      <bch-avatar name="Usuario" src="https://via.placeholder.com/64" shape="circle"></bch-avatar>
    </Variant>
    <Variant name="Tamaños">
      <bch-avatar name="XS" size="xsmall"></bch-avatar>
      <bch-avatar name="S" size="small"></bch-avatar>
      <bch-avatar name="M" size="medium"></bch-avatar>
      <bch-avatar name="L" size="large"></bch-avatar>
    </Variant>
    <Variant name="Formas y estado">
      <bch-avatar name="Activo" size="medium" status="online"></bch-avatar>
      <bch-avatar name="Ocupado" size="medium" status="busy"></bch-avatar>
      <bch-avatar name="Cuadrado" size="medium" shape="square"></bch-avatar>
    </Variant>
  </Story>
</template>
