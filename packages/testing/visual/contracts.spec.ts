import { test, expect } from '@playwright/test';

test.describe('BENCH public contracts', () => {
  test('button exposes a native button', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-button--primary');
    const button = page.locator('bch-button button').first();
    await expect(button).toHaveRole('button');
  });

  test('input exposes a native input', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-forms-input--default');
    const input = page.locator('bch-input input').first();
    await expect(input).toHaveRole('textbox');
  });

  test('checkbox exposes a native checkbox', async ({ page }) => {
    await page.goto(
      'http://127.0.0.1:6006/iframe.html?id=bench-components-forms-checkbox--default',
    );
    const checkbox = page.locator('bch-checkbox input').first();
    await expect(checkbox).toHaveRole('checkbox');
  });

  test('dialog exposes role dialog', async ({ page }) => {
    await page.goto(
      'http://127.0.0.1:6006/iframe.html?id=bench-components-overlays-dialog--default',
    );
    const dialog = page.locator('bch-dialog dialog').first();
    await expect(dialog).toHaveRole('dialog');
  });

  test('tabs exposes tablist role', async ({ page }) => {
    await page.goto(
      'http://127.0.0.1:6006/iframe.html?id=bench-components-navigation-tabs--default',
    );
    const tablist = page.locator('bch-tabs [role="tablist"]').first();
    await expect(tablist).toBeVisible();
  });
});
