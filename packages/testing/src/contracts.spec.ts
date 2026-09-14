import { test, expect } from '@playwright/test';

test.describe('BENCH public contracts', () => {
  test('button exposes a native button', async ({ page }) => {
    await page.setContent('<bch-button>Continue</bch-button>');
    const button = page.locator('bch-button button');
    await expect(button).toHaveRole('button', { name: 'Continue' });
  });
});
