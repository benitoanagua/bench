<template>
  <Story title="Components/DatePicker">
    <Variant name="Por defecto">
      <bch-date-picker label="Fecha" name="date" placeholder="Selecciona…"></bch-date-picker>
    </Variant>
    <Variant name="Con valor">
      <bch-date-picker label="Fecha de inicio" name="start" value="2026-01-15"></bch-date-picker>
    </Variant>
    <Variant name="Con rango">
      <bch-date-picker label="Rango" name="range" min="2026-01-01" max="2026-12-31"></bch-date-picker>
    </Variant>
    <Variant name="Con error">
      <bch-date-picker label="Fecha límite" name="limit" error="Fecha inválida"></bch-date-picker>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-date-picker label="Bloqueada" name="locked" disabled></bch-date-picker>
    </Variant>
  </Story>
</template>
