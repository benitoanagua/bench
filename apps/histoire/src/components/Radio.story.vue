<template>
  <Story title="Components/Radio">
    <Variant name="Grupo">
      <bch-radio label="Opción A" name="option" value="a"></bch-radio>
      <bch-radio label="Opción B" name="option" value="b"></bch-radio>
      <bch-radio label="Opción C" name="option" value="c"></bch-radio>
    </Variant>
    <Variant name="Seleccionado">
      <bch-radio label="Opción A" name="option2" value="a"></bch-radio>
      <bch-radio label="Opción B" name="option2" value="b" checked></bch-radio>
      <bch-radio label="Opción C" name="option2" value="c"></bch-radio>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-radio label="Opción bloqueada" name="locked" value="x" disabled></bch-radio>
    </Variant>
  </Story>
</template>
