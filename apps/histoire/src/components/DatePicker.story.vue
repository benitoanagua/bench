<template>
  <Story title="Components/DatePicker">
    <Variant
      title="Playground"
      :initState="
        () => ({ value: '', disabled: false, error: '', locale: undefined, firstDayOfWeek: 0 })
      "
    >
      <template #default="{ state }">
        <bch-date-picker
          label="Fecha de viaje"
          name="date"
          :value="state.value"
          :disabled="state.disabled"
          :error="state.error"
          :locale="state.locale || undefined"
          :first-day-of-week="state.firstDayOfWeek"
          placeholder="Selecciona…"
          @bch-change="state.value = $event.detail"
        ></bch-date-picker>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Valor: {{ state.value || '(vacío)' }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.value" title="Valor (ISO yyyy-mm-dd)" />
        <HstText v-model="state.error" title="Error" />
        <HstSelect
          v-model="state.locale"
          title="Locale"
          :options="[undefined, 'es-BO', 'en-US', 'fr-FR']"
        />
        <HstSelect
          v-model="state.firstDayOfWeek"
          title="Primer día de la semana"
          :options="[0, 1]"
        />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-date-picker label="Fecha" name="date" placeholder="Selecciona…"></bch-date-picker>
    </Variant>
    <Variant title="Con valor">
      <bch-date-picker label="Fecha de inicio" name="start" value="2026-01-15"></bch-date-picker>
    </Variant>
    <Variant title="Con rango">
      <bch-date-picker
        label="Rango"
        name="range"
        min="2026-01-01"
        max="2026-12-31"
      ></bch-date-picker>
    </Variant>
    <Variant title="Con error">
      <bch-date-picker label="Fecha límite" name="limit" error="Fecha inválida"></bch-date-picker>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-date-picker label="Bloqueada" name="locked" disabled></bch-date-picker>
    </Variant>
  </Story>
</template>

<docs lang="md">
# DatePicker (`bch-date-picker`)

Calendario de cuadrícula siguiendo el patrón WAI-ARIA date picker dialog: el
foco real se mueve entre días con las flechas. El valor siempre es ISO
`yyyy-mm-dd`, independientemente del `locale`.

## Props

| Prop                              | Tipo     | Default        | Descripción                            |
| --------------------------------- | -------- | -------------- | -------------------------------------- |
| `value`                           | `string` | `''`           | Fecha seleccionada (ISO `yyyy-mm-dd`). |
| `label`                           | `string` | `''`           | Etiqueta visible.                      |
| `name`                            | `string` | `''`           | Nombre del campo.                      |
| `placeholder`                     | `string` | `'YYYY-MM-DD'` | Placeholder del input.                 |
| `locale`                          | `string` | -              | Idioma de etiquetas del calendario.    |
| `min` / `max`                     | `string` | -              | Límite inferior/superior (ISO).        |
| `firstDayOfWeek`                  | `0 \| 1` | `0`            | 0 = domingo, 1 = lunes.                |
| `disabled` / `required` / `error` | -        | -              | Estado del campo.                      |

## Teclado

El calendario abierto se navega con flechas; `Enter` selecciona el día con
foco.
</docs>
