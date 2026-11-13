<template>
  <Story title="Components/ModeBadge">
    <Variant title="Playground" :initState="() => ({ mode: 'normal', label: '' })">
      <template #default="{ state }">
        <bch-mode-badge :mode="state.mode" :label="state.label || undefined"></bch-mode-badge>
      </template>
      <template #controls="{ state }">
        <HstSelect
          v-model="state.mode"
          title="Modo"
          :options="['normal', 'select', 'edit', 'custom']"
        />
        <HstText v-model="state.label" title="Etiqueta (solo con modo 'custom')" />
      </template>
    </Variant>
    <Variant title="Seleccionar modo">
      <bch-mode-badge mode="select" label="Seleccionar"></bch-mode-badge>
    </Variant>
    <Variant title="Editar modo">
      <bch-mode-badge mode="edit" label="Editar"></bch-mode-badge>
    </Variant>
    <Variant title="Etiqueta personalizada">
      <bch-mode-badge mode="custom" label="RECT"></bch-mode-badge>
    </Variant>
    <Variant title="Modo normal">
      <bch-mode-badge mode="normal" label="Normal"></bch-mode-badge>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ModeBadge (`bch-mode-badge`)

Indicador persistente de modo de trabajo (§4.4). Renderiza nada cuando el modo
es `normal`; avisa a lectores de pantalla mediante `aria-live="polite"`.

## Props

| Prop    | Tipo                                         | Default    | Descripción                            |
| ------- | -------------------------------------------- | ---------- | -------------------------------------- |
| `mode`  | `'normal' \| 'select' \| 'edit' \| 'custom'` | `'normal'` | Modo actual.                           |
| `label` | `string`                                     | `''`       | Etiqueta (modo `custom`: obligatoria). |
</docs>
