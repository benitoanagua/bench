<template>
  <Story title="Components/Card">
    <Variant name="Por defecto">
      <bch-card>
        <div style="padding: 16px">Contenido de la tarjeta</div>
      </bch-card>
    </Variant>
    <Variant name="Interactiva">
      <bch-card interactive>
        <div style="padding: 16px">Tarjeta que se puede pulsar</div>
      </bch-card>
    </Variant>
    <Variant name="Con pie">
      <bch-card>
        <div style="padding: 16px">Contenido principal</div>
        <div style="padding: 8px 16px; border-top: 1px solid; font-size: 0.875rem; opacity: 0.7">
          Pie de tarjeta
        </div>
      </bch-card>
    </Variant>
  </Story>
</template>
