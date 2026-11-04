# Plantillas (estado provisional)

**Spec §4.5** · tier (c) · demo: `#demo-templates`

Una plantilla es un borrador: una estructura reutilizable que el usuario
completa y confirma. Mientras no está confirmada, es **provisional**, y el
sistema lo dice de una sola manera: la línea de estado.

## Con qué se compone

- `bch-card` con la clase `is-provisional` (o el token
  `--bch-line-provisional`) para el borde provisional.
- `bch-empty-state` con la prop `provisional` para el estado vacío de una
  plantilla a medio crear.
- `bch-badge` o `bch-status` para el estado ("borrador", "confirmada").

## Reglas

- El estado provisional se expresa con el **token** de línea
  (`--bch-line-provisional`), nunca con un borde dashed escrito a mano ni con
  un color libre.
- Una plantilla sin confirmar no se mezcla con las confirmadas: viven en
  listas separadas o se marcan inequívocamente.
- Aplicar una plantilla es una acción explícita; crearla no guarda nada por
  sí solo.
- La plantilla se guarda con el mismo vocabulario que el resto (mismos campos,
  mismos permisos), no con un formato paralelo.

## Ejemplo

```html
<bch-empty-state
  heading="Plantilla de factura"
  description="Borrador: complétalo antes de emitir."
  provisional
>
  <bch-button slot="actions" variant="secondary">Descartar</bch-button>
  <bch-button slot="actions">Continuar</bch-button>
</bch-empty-state>
```

```css
.template-card {
  border-style: var(--bch-line-provisional);
}
```

## Lo que la app decide

Qué plantillas existen, quién las puede usar y qué pasa con las que nunca se
completan. La demo del showcase muestra una plantilla provisional y su
confirmación.
