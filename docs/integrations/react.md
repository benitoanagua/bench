# React

`@bench/react` expone wrappers tipados para los 52 tags de `@bench/components`.
La implementación canónica sigue siendo el Web Component: los wrappers no
duplican estado, accesibilidad ni comportamiento.

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
