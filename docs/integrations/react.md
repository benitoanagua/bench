# React

`@bench/react` expone wrappers tipados para los 52 tags de `@bench/components`.
La implementación canónica sigue siendo el Web Component: los wrappers no
duplican estado, accesibilidad ni comportamiento.

## Instalación y registro

```sh
pnpm add @bench/react @bench/components @bench/tokens
```

```ts
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import '@bench/tokens/type-scale.css';
```

Importar `@bench/react` registra los custom elements por ti: el adaptador
llama a `defineCustomElements()` de `@bench/components/loader` como efecto de
módulo, es idempotente y no ejecuta nada sin `window` (seguro en SSR con
Next/Remix). No hace falta tocar el loader directamente.

```tsx
import { BchButton, BchSlider } from '@bench/react';

<BchButton variant="primary" onBchPress={(event) => console.log(event.detail)}>
  Guardar
</BchButton>;
```

## Eventos

Los eventos públicos se declaran como handlers `onBch*` y se enlazan con
`addEventListener` sobre el custom element (React 18 no enlaza por sí solo
props de evento desconocidas en elementos personalizados). El nombre del evento
es el del handler sin el prefijo `on` y con la primera letra en minúscula:
`onBchChange` → `bchChange`, `onBchOpenChange` → `bchOpenChange`.

```tsx
import { useState } from 'react';
import { BchSlider, BchDialog } from '@bench/react';

function Volume() {
  const [value, setValue] = useState(50);
  return (
    <BchSlider
      label="Volumen"
      value={value}
      onBchInput={(event) => setValue(event.detail)}
      onBchChange={(event) => console.log('confirmado', event.detail)}
    />
  );
}

function Confirm() {
  return (
    <BchDialog
      label="¿Descartar cambios?"
      onBchOpen={() => console.log('abierto')}
      onBchClose={() => console.log('cerrado')}
    />
  );
}
```

Los handlers pueden ser inline: el wrapper conserva el más reciente sin
volver a suscribirse, y retira el listener al desmontar.

Los props no primitivos (arrays y objetos, como `columns` en `bch-data-table`
o `items` en `bch-tree`) se asignan como **propiedad** del elemento, no como
atributo: React 18 escribe los props desconocidos de un custom element como
atributos, y un objeto stringificado (`[object Object]`) no valdría como dato
de entrada. Con React 19 el comportamiento es el mismo.
