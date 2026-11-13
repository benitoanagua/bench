<template>
  <Story title="Components/Tree">
    <Variant title="Playground" :initState="() => ({ label: 'Navegación' })">
      <template #default="{ state }">
        <bch-tree :label="state.label">
          <bch-tree-item value="billing" label="Facturación">
            <bch-tree-item slot="children" value="nf" label="Nueva factura"></bch-tree-item>
            <bch-tree-item slot="children" value="list" label="Listado de facturas"></bch-tree-item>
          </bch-tree-item>
          <bch-tree-item value="catalog" label="Catálogo"></bch-tree-item>
        </bch-tree>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta (aria-label)" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-tree label="Navegación">
        <bch-tree-item value="1" label="Elemento 1">
          <bch-tree-item slot="children" value="1-1" label="Sub 1.1" expanded></bch-tree-item>
          <bch-tree-item slot="children" value="1-2" label="Sub 1.2"></bch-tree-item>
        </bch-tree-item>
        <bch-tree-item value="2" label="Elemento 2"></bch-tree-item>
      </bch-tree>
    </Variant>
    <Variant title="Con selección">
      <bch-tree label="Selección">
        <bch-tree-item value="a" label="Opción A"></bch-tree-item>
        <bch-tree-item value="b" label="Opción B"></bch-tree-item>
      </bch-tree>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Tree (`bch-tree` + `bch-tree-item`)

Árbol de navegación con patrón treeview: navegación por teclado sobre nodos
visibles y expansión controlada por atributo `expanded`.

## Props

### bch-tree

| Prop    | Tipo            | Descripción                                                  |
| ------- | --------------- | ------------------------------------------------------------ |
| `items` | `BchTreeNode[]` | Datos del árbol (ganan los ítems slotados si ambos se usan). |

### bch-tree-item

| Prop       | Tipo      | Default | Descripción                           |
| ---------- | --------- | ------- | ------------------------------------- |
| `label`    | `string`  | `''`    | Texto del nodo.                       |
| `value`    | `string`  | `''`    | Valor del nodo.                       |
| `expanded` | `boolean` | `false` | Nodo expandido (atributo reflectido). |

## Teclado

Flechas navegan nodos; `→` expande / entra al primer hijo; `←` colapsa o sube al
padre.
</docs>
