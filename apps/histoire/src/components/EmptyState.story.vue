<template>
  <Story title="Components/EmptyState">
    <Variant name="Por defecto">
      <bch-empty-state
        heading="No hay resultados"
        description="Intenta con otros términos de búsqueda."
      ></bch-empty-state>
    </Variant>
    <Variant name="Provisional">
      <bch-empty-state
        heading="Configuración pendiente"
        description="Completa los ajustes iniciales para continuar."
        provisional
      ></bch-empty-state>
    </Variant>
  </Story>
</template>
