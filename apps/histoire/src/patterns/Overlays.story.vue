<template>
  <Story title="Patterns/Overlays">
    <Variant
      title="Playground"
      :initState="() => ({ dialogOpen: false, drawerOpen: false, menuOpen: false })"
    >
      <template #default="{ state }">
        <div style="display: flex; gap: 24px; padding: 24px; align-items: flex-start">
          <div>
            <bch-button @click="state.dialogOpen = true">Abrir diálogo</bch-button>
            <bch-dialog
              :open="state.dialogOpen"
              label="Guardar cambios"
              @bchClose="state.dialogOpen = false"
            >
              ¿Desea guardar los cambios realizados en este documento?
              <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end">
                <bch-button variant="secondary" @click="state.dialogOpen = false"
                  >Descartar</bch-button
                >
                <bch-button variant="primary" @click="state.dialogOpen = false">Guardar</bch-button>
              </div>
            </bch-dialog>
          </div>
          <div>
            <bch-button @click="state.drawerOpen = true">Abrir cajón</bch-button>
            <bch-drawer
              :open="state.drawerOpen"
              label="Opciones de exportación"
              side="right"
              @bchClose="state.drawerOpen = false"
            >
              <div style="padding: 16px">
                <bch-button variant="primary" full-width style="margin-bottom: 8px">PDF</bch-button>
                <bch-button variant="secondary" full-width style="margin-bottom: 8px"
                  >CSV</bch-button
                >
                <bch-button variant="secondary" full-width>Excel</bch-button>
              </div>
            </bch-drawer>
          </div>
          <div>
            <bch-menu label="Acciones">
              <bch-button slot="trigger">Acciones</bch-button>
              <bch-menu-item value="export">Exportar</bch-menu-item>
              <bch-menu-item value="print">Imprimir</bch-menu-item>
              <bch-menu-item value="delete" tone="danger">Eliminar</bch-menu-item>
            </bch-menu>
          </div>
        </div>
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.dialogOpen" title="Diálogo abierto" />
        <HstCheckbox v-model="state.drawerOpen" title="Cajón abierto" />
        <HstCheckbox v-model="state.menuOpen" title="Menú abierto" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Overlays (patrón)

Diálogo, cajón y menú son capas flotantes: cada uno se abre y cierra de forma
independiente con su propio disparador, y nunca se muestran apilados en el
catálogo (cada overlay ocupa su propio variant o su propio sandbox).
</docs>
