<template>
  <Story title="Components/StatusBar">
    <Variant
      title="Playground"
      :initState="
        () => ({
          start: 'Página 1 de 42',
          mode: 'EDIT',
          telemetry: '1.25 ms · 132 págs/min',
          end: 'es-MX · 100%',
        })
      "
    >
      <template #default="{ state }">
        <bch-status-bar>
          <span slot="start">{{ state.start }}</span>
          <span slot="mode">{{ state.mode }}</span>
          <span slot="telemetry">{{ state.telemetry }}</span>
          <span slot="end">{{ state.end }}</span>
        </bch-status-bar>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.start" title="Inicio" />
        <HstText v-model="state.mode" title="Modo" />
        <HstText v-model="state.telemetry" title="Telemetría" />
        <HstText v-model="state.end" title="Fin" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-status-bar>
        <span slot="start">Estado del sistema</span>
        <bch-mode-badge slot="mode" mode="light" label="Modo claro"></bch-mode-badge>
      </bch-status-bar>
    </Variant>
    <Variant title="Con insignia de modo">
      <bch-status-bar>
        <span slot="start">Listo</span>
        <bch-mode-badge slot="mode" mode="dark" label="Modo oscuro"></bch-mode-badge>
      </bch-status-bar>
    </Variant>
  </Story>
</template>

<docs lang="md">
# StatusBar (`bch-status-bar`)

Barra de estado inferior persistente con cuatro ranuras semánticas:
`start`, `mode`, `telemetry` y `end`. La aplicación es dueña de todo su texto.

## Slots

| Slot        | Descripción                                |
| ----------- | ------------------------------------------ |
| `start`     | Información de inicio (página, sección).   |
| `mode`      | Insignia de modo actual.                   |
| `telemetry` | Datos de telemetría (numerales tabulares). |
| `end`       | Idioma, zoom, etc.                         |
</docs>
