<template>
  <Story title="Components/Radio">
    <Variant
      title="Playground"
      :initState="() => ({ value: 'a', disabled: false, required: false })"
    >
      <template #default="{ state }">
        <div style="display: flex; flex-direction: column; gap: 8px">
          <bch-radio
            value="a"
            name="rg"
            :checked="state.value === 'a'"
            :disabled="state.disabled"
            :required="state.required"
            @bch-change="state.value = 'a'"
            >Opción A</bch-radio
          >
          <bch-radio
            value="b"
            name="rg"
            :checked="state.value === 'b'"
            :disabled="state.disabled"
            :required="state.required"
            @bch-change="state.value = 'b'"
            >Opción B</bch-radio
          >
          <bch-radio
            value="c"
            name="rg"
            :checked="state.value === 'c'"
            :disabled="state.disabled"
            :required="state.required"
            @bch-change="state.value = 'c'"
            >Opción C</bch-radio
          >
        </div>
        <p style="margin-top: 8px; font-size: 0.875rem; color: var(--bch-color-text-muted)">
          Seleccionado: {{ state.value }}
        </p>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.value" title="Valor" :options="['a', 'b', 'c']" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitados" />
        <HstCheckbox v-model="state.required" title="Requeridos" />
      </template>
    </Variant>
    <Variant title="Grupo">
      <bch-radio label="Opción A" name="option" value="a"></bch-radio>
      <bch-radio label="Opción B" name="option" value="b"></bch-radio>
      <bch-radio label="Opción C" name="option" value="c"></bch-radio>
    </Variant>
    <Variant title="Seleccionado">
      <bch-radio label="Opción A" name="option2" value="a"></bch-radio>
      <bch-radio label="Opción B" name="option2" value="b" checked></bch-radio>
      <bch-radio label="Opción C" name="option2" value="c"></bch-radio>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-radio label="Opción bloqueada" name="locked" value="x" disabled></bch-radio>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Radio (`bch-radio`)

Opción mutuamente exclusiva dentro de un grupo (`name`).

## Props

| Prop                    | Tipo      | Default | Descripción          |
| ----------------------- | --------- | ------- | -------------------- |
| `checked`               | `boolean` | `false` | Opción seleccionada. |
| `disabled` / `required` | `boolean` | `false` | Estados del control. |
| `label`                 | `string`  | `''`    | Etiqueta visible.    |
| `name`                  | `string`  | `''`    | Nombre del grupo.    |
| `value`                 | `string`  | `''`    | Valor de la opción.  |

## Eventos

| Evento      | Detail   | Cuándo se dispara                  |
| ----------- | -------- | ---------------------------------- |
| `bchChange` | `string` | El usuario selecciona otra opción. |

## Teclado

Focable con `Tab`; las flechas mueven la selección dentro del grupo.
</docs>
