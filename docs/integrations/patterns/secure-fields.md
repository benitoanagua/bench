# Campos sensibles: Caps Lock y selector de organización

**Spec §4.6** · tier (c) · demo: `#demo-secure-fields`

Dos detalles que parecen menores y no lo son: escribir la contraseña con Caps
Lock activo, y trabajar en la organización equivocada.

## Con qué se compone

- `bch-input` con `type="password"` y `hint` para el aviso de Caps Lock.
- `bch-alert` (o `bch-status`) para el indicador de Caps Lock.
- `bch-select` para el selector de organización/workspace.

## Reglas

- El aviso de Caps Lock aparece **mientras** la tecla está activa y desaparece
  al desactivarse: no es un mensaje de error, es una ayuda de estado.
- El aviso nunca incluye lo que se está escribiendo.
- El selector de organización/workspace es explícito y persistente: el
  usuario debe saber en qué contexto está antes de confirmar nada.
- Si el contexto tiene permisos distintos, cambiarlo **no** se hace en
  silencio: la app decide si pide confirmación.
- La contraseña nunca se guarda en el estado de la aplicación más allá del
  campo; BENCH no añade ningún tipo de credencial.

## Ejemplo

```html
<bch-input id="password" label="Contraseña" type="password"></bch-input>
<bch-alert id="caps" tone="warning" heading="Caps Lock está activo" hidden></bch-alert>

<bch-select id="org" label="Organización">
  <option value="acm">AC Constructores</option>
  <option value="globex">Globex</option>
</bch-select>
<script type="module">
  const input = document.querySelector('#password');
  const caps = document.querySelector('#caps');
  const check = (event) => {
    caps.hidden = !event.getModifierState('CapsLock');
  };
  input.addEventListener('keyup', check);
  input.addEventListener('keydown', check);
</script>
```

## Lo que la app decide

Qué organizaciones existen, cómo se cambian y qué permisos arrastra cada
contexto. La demo del showcase muestra el aviso de Caps Lock y un selector de
organización.
