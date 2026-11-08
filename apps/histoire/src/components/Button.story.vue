<template>
  <Story title="Components/Button">
    <Variant name="Primario">
      <bch-button variant="primary">Continuar</bch-button>
    </Variant>
    <Variant name="Secundario">
      <bch-button variant="secondary">Cancelar</bch-button>
    </Variant>
    <Variant name="Terciario">
      <bch-button variant="tertiary">Más opciones</bch-button>
    </Variant>
    <Variant name="Peligro">
      <bch-button variant="danger">Eliminar</bch-button>
    </Variant>
    <Variant name="Con ícono de inicio">
      <bch-button variant="primary">
        <bch-icon name="plus" slot="start" aria-label="Añadir"></bch-icon>
        Crear
      </bch-button>
    </Variant>
    <Variant name="Con ícono de final">
      <bch-button variant="secondary">
        Siguiente
        <bch-icon name="chevron-right" slot="end" aria-label="Siguiente"></bch-icon>
      </bch-button>
    </Variant>
    <Variant name="Con carga">
      <bch-button variant="primary" loading>Guardando</bch-button>
    </Variant>
    <Variant name="Deshabilitado">
      <bch-button variant="primary" disabled>No disponible</bch-button>
    </Variant>
    <Variant name="Tamaños">
      <bch-button size="small">Pequeño</bch-button>
      <bch-button size="medium">Mediano</bch-button>
      <bch-button size="large">Grande</bch-button>
    </Variant>
    <Variant name="Ancho completo">
      <bch-button variant="primary" full-width>Ancho completo</bch-button>
    </Variant>
  </Story>
</template>
