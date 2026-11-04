import { test, expect } from '@playwright/test';

test('showcase renders the system surface', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
  await expect(page.locator('bch-metric-card')).toHaveCount(4);
  // Only the visible view counts: the other surfaces stay in the DOM, hidden.
  await expect(page.locator('.view:not([hidden]) bch-alert')).toHaveCount(1);
});

test('navigation switches product surfaces', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Activity' }).click();
  await expect(page.locator('#page-title')).toHaveText('Activity');
  await expect(page.locator('bch-data-table')).toBeVisible();
  await expect(page.locator('[data-panel="overview"]')).toBeHidden();
});

test('create dialog opens and closes', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: /Create$/ })
    .first()
    .click();
  // The host is `display: contents`; the native <dialog> is the visible box.
  await expect(page.locator('#create-dialog dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.locator('#create-dialog dialog')).toBeHidden();
});

test('mobile navigation is available', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.locator('#mobile-drawer .drawer')).toBeVisible();
});

test('the collapsed sidebar keeps an accessible name on every nav item', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 800 });
  await page.goto('/');
  // Below 1024px the labels are hidden and only the icons remain: the name
  // has to survive through aria-label.
  await expect(page.getByRole('button', { name: 'Patterns' })).toBeVisible();
  await page.getByRole('button', { name: 'Patterns' }).click();
  await expect(page.locator('#page-title')).toHaveText('Patterns');
});
