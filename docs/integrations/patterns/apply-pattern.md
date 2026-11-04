# Patrón Apply (snapshot / live edit / discard)

**Spec §4.5** · tier (c) · demo: `#demo-apply`

El patrón _Apply_ separa tres cosas que se confunden: la instantánea que se
propone, la edición en vivo y el descarte. Es el patrón que evita perder
trabajo sin haberlo guardado.

## Con qué se compone

- `bch-input`, `bch-select`, `bch-textarea` para la edición.
- `bch-status` o `bch-alert` para indicar el estado (aplicado, sin aplicar).
- `bch-button` para _Apply_ y _Discard_.
- `bch-dialog` para la confirmación de descarte si hay cambios pendientes.

## Reglas

- **Snapshot**: hay una base conocida contra la que comparar. La app la
  guarda; BENCH no.
- **Live edit** significa que se ve el resultado antes de aplicarlo, pero el
  resultado solo existe si el usuario confirma. "Live" no es "aplicado".
- **Discard** es siempre visible cuando hay cambios pendientes, y siempre
  pregunta si el trabajo no se puede recuperar.
- El estado "sin aplicar" se marca con los tokens de línea provisional
  (`--bch-line-provisional`), nunca con un color libre.
- Tras aplicar, la instantánea se actualiza: el diff ya no se muestra.

## Ejemplo

```html
<bch-form-field label="Nombre del cliente">
  <bch-input id="client-name" value="AC Constructores"></bch-input>
</bch-form-field>
<bch-status id="apply-state" tone="warning">Cambios sin aplicar</bch-status>
<bch-button id="apply" variant="primary">Aplicar</bch-button>
<bch-button id="discard" variant="secondary">Descartar</bch-button>
<script type="module">
  const snapshot = { clientName: 'AC Constructores' }; // la app lo guarda
  const input = document.querySelector('#client-name');

  function refreshState() {
    const dirty = input.value !== snapshot.clientName;
    document.querySelector('#apply-state').textContent = dirty ? 'Cambios sin aplicar' : 'Aplicado';
  }

  input.addEventListener('bchInput', refreshState);
  document.querySelector('#apply').addEventListener('bchPress', () => {
    snapshot.clientName = input.value; // nueva instantánea
    refreshState();
  });
  document.querySelector('#discard').addEventListener('bchPress', () => {
    input.value = snapshot.clientName; // vuelve a la instantánea
    refreshState();
  });
</script>
```

## Lo que la app decide

Qué se puede aplicar, si el descarte necesita confirmación y si hay
autoguardado. La demo del showcase replica el patrón con un campo y tres
acciones.
