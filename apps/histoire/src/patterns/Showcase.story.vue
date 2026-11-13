<template>
  <Story title="Patterns/Showcase">
    <Variant title="Superficie de producto">
      <div style="padding: 24px; display: grid; gap: 16px">
        <bch-metric-card
          label="Ingresos hoy"
          value="$1.240"
          trend="+8%"
          tone="success"
        ></bch-metric-card>
        <bch-metric-card label="Pedidos" value="84" trend="-2%" tone="negative"></bch-metric-card>
        <bch-metric-card
          label="Tasa de conversión"
          value="3.4%"
          trend="+0.4%"
          tone="positive"
        ></bch-metric-card>
      </div>
    </Variant>
    <Variant title="Responsive">
      <bch-card style="max-width: 400px">
        <div style="padding: 16px">
          <bch-input label="Buscar" name="search" placeholder="Buscar productos…"></bch-input>
          <bch-button variant="primary" full-width style="margin-top: 12px">Buscar</bch-button>
        </div>
      </bch-card>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Showcase (patrón)

Superficies de producto con tarjetas de métrica y formularios reducidos.
</docs>
