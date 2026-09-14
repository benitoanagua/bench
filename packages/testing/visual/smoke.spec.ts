import { test, expect } from '@playwright/test';

test('BENCH Storybook is reachable', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toContainText('BENCH');
});
