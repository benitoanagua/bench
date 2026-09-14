import { test, expect } from '@playwright/test';

test('showcase renders the system surface', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
  await expect(page.locator('bch-metric-card')).toHaveCount(4);
  await expect(page.locator('bch-alert')).toHaveCount(1);
});

test('navigation switches product surfaces', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Activity/ }).click();
  await expect(page.getByRole('heading', { name: 'Activity' })).toBeVisible();
  await expect(page.locator('bch-data-table')).toBeVisible();
});

test('create dialog opens and closes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Create$/ }).first().click();
  await expect(page.locator('bch-dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
});

test('mobile navigation is available', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.locator('bch-drawer')).toBeVisible();
});
