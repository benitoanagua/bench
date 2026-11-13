<template>
  <Story title="Components/MetricCard">
    <Variant
      title="Playground"
      :initState="() => ({ label: 'Ingresos', value: '$42.500', trend: '+12%', tone: 'neutral' })"
    >
      <template #default="{ state }">
        <bch-metric-card
          :label="state.label"
          :value="state.value"
          :trend="state.trend"
          :tone="state.tone"
        ></bch-metric-card>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.value" title="Valor" />
        <HstText v-model="state.trend" title="Tendencia" />
        <HstSelect
          v-model="state.tone"
          title="Tono"
          :options="['neutral', 'positive', 'negative']"
        />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-metric-card
        label="Ingresos"
        value="$42.500"
        trend="+12%"
        tone="success"
      ></bch-metric-card>
    </Variant>
    <Variant title="Tendencia negativa">
      <bch-metric-card label="Errores" value="12" trend="-5%" tone="negative"></bch-metric-card>
    </Variant>
    <Variant title="Tono informativo">
      <bch-metric-card
        label="Usuarios activos"
        value="1.234"
        trend="+2%"
        tone="neutral"
      ></bch-metric-card>
    </Variant>
  </Story>
</template>

<docs lang="md">
# MetricCard (`bch-metric-card`)

Tarjeta de métrica: valor grande, etiqueta y tendencia opcional.

## Props

| Prop    | Tipo                                    | Default     | Descripción             |
| ------- | --------------------------------------- | ----------- | ----------------------- |
| `label` | `string`                                | `''`        | Etiqueta de la métrica. |
| `value` | `string`                                | `''`        | Valor principal.        |
| `trend` | `string`                                | `''`        | Tendencia (ej. `+12%`). |
| `tone`  | `'neutral' \| 'positive' \| 'negative'` | `'neutral'` | Tono visual.            |
</docs>
