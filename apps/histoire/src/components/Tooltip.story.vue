<template>
  <Story title="Components/Tooltip">
    <Variant name="Arriba">
      <bch-tooltip text="Información adicional" placement="top">
        <bch-button variant="secondary">Pasa el ratón</bch-button>
      </bch-tooltip>
    </Variant>
    <Variant name="Abajo">
      <bch-tooltip text="Acción secundaria" placement="bottom">
        <bch-button variant="secondary">Pasa el ratón</bch-button>
      </bch-tooltip>
    </Variant>
  </Story>
</template>
