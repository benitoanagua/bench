/**
 * BENCH smoke: humo mínimo — el sitio carga y no hay peticiones fallidas.
 *
 * Valida que el build de Histoire sirva correctamente bajo BASE_PATH,
 * que no haya requests de red críticos y que el sandbox sea accesible.
 */
import { expect, test } from '@playwright/test';
import { storyUrl } from './support/urls';
import * as env from './support/env';

test.describe('BENCH smoke', () => {
  test('sitio carga sin peticiones fallidas', async ({ page }) => {
    const failed: string[] = [];
    page.on('requestfailed', (req) => failed.push(req.url()));
    page.on('response', (res) => {
      if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
    });

    // Cargar la historia de Button como historia de salud
    const url = await storyUrl('bch-button');
    await page.goto(url, { waitUntil: 'networkidle' });

    // Favicon vacío o recursos ausentes generan 404; el sitio debe cargar
    // sin fallos de red críticos en los recursos del sandbox.
    const critical = failed.filter((u) => !u.includes('favicon'));
    expect(critical).toEqual([]);
  });

  test('sandbox renderiza contenido en la variant por defecto', async ({ page }) => {
    await page.goto(`${env.BASE_URL}/bench/`, { waitUntil: 'networkidle' });

    // Navegar a la first variant de Button
    await page.click('text=Components');
    await page.click('text=Button');
    await page.click('text=Primario');

    const sandbox = page.frames().find((f) => f.url().includes('__sandbox'));
    expect(sandbox).toBeTruthy();

    // El sandbox debe tener contenido visible
    const body = sandbox.locator('body');
    await expect(body).toBeVisible();
  });
});