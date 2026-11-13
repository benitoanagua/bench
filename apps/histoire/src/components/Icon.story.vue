<template>
  <Story title="Components/Icon">
    <Variant title="Playground" :initState="() => ({ name: 'search', ariaLabel: 'Buscar' })">
      <template #default="{ state }">
        <bch-icon :name="state.name" :aria-label="state.ariaLabel"></bch-icon>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.name" title="Nombre del ícono" />
        <HstText v-model="state.ariaLabel" title="Etiqueta accesible (aria-label)" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-icon name="search" aria-label="Buscar"></bch-icon>
    </Variant>
    <Variant title="Con etiqueta accesible">
      <bch-icon name="user" aria-label="Perfil de usuario"></bch-icon>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Icon (`bch-icon`)

Ícono del sistema (estilo Carbon, cuadrícula 32×32). El relleno por defecto es
`currentColor`, por lo que hereda el color del texto circundante.

## Props

| Prop        | Tipo     | Required | Descripción                                                             |
| ----------- | -------- | -------- | ----------------------------------------------------------------------- |
| `name`      | `string` | sí       | Nombre del ícono (ver catálogo de íconos).                              |
| `ariaLabel` | `string` | no       | Etiqueta accesible; obligatoria cuando el ícono no tiene texto visible. |

## Accesibilidad

Los íconos decorativos no necesitan etiqueta; los significativos sí
(`aria-label` o `aria-labelledby`).
</docs>
