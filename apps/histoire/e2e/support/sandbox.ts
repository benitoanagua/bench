/**
 * utilidades para el iframe __sandbox de Histoire.
 *
 * Selecciona el sandbox por su URL (frame.includes('__sandbox')),
 * y provee helpers para tema, densidad y verificaciones dentro del sandbox.
 */
import { Page } from '@playwright/test';
import { historiaIndex, variantUrl } from './catalog';

/** Encuentra el iframe __sandbox en la page. */
export function sandboxOf(page: Page) {
  const sandbox = page.frames().find((f) => f.url().includes('__sandbox'));
  if (!sandbox) throw new Error('No se encontró el iframe __sandbox de Histoire');
  return sandbox;
}

/** Alterna el tema en el sandbox y espera la sincronización data-bch-theme. */
export async function setTheme(sandbox: Page, dark: boolean) {
  await sandbox.evaluate((d: boolean) => {
    if (d) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, dark);
  const expected = dark ? 'dark' : 'light';
  await sandbox.waitForFunction(
    () => document.documentElement.getAttribute('data-bch-theme') === expected,
    { timeout: 8000 },
  );
}

/** Navega (recarga) la variant con la densidad dada y espera la aplicación. */
export async function gotoDensity(
  page: Page,
  url: string,
  density: 'compact' | 'comfortable' | 'spacious',
) {
  await page.goto(url, { waitUntil: 'networkidle' });
  const sandbox = sandboxOf(page);
  await sandbox.evaluate((d: string) => {
    window.__expectedDensity = d;
  }, density);
  await sandbox.waitForFunction(
    () => document.documentElement.getAttribute('data-bch-density') === density,
    { timeout: 8000 },
  );
}

/** Obtiene la variante actual activa en el sandbox. */
export function currentVariant(variantIndex = 0): any {
  // This would need page context; kept for API consistency
  return null;
}