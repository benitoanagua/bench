<template>
  <Story title="Components/Tabs">
    <Variant title="Playground" :initState="() => ({ value: 'tab1' })">
      <template #default="{ state }">
        <bch-tabs :value="state.value" @bch-change="state.value = $event.detail">
          <bch-tab value="tab1">Primera</bch-tab>
          <bch-tab value="tab2">Segunda</bch-tab>
          <bch-tab value="tab3">Tercera</bch-tab>
          <bch-tab-panel value="tab1">Panel de la primera pestaña</bch-tab-panel>
          <bch-tab-panel value="tab2">Panel de la segunda pestaña</bch-tab-panel>
          <bch-tab-panel value="tab3">Panel de la tercera pestaña</bch-tab-panel>
        </bch-tabs>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Activa: {{ state.value }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstSelect
          v-model="state.value"
          title="Pestaña activa"
          :options="['tab1', 'tab2', 'tab3']"
        />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-tabs value="tab1">
        <bch-tab value="tab1">Primera</bch-tab>
        <bch-tab value="tab2">Segunda</bch-tab>
        <bch-tab value="tab3">Tercera</bch-tab>
        <bch-tab-panel value="tab1">Panel de la primera pestaña</bch-tab-panel>
        <bch-tab-panel value="tab2">Panel de la segunda pestaña</bch-tab-panel>
        <bch-tab-panel value="tab3">Panel de la tercera pestaña</bch-tab-panel>
      </bch-tabs>
    </Variant>
    <Variant title="Con pestaña deshabilitada">
      <bch-tabs value="tab1">
        <bch-tab value="tab1">Activa</bch-tab>
        <bch-tab value="tab2" disabled>Deshabilitada</bch-tab>
        <bch-tab-panel value="tab1">Contenido activo</bch-tab-panel>
        <bch-tab-panel value="tab2">Contenido oculto</bch-tab-panel>
      </bch-tabs>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Tabs (`bch-tabs` + `bch-tab` + `bch-tab-panel`)

Pestañas siguiendo el patrón WAI-ARIA tablist.

## Props

### bch-tabs

| Prop    | Tipo     | Default | Descripción     |
| ------- | -------- | ------- | --------------- |
| `value` | `string` | `''`    | Pestaña activa. |

### bch-tab

| Prop       | Tipo      | Default | Descripción                  |
| ---------- | --------- | ------- | ---------------------------- |
| `value`    | `string`  | -       | Identificador de la pestaña. |
| `disabled` | `boolean` | `false` | Pestaña deshabilitada.       |

### bch-tab-panel

| Prop    | Tipo     | Default | Descripción                          |
| ------- | -------- | ------- | ------------------------------------ |
| `value` | `string` | -       | Pestaña a la que pertenece el panel. |

## Eventos

| Evento      | Detail   | Cuándo se dispara             |
| ----------- | -------- | ----------------------------- |
| `bchChange` | `string` | El usuario cambia de pestaña. |

## Teclado

`←`/`→` mueven el foco entre pestañas; `Espacio`/`Enter` activan la focada.
</docs>
