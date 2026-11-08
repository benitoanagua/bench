<template>
  <Story title="Components/TimePicker">
    <Variant name="Por defecto">
      <bch-time-picker label="Hora" name="time" placeholder="Selecciona…"></bch-time-picker>
    </Variant>
    <Variant name="Con valor">
      <bch-time-picker label="Hora de inicio" name="start" value="09:00"></bch-time-picker>
    </Variant>
    <Variant name="Con paso">
      <bch-time-picker label="Intervalo" name="interval" step="15"></bch-time-picker>
    </Variant>
    <Variant name="Con error">
      <bch-time-picker
        label="Cita"
        name="appointment"
        error="Hora fuera de rango"
      ></bch-time-picker>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-time-picker label="Bloqueada" name="locked" disabled></bch-time-picker>
    </Variant>
  </Story>
</template>
