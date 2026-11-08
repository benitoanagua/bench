<template>
  <Story title="Patterns/Overlays">
    <Variant name="Dialog y Drawer juntos">
      <div style="display: flex; gap: 24px; padding: 24px">
        <bch-dialog label="Guardar cambios" open tone="neutral">
          ¿Deseas guardar los cambios realizados en este documento?
        </bch-dialog>
        <bch-drawer label="Opciones de exportación" open side="right">
          <div style="padding: 16px">
            <bch-button variant="primary" full-width style="margin-bottom: 8px">PDF</bch-button>
            <bch-button variant="secondary" full-width style="margin-bottom: 8px">CSV</bch-button>
            <bch-button variant="secondary" full-width>Excel</bch-button>
          </div>
        </bch-drawer>
      </div>
    </Variant>
  </Story>
</template>
