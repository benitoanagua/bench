<template>
  <Story title="Components/Avatar">
    <Variant
      title="Playground"
      :initState="
        () => ({
          name: 'María García',
          size: 'medium',
          shape: 'circle',
          status: undefined,
          src: '',
        })
      "
    >
      <template #default="{ state }">
        <bch-avatar
          :name="state.name"
          :size="state.size"
          :shape="state.shape"
          :status="state.status === 'ninguno' ? undefined : state.status"
        ></bch-avatar>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.name" title="Nombre" />
        <HstSelect v-model="state.size" title="Tamaño" :options="['small', 'medium', 'large']" />
        <HstSelect v-model="state.shape" title="Forma" :options="['circle', 'square']" />
        <HstSelect
          v-model="state.status"
          title="Estado de presencia"
          :options="['ninguno', 'online', 'offline', 'busy', 'away']"
        />
        <HstText v-model="state.src" title="URL de imagen" />
      </template>
    </Variant>
    <Variant title="Con iniciales">
      <bch-avatar name="María García" size="medium"></bch-avatar>
    </Variant>
    <Variant title="Con imagen">
      <bch-avatar
        name="Usuario"
        src="data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'&gt;&lt;rect width='64' height='64' fill='%23e7eaee'/&gt;&lt;/svg&gt;"
        shape="circle"
      ></bch-avatar>
    </Variant>
    <Variant title="Tamaños">
      <div style="display: flex; gap: 16px; align-items: center">
        <bch-avatar name="XS" size="small"></bch-avatar>
        <bch-avatar name="S" size="medium"></bch-avatar>
        <bch-avatar name="L" size="large"></bch-avatar>
      </div>
    </Variant>
    <Variant title="Formas y estado de presencia">
      <div style="display: flex; gap: 16px; align-items: center">
        <bch-avatar name="Activo" size="medium" status="online"></bch-avatar>
        <bch-avatar name="Ocupado" size="medium" status="busy"></bch-avatar>
        <bch-avatar name="Ausente" size="medium" status="away"></bch-avatar>
        <bch-avatar name="Cuadrado" size="medium" shape="square"></bch-avatar>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Avatar (`bch-avatar`)

Representa a una persona o entidad con iniciales, imagen o estado de presencia.

## Props

| Prop     | Tipo                                        | Default    | Descripción                                           |
| -------- | ------------------------------------------- | ---------- | ----------------------------------------------------- |
| `name`   | `string`                                    | `''`       | Texto de las iniciales o etiqueta accesible.          |
| `shape`  | `'circle' \| 'square'`                      | `'circle'` | Forma del avatar.                                     |
| `size`   | `'small' \| 'medium' \| 'large'`            | `'medium'` | Tamaño.                                               |
| `src`    | `string`                                    | -          | URL de imagen (si se omite, se renderizan iniciales). |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | -          | Punto de presencia.                                   |
</docs>
