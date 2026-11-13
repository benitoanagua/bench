<template>
  <Story title="Components/Accordion">
    <Variant title="Playground" :initState="() => ({ multiple: false, openValue: 'a' })">
      <template #default="{ state }">
        <bch-accordion :multiple="state.multiple">
          <bch-accordion-item
            value="a"
            label="Primera"
            :open="state.openValue === 'a'"
            @bch-toggle="state.openValue = state.multiple ? state.openValue : 'a'"
          >
            Contenido de la primera.
          </bch-accordion-item>
          <bch-accordion-item
            value="b"
            label="Segunda"
            :open="state.openValue === 'b'"
            @bch-toggle="state.openValue = state.multiple ? state.openValue : 'b'"
          >
            Contenido de la segunda.
          </bch-accordion-item>
        </bch-accordion>
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.multiple" title="Múltiples abiertos a la vez" />
      </template>
    </Variant>
    <Variant title="Por defecto (único abierto)">
      <bch-accordion>
        <bch-accordion-item value="a" label="Primera" open>Contenido A</bch-accordion-item>
        <bch-accordion-item value="b" label="Segunda">Contenido B</bch-accordion-item>
      </bch-accordion>
    </Variant>
    <Variant title="Múltiples abiertos">
      <bch-accordion multiple>
        <bch-accordion-item value="a" label="Primera" open>Contenido A</bch-accordion-item>
        <bch-accordion-item value="b" label="Segunda" open>Contenido B</bch-accordion-item>
      </bch-accordion>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Accordion (`bch-accordion` + `bch-accordion-item`)

Área de contenido colapsable. Un solo abierto por defecto; `multiple` permite
varios abiertos a la vez.

## Props

### bch-accordion

| Prop       | Tipo      | Default | Descripción                     |
| ---------- | --------- | ------- | ------------------------------- |
| `multiple` | `boolean` | `false` | Varios ítems abiertos a la vez. |

### bch-accordion-item

| Prop    | Tipo      | Default | Descripción              |
| ------- | --------- | ------- | ------------------------ |
| `label` | `string`  | `''`    | Etiqueta del encabezado. |
| `value` | `string`  | `''`    | Identificador del ítem.  |
| `open`  | `boolean` | `false` | Ítem expandido.          |

## Eventos

| Evento      | Detail     | Cuándo se dispara                         |
| ----------- | ---------- | ----------------------------------------- |
| `bchToggle` | `boolean`  | El ítem se expande o colapsa.             |
| `bchChange` | `string[]` | El acordeón recalca su lista de abiertos. |
</docs>
