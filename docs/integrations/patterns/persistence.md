# Persistencia con IndexedDB y Web Worker

**Spec §4.6** · tier (c) · demo: `#demo-persistence`

Guardar el trabajo del usuario es dominio de la aplicación. El spec propone
IndexedDB para el almacenamiento y un Web Worker para no bloquear la interfaz
con operaciones de escritura.

## Con qué se compone

- `bch-alert` o `bch-status` para indicar el estado de la persistencia
  ("guardando", "guardado", "error al guardar").
- `bch-button` para las acciones de guardar/recuperar.
- `bch-empty-state` cuando no hay nada guardado todavía.

## Reglas

- **BENCH no tiene capa de almacenamiento.** Ni IndexedDB, ni Web Worker, ni
  `localStorage`: eso es de la aplicación.
- La escritura va al Worker para no bloquear el hilo principal; la interfaz
  comunica el estado con un `bch-status` o un `bch-alert`.
- Guardar es automático y **visible**: el usuario sabe si su trabajo está
  guardado. Fallar al guardar es un aviso, nunca un silencio.
- La clave de almacenamiento es de la app y debe versionarse: un cambio de
  esquema no puede dejar datos ilegibles.
- Nada de credenciales ni datos sensibles en el almacenamiento del navegador sin
  el cifrado que la app controle; BENCH no aporta nada aquí.

## Ejemplo

```ts
// worker.ts — pseudocódigo: el worker de la app habla con IndexedDB.
// `openDatabase`/`put` son las llamadas de la app, no de BENCH.
const db = await openDatabase('bench', 1);
self.onmessage = async (event: MessageEvent<{ key: string; value: unknown }>) => {
  const { key, value } = event.data;
  await db.put('records', { key, value, savedAt: Date.now() });
  self.postMessage({ type: 'saved', key });
};
```

```ts
// app.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
worker.postMessage({ key: 'draft', value: draft });
worker.onmessage = (event) => {
  if (event.data.type === 'saved') setStatus('Guardado');
};
```

## Lo que la app decide

El esquema, el cifrado, la sincronización y la política de borrado. La demo
del showcase escribe una nota en IndexedDB desde un Web Worker y la recupera;
si el navegador no soporta la API, lo dice sin romper la vista.
