import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 320, height: 800 },
  { name: 'mobile-large', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test(`core visual ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/iframe.html?id=bench-visual-statematrix--controls');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`core-${viewport.name}.png`, { fullPage: true });
  });
}
