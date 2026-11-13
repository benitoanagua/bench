<template>
  <Story title="Components/TimePicker">
    <Variant
      title="Playground"
      :initState="
        () => ({
          value: '',
          disabled: false,
          error: '',
          step: undefined,
          min: undefined,
          max: undefined,
        })
      "
    >
      <template #default="{ state }">
        <bch-time-picker
          label="Hora de inicio"
          name="time"
          :value="state.value"
          :disabled="state.disabled"
          :error="state.error"
          :step="state.step || undefined"
          :min="state.min || undefined"
          :max="state.max || undefined"
          placeholder="Selecciona…"
          @bch-change="state.value = $event.detail"
        ></bch-time-picker>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Valor: {{ state.value || '(vacío)' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.value" title="Valor (HH:mm)" />
        <HstText v-model="state.error" title="Error" />
        <HstNumber v-model="state.step" title="Paso (minutos)" min="1" />
        <HstText v-model="state.min" title="Mínimo (HH:mm)" />
        <HstText v-model="state.max" title="Máximo (HH:mm)" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-time-picker label="Hora" name="time" placeholder="Selecciona…"></bch-time-picker>
    </Variant>
    <Variant title="Con valor">
      <bch-time-picker label="Hora de inicio" name="start" value="09:00"></bch-time-picker>
    </Variant>
    <Variant title="Con paso">
      <bch-time-picker label="Intervalo" name="interval" step="15"></bch-time-picker>
    </Variant>
    <Variant title="Con error">
      <bch-time-picker
        label="Cita"
        name="appointment"
        error="Hora fuera de rango"
      ></bch-time-picker>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-time-picker label="Bloqueada" name="locked" disabled></bch-time-picker>
    </Variant>
  </Story>
</template>

<docs lang="md">
# TimePicker (`bch-time-picker`)

Envoltorio consistente sobre `<input type="time">` nativo (mejor accesibilidad de
base que un widget hecho a mano).

## Props

Igual que `bch-input`, más:

| Prop          | Tipo     | Default | Descripción                       |
| ------------- | -------- | ------- | --------------------------------- |
| `step`        | `number` | -       | Paso en minutos.                  |
| `min` / `max` | `string` | -       | Límite inferior/superior (HH:mm). |
</docs>
