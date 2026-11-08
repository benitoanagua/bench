<template>
  <Story title="Components/Tree">
    <Variant name="Por defecto">
      <bch-tree label="Navegación">
        <bch-tree-item value="1" label="Elemento 1">
          <bch-tree-item value="1-1" label="Sub 1.1" expanded></bch-tree-item>
          <bch-tree-item value="1-2" label="Sub 1.2"></bch-tree-item>
        </bch-tree-item>
        <bch-tree-item value="2" label="Elemento 2"></bch-tree-item>
      </bch-tree>
    </Variant>
    <Variant name="Con selección">
      <bch-tree label="Selección">
        <bch-tree-item value="a" label="Opción A"></bch-tree-item>
        <bch-tree-item value="b" label="Opción B"></bch-tree-item>
      </bch-tree>
    </Variant>
  </Story>
</template>
