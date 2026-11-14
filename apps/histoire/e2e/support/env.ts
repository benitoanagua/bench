/**
 * Entorno y configuración única para tests e2e de Histoire.
 *
 * Una única fuente de verdad para BASE_PATH, puerto y bridge de tema.
 * Importado por global-setup.ts y todos los specs.
 */
export const BASE_PATH = (process.env.BASE_PATH ?? '/bench/').replace(/\/+$/, '') || '';
export const PORT = 5179;
export const BASE_URL = `http://127.0.0.1:${PORT}${BASE_PATH}`;

export function historyPath(...segments: string[]): string {
  return `${BASE_URL}/#/story/${segments.join('/')}`;
}

export function variantUrl(story: any, variant: any, density?: string): string {
  const search = new URLSearchParams();
  if (density) search.set('density', density);
  const qs = search.toString() ? `?${search.toString()}` : '';
  return `${BASE_URL}/#/story/${story.id}?variantId=${variant.id}${qs}`;
}