<template>
  <Story title="Components/Nav">
    <Variant title="Playground" :initState="() => ({ orientation: 'vertical' })">
      <template #default="{ state }">
        <bch-nav :orientation="state.orientation">
          <bch-nav-item href="/inicio">Inicio</bch-nav-item>
          <bch-nav-item href="/explorar">Explorar</bch-nav-item>
          <bch-nav-item href="/ajustes">Ajustes</bch-nav-item>
        </bch-nav>
      </template>
      <template #controls="{ state }">
        <HstSelect
          v-model="state.orientation"
          title="Orientación"
          :options="['horizontal', 'vertical']"
        />
      </template>
    </Variant>
    <Variant title="Vertical">
      <bch-nav orientation="vertical">
        <bch-nav-item href="/inicio">Inicio</bch-nav-item>
        <bch-nav-item href="/explorar">Explorar</bch-nav-item>
        <bch-nav-item href="/ajustes" active>Ajustes</bch-nav-item>
      </bch-nav>
    </Variant>
    <Variant title="Horizontal">
      <bch-nav orientation="horizontal">
        <bch-nav-item href="/inicio">Inicio</bch-nav-item>
        <bch-nav-item href="/explorar">Explorar</bch-nav-item>
        <bch-nav-item href="/ajustes" active>Ajustes</bch-nav-item>
      </bch-nav>
    </Variant>
    <Variant title="Con elemento deshabilitado">
      <bch-nav orientation="vertical">
        <bch-nav-item href="/inicio">Inicio</bch-nav-item>
        <bch-nav-item href="/bloqueado" disabled>Bloqueado</bch-nav-item>
        <bch-nav-item href="/ajustes">Ajustes</bch-nav-item>
      </bch-nav>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Nav (`bch-nav` + `bch-nav-item`)

Barra de navegación con enlaces.

## Props

### bch-nav

| Prop          | Tipo                         | Default      | Descripción            |
| ------------- | ---------------------------- | ------------ | ---------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Dirección de la barra. |

### bch-nav-item

| Prop       | Tipo      | Default | Descripción         |
| ---------- | --------- | ------- | ------------------- |
| `active`   | `boolean` | `false` | Ítem activo.        |
| `disabled` | `boolean` | `false` | Ítem deshabilitado. |
| `href`     | `string`  | `''`    | Destino del enlace. |
</docs>
