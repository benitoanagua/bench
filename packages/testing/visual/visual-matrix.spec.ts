import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile-320', width: 320, height: 800 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test(`BENCH smoke ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
    await expect(page.locator('body')).toHaveScreenshot(`bench-${viewport.name}.png`, {
      fullPage: true,
    });
  });
}
