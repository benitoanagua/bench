/**
 * Entorno y configuración única para tests e2e de Histoire.
 *
 * Fuente única de verdad para BASE_PATH, puerto y BASE_URL.
 * Importado por playwright.config.ts, helpers.ts y los specs.
 * La construcción de URLs de story/variant vive en helpers.ts.
 */
export const BASE_PATH = (process.env.BASE_PATH ?? '/bench/').replace(/\/+$/, '') || '';
export const PORT = 5179;
// Con slash final: los assets del build son relativos y el HTML servido en
// `/bench` (sin slash) resolvería `assets/*` contra la raíz del servidor.
export const BASE_URL = `http://127.0.0.1:${PORT}${BASE_PATH}/`;
