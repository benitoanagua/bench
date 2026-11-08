<template>
  <Story title="Components/Menu">
    <Variant name="Por defecto">
      <bch-menu label="Acciones" placement="bottom-start">
        <bch-menu-item value="edit">Editar</bch-menu-item>
        <bch-menu-item value="duplicate">Duplicar</bch-menu-item>
        <bch-menu-item value="delete" tone="critical">Eliminar</bch-menu-item>
      </bch-menu>
    </Variant>
    <Variant name="Con elemento deshabilitado">
      <bch-menu label="Opciones" placement="bottom">
        <bch-menu-item value="view">Ver</bch-menu-item>
        <bch-menu-item value="edit" disabled>Editar</bch-menu-item>
        <bch-menu-item value="delete">Eliminar</bch-menu-item>
      </bch-menu>
    </Variant>
  </Story>
</template>
