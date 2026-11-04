# Persistencia del layout entre sesiones

**Spec §4.3** · tier (c) · demo: `#demo-layout-persistence`

Recordar cómo el usuario dejó sus paneles es una commodity en una herramienta
de 8 horas al día: nadie quiere recolocar la mitad de las columnas cada
mañana. Es estado de la aplicación, no de la biblioteca.

## Con qué se compone

- `bch-splitter` para redimensionar (solo emite deltas; el layout es de la
  app).
- `bch-drawer` para el panel colapsado.
- `bch-tabs` para los grupos de pestañas del workspace.

## Reglas

- **BENCH no guarda nada.** El componente de splitter ni sabe qué panel hay a
  su izquierda; la app aplica el delta y decide el destino.
- La persistencia es de la app: `localStorage` para preferencias ligeras,
  IndexedDB (ver [persistence](./persistence.md)) cuando el layout es grande o
  compartido.
- Se persiste el **resultado** (anchos, pestañas abiertas, paneles visibles),
  nunca el estado transitorio (dragging, hover).
- La restauración es tolerante a fallos: si el layout guardado no encaja con
  los paneles disponibles, se aplica lo que sí y el resto usa el valor por
  defecto. Un layout corrupto nunca debe dejar la app inservible.
- Restaurar es una mejora, nunca una condición para arrancar.

## Ejemplo

```ts
const LAYOUT_KEY = 'bench.layout.v1';

function saveLayout(layout: { left: number; right: number; open: string[] }) {
  localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
}

function loadLayout(fallback: { left: number; right: number; open: string[] }) {
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      left: Number(parsed.left) || fallback.left,
      right: Number(parsed.right) || fallback.right,
      open: Array.isArray(parsed.open) ? parsed.open : fallback.open,
    };
  } catch {
    return fallback; // layout corrupto → defaults
  }
}
```

## Lo que la app decide

Qué se persiste, dónde y con qué política de expiración. La demo del showcase
guarda el ancho de un panel en `localStorage` y lo restaura al recargar.
