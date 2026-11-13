<template>
  <Story title="Components/Alert">
    <Variant
      title="Playground"
      :initState="() => ({ heading: 'Información importante', tone: 'info', dismissible: false })"
    >
      <template #default="{ state }">
        <bch-alert :heading="state.heading" :tone="state.tone" :dismissible="state.dismissible">
          Se ha programado una mantenimiento para esta noche.
        </bch-alert>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.heading" title="Encabezado" />
        <HstSelect
          v-model="state.tone"
          title="Tono"
          :options="['info', 'success', 'warning', 'danger']"
        />
        <HstCheckbox v-model="state.dismissible" title="Descartable" />
      </template>
    </Variant>
    <Variant title="Informativo">
      <bch-alert heading="Información importante" tone="info">
        Se ha programado un mantenimiento para esta noche.
      </bch-alert>
    </Variant>
    <Variant title="Descartable">
      <bch-alert heading="Cambios en la configuración" tone="warning" dismissible>
        Algunos ajustes se han restablecido a sus valores predeterminados.
      </bch-alert>
    </Variant>
    <Variant title="Crítico">
      <bch-alert heading="Error crítico" tone="danger">
        No se pudo establecer conexión con el servidor.
      </bch-alert>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Alert (`bch-alert`)

Aviso persistente (no es un diálogo). Usar `dismissible` para permitir el
cierre por el usuario.

## Props

| Prop          | Tipo                                           | Default  | Descripción              |
| ------------- | ---------------------------------------------- | -------- | ------------------------ |
| `heading`     | `string`                                       | `''`     | Título de la alerta.     |
| `tone`        | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tono visual.             |
| `dismissible` | `boolean`                                      | `false`  | Muestra botón de cierre. |

## Eventos

| Evento       | Cuándo se dispara              |
| ------------ | ------------------------------ |
| `bchDismiss` | El usuario descarta la alerta. |
</docs>
