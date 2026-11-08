<template>
  <Story title="Components/StatusBar">
    <Variant name="Por defecto">
      <bch-status-bar>
        <span style="margin-right: auto">Estado del sistema</span>
        <bch-mode-badge mode="light" label="Modo claro"></bch-mode-badge>
      </bch-status-bar>
    </Variant>
    <Variant name="Con insignia de modo">
      <bch-status-bar>
        <span style="margin-right: auto">Listo</span>
        <bch-mode-badge mode="dark" label="Modo oscuro"></bch-mode-badge>
      </bch-status-bar>
    </Variant>
    <Variant name="Modo normal">
      <bch-status-bar>
        <span style="margin-right: auto">Operativo</span>
      </bch-status-bar>
    </Variant>
  </Story>
</template>
