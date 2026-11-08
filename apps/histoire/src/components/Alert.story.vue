<template>
  <Story title="Components/Alert">
    <Variant name="Por defecto">
      <bch-alert heading="Información importante" tone="info">
        Se ha programado una mantenimiento para esta noche.
      </bch-alert>
    </Variant>
    <Variant name="Descartable">
      <bch-alert heading="Cambios en la configuración" tone="warning" dismissible>
        Algunos ajustes se han restablecido a sus valores predeterminados.
      </bch-alert>
    </Variant>
    <Variant name="Crítico">
      <bch-alert heading="Error crítico" tone="critical">
        No se pudo establecer conexión con el servidor.
      </bch-alert>
    </Variant>
  </Story>
</template>
