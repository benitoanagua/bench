# Panel inspector

**Spec §4.3** · tier (c) · demo: `#demo-inspector`

El inspector muestra las propiedades del objeto seleccionado sin sacar al
usuario de su contexto. Es la alternativa _no modal_ a un modal de detalle:
el usuario sigue viendo (y editando) la lista de fondo.

## Con qué se compone

- `bch-drawer` como panel lateral: es navegación a un contexto, no una
  decisión (ADR-011).
- `bch-form-field`, `bch-input`, `bch-select` para los campos.
- `bch-tree` o `bch-data-table` como lista de origen; `bch-tree` emite
  `bchSelect` con el id del nodo, que es el gancho más directo para rellenar
  el inspector.

## Reglas

- Si el inspector pide una **decisión**, es `bch-dialog`, no un drawer.
- El panel no atrapa el foco: el usuario puede seguir trabajando en la lista
  de fondo; el drawer es explícitamente no modal.
- El contenido se actualiza al cambiar la selección, sin cerrar y reabrir el
  panel (el foco no debe saltar).
- Un panel vacío explica qué hacer ("Selecciona una fila"), nunca muestra un
  formulario en blanco.
- Los campos de solo lectura se muestran como texto, no como inputs
  deshabilitados: un input deshabilitado no se puede copiar.

## Ejemplo

```html
<bch-tree id="objects"></bch-tree>
<bch-drawer id="inspector" label="Inspector" side="end">
  <bch-form-field label="Cliente"><bch-input id="client" readonly></bch-input></bch-form-field>
  <bch-form-field label="Estado"><bch-select id="state"></bch-select></bch-form-field>
</bch-drawer>
<script type="module">
  document.querySelector('#objects').addEventListener('bchSelect', (event) => {
    fillInspector(event.detail); // la app rellena los campos
  });
</script>
```

## Lo que la app decide

Qué campos existen, cuáles son editables y qué se guarda al cerrar. La demo
del showcase actualiza el panel al seleccionar una fila de la tabla.
