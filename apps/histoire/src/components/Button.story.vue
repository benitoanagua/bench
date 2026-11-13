<template>
  <Story title="Components/Button">
    <Variant
      title="Playground"
      :initState="
        () => ({
          label: 'Continuar',
          variant: 'primary',
          size: 'medium',
          disabled: false,
          loading: false,
          fullWidth: false,
        })
      "
    >
      <template #default="{ state }">
        <bch-button
          :variant="state.variant"
          :size="state.size"
          :disabled="state.disabled"
          :loading="state.loading"
          :full-width="state.fullWidth"
        >
          {{ state.label }}
        </bch-button>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.label" title="Etiqueta" />
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="['primary', 'secondary', 'tertiary', 'danger']"
        />
        <HstSelect v-model="state.size" title="Tamaño" :options="['small', 'medium', 'large']" />
        <HstCheckbox v-model="state.disabled" title="Deshabilitado" />
        <HstCheckbox v-model="state.loading" title="Carga" />
        <HstCheckbox v-model="state.fullWidth" title="Ancho completo" />
      </template>
    </Variant>
    <Variant title="Primario">
      <bch-button variant="primary">Continuar</bch-button>
    </Variant>
    <Variant title="Secundario">
      <bch-button variant="secondary">Cancelar</bch-button>
    </Variant>
    <Variant title="Peligro">
      <bch-button variant="danger">Eliminar</bch-button>
    </Variant>
    <Variant title="Con carga">
      <bch-button variant="primary" loading>Guardando</bch-button>
    </Variant>
    <Variant title="Deshabilitado">
      <bch-button variant="primary" disabled>No disponible</bch-button>
    </Variant>
    <Variant title="Tamaños">
      <div style="display: flex; gap: 12px; align-items: center">
        <bch-button size="small">Pequeño</bch-button>
        <bch-button size="medium">Mediano</bch-button>
        <bch-button size="large">Grande</bch-button>
      </div>
    </Variant>
    <Variant title="Ancho completo">
      <bch-button variant="primary" full-width>Ancho completo</bch-button>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Button (`bch-button`)

Botón de acción principal del sistema. Usar `variant="primary"` para la acción
principal de una pantalla, `secondary`/`tertiary` para acciones secundarias y
`danger` para acciones destructivas.

## Props

| Prop        | Tipo                                                 | Default     | Descripción                    |
| ----------- | ---------------------------------------------------- | ----------- | ------------------------------ |
| `variant`   | `'primary' \| 'secondary' \| 'tertiary' \| 'danger'` | `'primary'` | Tono visual.                   |
| `size`      | `'small' \| 'medium' \| 'large'`                     | `'medium'`  | Tamaño del control.            |
| `disabled`  | `boolean`                                            | `false`     | Desactiva el botón.            |
| `loading`   | `boolean`                                            | `false`     | Muestra spinner y desactiva.   |
| `fullWidth` | `boolean`                                            | `false`     | Ocupa el ancho del contenedor. |
| `type`      | `'button' \| 'submit' \| 'reset'`                    | `'button'`  | Tipo nativo del botón.         |

## Eventos

| Evento     | Detail       | Cuándo se dispara                  |
| ---------- | ------------ | ---------------------------------- |
| `bchPress` | `MouseEvent` | Al pulsar el botón (clic o tecla). |

## Teclado

El botón nativo es focable y activable con `Enter` / `Espacio`.

## Accesibilidad

Proyecta un `<button>` nativo con `role="button"`. Siempre incluye texto visible
o `aria-label` cuando solo tiene un ícono.
</docs>
