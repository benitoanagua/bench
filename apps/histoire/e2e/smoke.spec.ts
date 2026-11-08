import { expect, test } from '@playwright/test';
import { histoireIndex, storyUrl } from './helpers';

/**
 * Humo mínimo: el sitio carga y no hay peticiones fallidas.
 */
test.describe('BENCH smoke', () => {
  test('sitio carga sin peticiones fallidas', async ({ page, request }) => {
    const failed: string[] = [];
    page.on('requestfailed', (req) => failed.push(req.url()));
    page.on('response', (res) => {
      if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
    });

    const url = await storyUrl('bch-button');
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Favicon vacío o recursos ausentes generan 404; el sitio debe cargar
    // sin fallos de red críticos en los recursos del sandbox.
    const critical = failed.filter((u) => !u.includes('favicon'));
    expect(critical).toEqual([]);
  });
});
