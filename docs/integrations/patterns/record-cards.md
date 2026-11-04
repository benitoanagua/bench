# Record cards (HyperCard)

**Spec §4.3** · tier (c) · demo: `#demo-record-cards`

Una _record card_ es una ficha: una imagen, un título y un contenedor de
campos. Es la unidad visual de las fichas HyperCard, y en una herramienta
densa sustituye a las tablas cuando cada registro tiene una identidad propia.

## Con qué se compone

- `bch-card` con slots `header`, `footer` y contenido.
- `bch-avatar` o `bch-icon` como "sticker" de la ficha.
- `bch-drawer` para el detalle, `bch-dialog` si abrirla pide una decisión.

## Reglas

- La ficha es **una unidad de una persona/una cosa**, no una fila de tabla.
  Si el usuario necesita comparar columnas, es una tabla (`bch-data-table`).
- El contenedor es siempre el mismo tamaño: una retícula de fichas mixtas se
  lee como ruido.
- El estado de la ficha (activa, editada, provisional) se marca con tokens
  (`--bch-line-provisional` para lo provisional), nunca con colores sueltos.
- Abrir el detalle no es una navegación: si la ficha se abre replacing el
  contexto, es un drawer; si pide confirmación, un dialog.

## Ejemplo

```html
<div class="record-cards">
  <bch-card class="record-card">
    <span slot="header" class="card-heading">Factura #4381</span>
    <bch-avatar slot="header" name="AC" shape="circle"></bch-avatar>
    <p>AC Constructores — 1.240,00 €</p>
    <span slot="footer"><bch-status tone="warning">En revisión</bch-status></span>
  </bch-card>
</div>
```

## Lo que la app decide

Qué campos tiene cada ficha, su orden y su estado. La demo del showcase
muestra una retícula de fichas y abre el detalle en un drawer.
