# Grupos de pestañas y workspace switcher

**Spec §4.3** · tier (c) · demo: `#demo-workspace`

Un _workspace_ es el conjunto de grupos de pestañas que el usuario tiene
abiertos. Cambiar de workspace no es navegar a otra pantalla: es cambiar el
contexto de trabajo conservando lo que ya estaba abierto.

## Con qué se compone

- `bch-tabs` + `bch-tab` + `bch-tab-panel` para cada grupo de pestañas.
- `bch-menu` para el switcher (lista corta de destinos).
- `bch-badge` para el contador de pestañas modificadas.

## Reglas

- El estado de los grupos de pestañas es de la app: BENCH no guarda ni
  restaura workspaces.
- Un workspace se identifica por una clave estable (no por su nombre), porque
  el nombre se renombra.
- Al cambiar de workspace se conserva el estado de cada grupo, no se
  reconstruye: reabrir un workspace debe devolver exactamente lo que había.
- El switcher es un `bch-menu`: son destinos, no acciones sobre un objeto.
- Las pestañas que el usuario cerró se pueden reabrir desde el propio grupo
  (`bch-tabs` con `value` por defecto), no desde un menú global.

## Ejemplo

```html
<bch-menu id="workspace-switcher" label="Workspace">
  <bch-icon-button slot="trigger" name="folder" label="Cambiar de workspace"></bch-icon-button>
  <bch-menu-item value="finanzas">Finanzas</bch-menu-item>
  <bch-menu-item value="operacion">Operación</bch-menu-item>
</bch-menu>

<bch-tabs id="group-1" value="facturas">
  <bch-tab value="facturas">Facturas</bch-tab>
  <bch-tab value="clientes">Clientes</bch-tab>
  <bch-tab-panel slot="panel" value="facturas">…</bch-tab-panel>
  <bch-tab-panel slot="panel" value="clientes">…</bch-tab-panel>
</bch-tabs>
<script type="module">
  document.querySelector('#workspace-switcher').addEventListener('bchSelect', (event) => {
    activateWorkspace(event.detail); // la app restaura sus grupos
  });
</script>
```

## Lo que la app decide

Qué workspaces existen, qué grupos contiene cada uno y qué se guarda de cada
pestaña. La demo del showcase cambia entre dos workspaces y conserva el
contenido de cada grupo.
