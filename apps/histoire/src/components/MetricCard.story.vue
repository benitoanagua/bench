<template>
  <Story title="Components/MetricCard">
    <Variant name="Por defecto">
      <bch-metric-card label="Ingresos" value="$42.500" trend="+12%" tone="success"></bch-metric-card>
    </Variant>
    <Variant name="Tendencia negativa">
      <bch-metric-card label="Errores" value="12" trend="-5%" tone="error"></bch-metric-card>
    </Variant>
    <Variant name="Tono informativo">
      <bch-metric-card label="Usuarios activos" value="1.234" trend="+2%" tone="info"></bch-metric-card>
    </Variant>
  </Story>
</template>
