<template>
  <Story title="Components/Toolbar">
    <Variant title="Por defecto">
      <bch-toolbar>
        <bch-button variant="secondary">Atrás</bch-button>
        <bch-button variant="primary">Guardar</bch-button>
      </bch-toolbar>
    </Variant>
    <Variant title="Con menú de acciones">
      <bch-toolbar>
        <bch-button variant="secondary">Atrás</bch-button>
        <bch-menu label="Más acciones">
          <bch-button slot="trigger">Acciones</bch-button>
          <bch-menu-item value="export">Exportar</bch-menu-item>
          <bch-menu-item value="print" tone="danger">Imprimir</bch-menu-item>
        </bch-menu>
      </bch-toolbar>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Toolbar (`bch-toolbar`)

Barra de herramientas para agrupar acciones primarias.
</docs>
