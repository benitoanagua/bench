# Panel de historial (undo)

**Spec §4.5** · tier (c) · demo: `#demo-undo`

El historial de acciones es un panel que permite deshacer y, con frecuencia,
rehacer. El spec lo trata como patrón de aplicación: la pila de historial es
estado de dominio.

## Con qué se compone

- `bch-card` o `bch-drawer` como panel de historial.
- La lista es una `ul` con `li` (el catálogo no tiene componente de lista) y
  `bch-button` para la acción de deshacer.
- `bch-status` para indicar el tamaño de la pila.

## Reglas

- Deshacer es **una acción visible y siempre disponible** mientras la pila
  tenga elementos; no se esconde en un menú.
- Cada entrada del historial dice **qué** va a deshacerse ("Deshacer: renombrar
  cliente"), no solo "Deshacer".
- La pila es acotada (n entradas) y el descarte de las más antiguas es
  explícito en la interfaz, no silencioso.
- Deshacer una acción puede tener consecuencias (por ejemplo, deshacer un pago
  ya emitido): en ese caso la acción se confirma con `bch-dialog`.
- El historial no se persiste entre sesiones por defecto: al recargar, la
  pila empieza vacía.

## Ejemplo

```html
<bch-card>
  <span slot="header" class="card-heading">Historial</span>
  <ul class="history-list" id="history"></ul>
  <span slot="footer"><bch-button id="undo" variant="secondary">Deshacer</bch-button></span>
</bch-card>
<script type="module">
  const history = []; // pila de la app
  function push(action) {
    history.push(action);
    render();
  }
  function undo() {
    const action = history.pop();
    if (!action) return;
    action.rollback(); // cada acción sabe cómo revertirse
    render();
  }
</script>
```

## Lo que la app decide

Qué acciones entran en la pila, cuántas se guardan y cuáles necesitan
confirmación. La demo del showcase mantiene una pila corta con deshacer
habilitado solo cuando hay algo que deshacer.
