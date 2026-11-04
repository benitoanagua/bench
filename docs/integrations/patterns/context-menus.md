# Menús contextuales

**Spec §4.2** · tier (c) · demo: `#demo-context-menu`

Un menú contextual muestra las acciones _relevantes para el elemento bajo el
cursor_, entre 8 y 10: muchas, pero no todas. Es un patrón de composición, no
un componente nuevo.

## Con qué se compone

- `bch-menu` + `bch-menu-item` (con `tone="danger"` para la acción destructiva).
- `bch-icon-button` como disparador cuando el contexto es una fila de grid.
- `bch-data-table` para la fila que da contexto.

## Reglas

- El menú contextual **no** sustituye a la navegación: son acciones sobre un
  objeto, no destinos. Para destinos está `bch-nav`.
- Entre 8 y 10 acciones. Menos de 8 suele ser un menú de toolbar; más de 10 es
  ruido y debe partirse en submenús o panel inspector.
- Las acciones destructivas van al final y con `tone="danger"`; nunca se
  mezclan con las Frequentes.
- El menú se cierra al elegir (`bchSelect`) o con Escape; el foco vuelve al
  disparador.
- La lista de acciones la calcula la app a partir del objeto y sus permisos.
  BENCH no conoce el modelo de negocio.

## Ejemplo

```html
<bch-menu id="invoice-menu" label="Acciones de la factura">
  <bch-icon-button slot="trigger" name="chevron-down" label="Acciones"></bch-icon-button>
  <bch-menu-item value="open">Abrir</bch-menu-item>
  <bch-menu-item value="duplicate">Duplicar</bch-menu-item>
  <bch-menu-item value="send">Enviar por correo</bch-menu-item>
  <bch-menu-item value="pdf">Exportar PDF</bch-menu-item>
  <bch-menu-item value="hold">Marcar en espera</bch-menu-item>
  <bch-menu-item value="credit">Emitir nota de crédito</bch-menu-item>
  <bch-menu-item value="split">Dividir el importe</bch-menu-item>
  <bch-menu-item value="assign">Reasignar</bch-menu-item>
  <bch-menu-item value="delete" tone="danger">Eliminar</bch-menu-item>
</bch-menu>
<script type="module">
  document.querySelector('#invoice-menu').addEventListener('bchSelect', (event) => {
    runAction(event.detail); // decisión de la app
  });
</script>
```

## Lo que la app decide

El conjunto de acciones, su orden y si una acción está disponible. El patrón
de §4.2 pide 8–10 relevantes, no un catálogo completo de la entidad.
