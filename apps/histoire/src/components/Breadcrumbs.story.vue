<template>
  <Story title="Components/Breadcrumbs">
    <Variant name="Por defecto">
      <bch-breadcrumbs label="Ruta de navegación">
        <bch-breadcrumb-item href="/inicio">Inicio</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/categoria">Categoría</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/producto" current>Producto</bch-breadcrumb-item>
      </bch-breadcrumbs>
    </Variant>
    <Variant name="Colapsado">
      <bch-breadcrumbs label="Ruta" max-items="2">
        <bch-breadcrumb-item href="/inicio">Inicio</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/categoria">Categoría</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/subcategoria">Subcategoría</bch-breadcrumb-item>
        <bch-breadcrumb-item href="/producto" current>Producto</bch-breadcrumb-item>
      </bch-breadcrumbs>
    </Variant>
  </Story>
</template>
