# Paleta de comandos y leader keys

**Spec §4.1** · tier (c) · demo: `#demo-command-palette`

La paleta es el camino garantizado a cualquier función del sistema. El
omnibar (`bch-omnibar`) es la _vista_; orquestrar teclado global, estado
"armado" y la apertura de la paleta es trabajo de la aplicación.

## Con qué se compone

- `bch-omnibar` para el índice de funciones y los resultados.
- `bch-dialog` para la paleta: es una decisión modal (la app decide qué
  abrir), así que le corresponde la semántica modal (ADR-011).
- `bch-mode-badge` para el estado "leader armado".
- El índice es el manifiesto `bench.functions.json` de la app, validado por
  `pnpm check:functions` y ordenable con los helpers de tier (b) de
  `@bench/foundation` (`rankFunctions`, `buildAliasTable`).

## Reglas

- El teclado global vive en la aplicación, **no** dentro de `bch-omnibar`: el
  omnibar solo atiende teclas cuando ya tiene el foco.
- Una secuencia leader tiene estados: _idle_ → _armed_ → _idle_. Si pasan N
  segundos sin la segunda tecla, se desarma sola y se avisa.
- Los atajos con modificador (`Ctrl+K`) no dependen del estado armed: siempre
  abren la paleta.
- El atajo nunca deja la aplicación: si la paleta no puede resolver la
  consulta, se ofrece la búsqueda libre, no un error.

## Ejemplo

```html
<bch-dialog id="palette" label="Buscar función">
  <bch-omnibar id="palette-omnibar" entries="[]"></bch-omnibar>
</bch-dialog>
<script type="module">
  const palette = document.querySelector('#palette');
  let armed = false;

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      palette.show();
      return;
    }
    if (armed) {
      armed = false;
      if (event.key === 'f') navigateTo('facturacion');
      return;
    }
    if (event.key === 'g') {
      armed = true;
      document.dispatchEvent(new CustomEvent('leader-armed', { detail: true }));
    }
  });
</script>
```

El demo del showcase abre la paleta con `Ctrl+K` y arma la secuencia `g` →
`f`; el badge `bch-mode-badge` refleja el estado armado.

## Lo que la app decide

Qué rutas se abren, qué permisos filtran el índice (`permisos` del manifiesto)
y qué macros se reproducen. BENCH solo pone la forma.
