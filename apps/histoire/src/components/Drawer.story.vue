<template>
  <Story title="Components/Drawer">
    <Variant name="Por defecto">
      <bch-drawer label="Panel lateral" open side="right">
        Contenido del cajón lateral.
      </bch-drawer>
    </Variant>
    <Variant name="Lado izquierdo">
      <bch-drawer label="Menú" open side="left"> Opciones de navegación. </bch-drawer>
    </Variant>
    <Variant name="Sin cerrar con Escape">
      <bch-drawer label="Forzado" open close-on-escape="false">
        Cierre obligado mediante botón.
      </bch-drawer>
    </Variant>
  </Story>
</template>
