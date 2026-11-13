<template>
  <Story title="Components/Skeleton">
    <Variant
      title="Playground"
      :initState="() => ({ variant: 'text', width: '60%', height: undefined })"
    >
      <template #default="{ state }">
        <bch-skeleton
          :variant="state.variant"
          :width="state.width"
          :height="state.height || undefined"
        ></bch-skeleton>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.variant" title="Variant" :options="['text', 'circle', 'rect']" />
        <HstText v-model="state.width" title="Ancho" />
        <HstText v-model="state.height" title="Alto (solo rect)" />
      </template>
    </Variant>
    <Variant title="Texto">
      <bch-skeleton variant="text" width="60%"></bch-skeleton>
      <bch-skeleton variant="text" width="100%"></bch-skeleton>
    </Variant>
    <Variant title="Círculo">
      <bch-skeleton variant="circle"></bch-skeleton>
    </Variant>
    <Variant title="Rectángulo">
      <bch-skeleton variant="rect" width="200px" height="100px"></bch-skeleton>
    </Variant>
    <Variant title="Tarjeta placeholder">
      <bch-card style="width: 280px">
        <bch-skeleton variant="circle" style="margin-bottom: 12px"></bch-skeleton>
        <bch-skeleton variant="text" width="90%" style="margin-bottom: 8px"></bch-skeleton>
        <bch-skeleton variant="text" width="60%"></bch-skeleton>
      </bch-card>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Skeleton (`bch-skeleton`)

Placeholder de carga mientras llega el contenido real.

## Props

| Prop               | Tipo                           | Default  | Descripción          |
| ------------------ | ------------------------------ | -------- | -------------------- |
| `variant`          | `'text' \| 'circle' \| 'rect'` | `'text'` | Forma del esqueleto. |
| `width` / `height` | `string`                       | -        | Dimensiones CSS.     |
</docs>
