# Window placement en varias pantallas

**Spec §4.3** · tier (c) · demo: `#demo-window-placement`

Abrir la aplicación en un segundo monitor es una comodidad real para quien
trabaja con datos de un lado y la operación del otro. La API del navegador
paraPlacement es experimental, así que la degradación debe ser silenciosa.

## Con qué se compone

- `bch-dialog` o `bch-drawer` para el panel que se coloca en otra pantalla.
- `bch-button` para la acción de "enviar a otra pantalla".

## Reglas

- **Detección, no exigencia**: si la API no existe o el usuario la rechaza,
  la aplicación sigue funcionando igual. Nunca un error, nunca un modal que
  explique la falta de soporte.
- La ventana secundaria se abre con `window.open` (o el `Window Management`
  API cuando está disponible) y la posición se expresa en coordenadas de
  pantalla, no de viewport.
- Si la pantalla elegida desaparece (se desconecta el monitor), la app vuelve
  a la ventana principal sin perder el estado.
- La aplicación **no** decide la geometría: el usuario puede mover y
  redimensionar la ventana secundaria; la app solo recuerda dónde la dejó.

## Ejemplo

```ts
async function openOnSecondScreen(url: string) {
  const anyWindow = window as Window & {
    getScreenDetails?: () => Promise<{ screens: ScreenDetails[] }>;
  };
  // Sin soporte: se abre en la ventana actual, sin drama.
  if (!anyWindow.getScreenDetails) {
    window.open(url, '_blank');
    return;
  }
  const details = await anyWindow.getScreenDetails();
  const target = details.screens[1] ?? details.screens[0];
  window.open(
    url,
    '_blank',
    `left=${target.availLeft},top=${target.availTop},width=${target.availWidth},height=${target.availHeight}`,
  );
}
```

## Lo que la app decide

Qué vista se abre en la ventana secundaria y qué estado se sincroniza entre
ventanas. La demo del showcase muestra las pantallas detectadas y degrada en
silencio cuando la API no está disponible.
