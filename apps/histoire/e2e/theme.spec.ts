import { expect, test } from '@playwright/test';
import { histoireIndex, storyUrl } from './helpers';

/**
 * Tema: cambiar data-bch-theme modifica --bch-color-surface (aserción
 * rescatada del script de smoke de la herramienta previa de catálogo).
 */
test.describe('BENCH theming', () => {
  test('cambiar el tema modifica --bch-color-surface dentro del sandbox', async ({
    page,
    request,
  }) => {
    const url = await storyUrl('bch-button');
    await page.goto(url, { waitUntil: 'networkidle' });
    const sandbox = page.frames().find((f) => f.url().includes('__sandbox'));
    expect(sandbox).toBeTruthy();

    await sandbox!.waitForSelector('bch-button', { state: 'attached', timeout: 15000 });

    const surfaceBefore = await sandbox!.evaluate(() => {
      const el = document.querySelector('bch-button')!;
      return getComputedStyle(el).getPropertyValue('--bch-color-surface');
    });
    expect(surfaceBefore.trim()).toBe('#ffffff');

    // Historia alterna la clase `dark` en <html> del sandbox; el setup de
    // Bench la sincroniza con data-bch-theme.
    await sandbox!.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    const surfaceAfter = await sandbox!.evaluate(() => {
      const el = document.querySelector('bch-button')!;
      return getComputedStyle(el).getPropertyValue('--bch-color-surface');
    });
    // El tema dark de Bench pone --bch-color-surface en #171c21.
    expect(surfaceAfter.trim()).not.toBe(surfaceBefore.trim());
    expect(surfaceAfter.trim()).toBe('#171c21');

    await sandbox!.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);
    const surfaceRestored = await sandbox!.evaluate(() => {
      const el = document.querySelector('bch-button')!;
      return getComputedStyle(el).getPropertyValue('--bch-color-surface');
    });
    expect(surfaceRestored.trim()).toBe('#ffffff');
  });
});
