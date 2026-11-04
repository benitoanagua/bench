/**
 * Web Worker of the persistence demo (§4.6).
 *
 * The worker owns the IndexedDB connection so the writes never block the main
 * thread. This is application code on purpose: BENCH ships no storage layer,
 * no worker and no persistence of any kind — the design system only provides
 * the UI pieces (`bch-status`, `bch-alert`) that report the outcome.
 */

type SaveRequest = { type: 'save'; key: string; value: string };
type LoadRequest = { type: 'load'; key: string };
type WorkerRequest = SaveRequest | LoadRequest;

type WorkerScope = {
  postMessage: (message: unknown) => void;
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
};

const scope = self as unknown as WorkerScope;

const DB_NAME = 'bench-showcase';
const STORE = 'notes';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB could not be opened'));
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest,
): Promise<T> {
  const db = await openDatabase();
  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = db.transaction(STORE, mode);
      const request = run(transaction.objectStore(STORE));
      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
    });
  } finally {
    db.close();
  }
}

scope.onmessage = async (event) => {
  const request = event.data;
  try {
    if (request.type === 'save') {
      await withStore('readwrite', (store) => store.put(request.value, request.key));
      scope.postMessage({ type: 'saved', key: request.key });
      return;
    }
    const value = await withStore<string | undefined>('readonly', (store) =>
      store.get(request.key),
    );
    scope.postMessage({ type: 'loaded', key: request.key, value: value ?? null });
  } catch (error) {
    scope.postMessage({
      type: 'error',
      key: request.key,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
