<template>
  <Story title="Components/Switch">
    <Variant
      title="Playground"
      :initState="
        () => ({ label: 'Notificaciones', name: 'notifications', checked: false, disabled: false })
      "
    >
      <template #default="{ state }">
        <bch-switch
          :label="state.label"
          :name="state.name"
          :checked="state.checked"
          :disabled="state.disabled"
          @bchChange="state.checked = $event.detail"
        ></bch-switch>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Estado: {{ state.checked ? 'activado' : 'desactivado' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstText v-model="state.name" title="Name" />
        <HstCheckbox v-model="state.checked" title="Activado" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-switch label="Notificaciones" name="notifications"></bch-switch>
    </Variant>
    <Variant title="Activado">
      <bch-switch label="Notificaciones" name="notifications2" checked></bch-switch>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-switch label="Bloqueado" name="locked" disabled></bch-switch>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Switch (`bch-switch`)

Interruptor de encendido/apagado con etiqueta visible.

## Props

| Prop       | Tipo      | Default | Descripción           |
| ---------- | --------- | ------- | --------------------- |
| `checked`  | `boolean` | `false` | Estado activado.      |
| `disabled` | `boolean` | `false` | Desactiva el control. |
| `label`    | `string`  | `''`    | Etiqueta visible.     |
| `name`     | `string`  | `''`    | Nombre del campo.     |

## Eventos

| Evento      | Detail    | Cuándo se dispara            |
| ----------- | --------- | ---------------------------- |
| `bchChange` | `boolean` | El usuario cambia el estado. |

## Teclado

Focable con `Tab`; se activa/desactiva con `Espacio`.
</docs>
