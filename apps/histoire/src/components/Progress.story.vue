<template>
  <Story title="Components/Progress">
    <Variant name="Por defecto">
      <bch-progress label="Carga" value="45"></bch-progress>
    </Variant>
    <Variant name="Indeterminado">
      <bch-progress label="Procesando" indeterminate></bch-progress>
    </Variant>
    <Variant name="Tonos">
      <bch-progress label="Éxito" value="70" tone="success"></bch-progress>
      <bch-progress label="Advertencia" value="50" tone="warning"></bch-progress>
      <bch-progress label="Error" value="30" tone="error"></bch-progress>
    </Variant>
  </Story>
</template>
