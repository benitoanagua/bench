<template>
  <Story title="Components/Nav">
    <Variant name="Vertical">
      <bch-nav orientation="vertical">
        <bch-nav-item href="/inicio">Inicio</bch-nav-item>
        <bch-nav-item href="/explorar">Explorar</bch-nav-item>
        <bch-nav-item href="/ajustes" active>Ajustes</bch-nav-item>
      </bch-nav>
    </Variant>
    <Variant name="Horizontal">
      <bch-nav orientation="horizontal">
        <bch-nav-item href="/inicio">Inicio</bch-nav-item>
        <bch-nav-item href="/explorar">Explorar</bch-nav-item>
        <bch-nav-item href="/ajustes" active>Ajustes</bch-nav-item>
      </bch-nav>
    </Variant>
    <Variant name="Con elemento deshabilitado">
      <bch-nav orientation="vertical">
        <bch-nav-item href="/inicio">Inicio</bch-nav-item>
        <bch-nav-item href="/bloqueado" disabled>Bloqueado</bch-nav-item>
        <bch-nav-item href="/ajustes">Ajustes</bch-nav-item>
      </bch-nav>
    </Variant>
  </Story>
</template>
