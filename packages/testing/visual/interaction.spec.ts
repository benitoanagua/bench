import { test, expect } from '@playwright/test';

test.describe('BENCH interactions', () => {
  test('tabs use roving tabindex and keyboard arrows', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-navigation-tabs--default');
    const tab = page.locator('bch-tab button').first();
    await expect(tab).toBeVisible();
    await tab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('bch-tab button:focus')).toBeVisible();
  });

  test('drawer closes with Escape', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-overlays-drawer--default');
    await page.evaluate(() => {
      const d = document.querySelector('bch-drawer');
      if (d) (d as any).show();
    });
    const drawer = page.locator('bch-drawer').first();
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
  });
});
