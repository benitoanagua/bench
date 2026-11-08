<template>
  <Story title="Components/Tabs">
    <Variant name="Por defecto">
      <bch-tabs value="tab1">
        <bch-tab value="tab1">Primera</bch-tab>
        <bch-tab value="tab2">Segunda</bch-tab>
        <bch-tab value="tab3">Tercera</bch-tab>
        <bch-tab-panel value="tab1">Panel de la primera pestaña</bch-tab-panel>
        <bch-tab-panel value="tab2">Panel de la segunda pestaña</bch-tab-panel>
        <bch-tab-panel value="tab3">Panel de la tercera pestaña</bch-tab-panel>
      </bch-tabs>
    </Variant>
    <Variant name="Con pestaña deshabilitada">
      <bch-tabs value="tab1">
        <bch-tab value="tab1">Activa</bch-tab>
        <bch-tab value="tab2" disabled>Deshabilitada</bch-tab>
        <bch-tab-panel value="tab1">Contenido activo</bch-tab-panel>
        <bch-tab-panel value="tab2">Contenido oculto</bch-tab-panel>
      </bch-tabs>
    </Variant>
  </Story>
</template>
