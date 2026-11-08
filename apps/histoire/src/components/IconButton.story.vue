<template>
  <Story title="Components/IconButton">
    <Variant name="Por defecto">
      <bch-icon-button name="search" aria-label="Buscar"></bch-icon-button>
    </Variant>
    <Variant name="Con carga">
      <bch-icon-button name="sync" aria-label="Sincronizando" loading></bch-icon-button>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-icon-button name="edit" aria-label="Editar" disabled></bch-icon-button>
    </Variant>
    <Variant name="Tamaños">
      <bch-icon-button name="home" size="small" aria-label="Inicio"></bch-icon-button>
      <bch-icon-button name="home" size="medium" aria-label="Inicio"></bch-icon-button>
      <bch-icon-button name="home" size="large" aria-label="Inicio"></bch-icon-button>
    </Variant>
  </Story>
</template>
