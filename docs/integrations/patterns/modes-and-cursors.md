# Modos con feedback visual y cursores

**Spec §4.4** · tier (c) · demo: `#demo-modes`

Un modo cambia el _significado_ de la interacción en pantalla: seleccionar,
editar, ejecutar un comando. El usuario tiene que saber en qué modo está sin
leer texto, y el cursor tiene que reinforcinglo.

## Con qué se compone

- `bch-mode-badge` para el indicador de modo (visible, en la barra de estado
  o en la barra superior).
- `bch-segmented-control` para cambiar de modo explícitamente.
- Tokens y convenciones CSS para el cursor (`crosshair`, `grab`, `col-resize`).

## Reglas

- El modo activo es **siempre visible**: badge o cursor, nunca solo una
  inferencia del color de un botón.
- El cursor es el refuerzo, no el aviso: un usuario con cursor invisible (o
  en un dispositivo táctil) necesita el badge.
- Los cursores son convenciones del sistema y **no** se sustituyen por
  iconos de Carbon (regla de cursor de §2.4).
- Salir del modo es siempre explícito y visible (`Escape` o el propio control).
- Los modos no son estados de negocio: el modo "seleccionar" no decide qué se
  selecciona; solo cambia cómo se interpretan los clics.

## Ejemplo

```html
<bch-segmented-control id="mode" value="select" label="Modo">
  <bch-segmented-item value="select">Seleccionar</bch-segmented-item>
  <bch-segmented-item value="edit">Editar</bch-segmented-item>
</bch-segmented-control>
<bch-mode-badge id="mode-badge" mode="select" label="Seleccionar"></bch-mode-badge>
<script type="module">
  const badge = document.querySelector('#mode-badge');
  document.querySelector('#mode').addEventListener('bchChange', (event) => {
    badge.mode = event.detail; // el badge refleja el modo activo
    document.body.dataset.mode = event.detail; // el cursor lo lee del CSS
  });
</script>
```

```css
body[data-mode='select'] .grid-cell {
  cursor: crosshair;
}
body[data-mode='edit'] .grid-cell {
  cursor: text;
}
```

## Lo que la app decide

Qué modos existen y qué hace cada uno. La demo del showcase alterna entre
seleccionar y editar, cambiando el badge y el cursor.
