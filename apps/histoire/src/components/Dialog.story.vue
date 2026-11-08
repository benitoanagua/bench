<template>
  <Story title="Components/Dialog">
    <Variant name="Por defecto">
      <bch-dialog label="Confirmar acción" open tone="neutral">
        ¿Estás seguro de que quieres continuar?
      </bch-dialog>
    </Variant>
    <Variant name="Crítico">
      <bch-dialog label="Eliminar elemento" open tone="critical">
        Esta acción no se puede deshacer.
      </bch-dialog>
    </Variant>
    <Variant name="Sin cerrar con Escape">
      <bch-dialog label="Diálogo forzado" open close-on-escape="false">
        Debes usar un botón para cerrar este diálogo.
      </bch-dialog>
    </Variant>
  </Story>
</template>
