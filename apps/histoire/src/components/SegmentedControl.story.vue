<template>
  <Story title="Components/SegmentedControl">
    <Variant name="Por defecto">
      <bch-segmented-control label="Vista" value="list">
        <bch-segmented-item value="list">Lista</bch-segmented-item>
        <bch-segmented-item value="grid">Cuadrícula</bch-segmented-item>
      </bch-segmented-control>
    </Variant>
    <Variant name="Con opción deshabilitada">
      <bch-segmented-control label="Filtro" value="all">
        <bch-segmented-item value="all">Todos</bch-segmented-item>
        <bch-segmented-item value="active" disabled>Activos</bch-segmented-item>
        <bch-segmented-item value="archived">Archivados</bch-segmented-item>
      </bch-segmented-control>
    </Variant>
  </Story>
</template>
