import { test, expect } from '@playwright/test';
import { staticStoryCatalog, uniqueStories } from './story-catalog';

const STORY_BASE = 'http://127.0.0.1:6006/iframe.html?id=';

const viewports = [
  { name: 'mobile-320', width: 320, height: 800 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

const themes = ['light', 'dark'] as const;

/**
 * Matriz story × viewport × tema. Se usa la story canónica de cada tag
 * (story-catalog.ts) deduplicada por id: 52 tags comparten algunas stories
 * (subcomponentes y showcase), así que la matriz no repite la misma captura.
 */
const stories = uniqueStories(staticStoryCatalog());

for (const story of stories) {
  for (const viewport of viewports) {
    for (const theme of themes) {
      test(`${story.tag} ${viewport.name} ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(`${STORY_BASE}${story.storyId}`);
        await page.waitForSelector(`${story.tag}.hydrated`, { state: 'attached' });
        await page.evaluate((nextTheme) => {
          document.documentElement.setAttribute('data-bch-theme', nextTheme);
        }, theme);
        await page.evaluate(() => document.fonts.ready);

        await expect(page.locator('body')).toHaveScreenshot(
          `${story.storyId}-${viewport.name}-${theme}.png`,
          {
            fullPage: true,
            animations: 'disabled',
            caret: 'hide',
          },
        );
      });
    }
  }
}
