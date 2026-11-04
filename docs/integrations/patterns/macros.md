# Macros (grabar y reproducir)

**Spec §4.5** · tier (c) · demo: `#demo-macros`

Una macro es una secuencia de acciones que el usuario graba una vez y
reproduce después. El spec las trata como funciones inyectadas en el índice:
aparecen en el omnibar como cualquier otra entrada.

## Con qué se compone

- `bch-dialog` para el panel de grabación (es una decisión).
- `bch-omnibar` para ejecutar la macro desde el índice.
- `bch-status` o `bch-badge` para indicar que la grabación está activa.
- `bch-button` para grabar, reproducir y descartar.

## Reglas

- **El estado del grabador es estado de dominio**: qué pasos se han grabado,
  en qué orden y con qué argumentos. Por eso la macro es tier (c) y no un
  componente de BENCH.
- La macro se inyecta en el índice como un `FunctionEntry` de tipo `macro`,
  con id estable (`m1`, `m2`, …). El manifiesto `bench.functions.json` valida
  ese contrato (`pnpm check:functions`).
- Reproducir una macro no puede salirse del contexto: si un paso falla, la
  macro se detiene y **avisa**; nunca sigue a ciegas ni reintenta en bucle.
- Grabar es reversible hasta que se confirma: el panel de grabación permite
  descartar.
- El replay nunca duplica operaciones irreversibles sin confirmación.

## Ejemplo

```ts
type MacroStep = { kind: string; payload: unknown };

// El grabador vive en la app; BENCH solo ofrece la UI.
let recording: MacroStep[] | null = null;

function startRecording() {
  recording = [];
}
function stopRecording(): MacroStep[] {
  const steps = recording ?? [];
  recording = null;
  return steps; // la app la convierte en FunctionEntry y la publica
}
```

## Lo que la app decide

Qué pasos son grabables, cómo se serializan y qué permisos necesita cada
macro. La demo del showcase graba pasos ficticios, los publica como entrada
del índice y los reproduce con un contador visible.
