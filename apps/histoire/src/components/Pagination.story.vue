<template>
  <Story title="Components/Pagination">
    <Variant name="Por defecto">
      <bch-pagination label="Paginación" page="1" page-count="10"></bch-pagination>
    </Variant>
    <Variant name="Página intermedia">
      <bch-pagination label="Páginas" page="5" page-count="20"></bch-pagination>
    </Variant>
    <Variant name="Hermanos ampliados">
      <bch-pagination label="Ampliada" page="7" page-count="20" sibling-count="2"></bch-pagination>
    </Variant>
  </Story>
</template>
