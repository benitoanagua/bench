import { expect, test } from '@playwright/test';
import { histoireIndex, sandboxOf, setTheme, variantUrl } from './helpers';

const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 740 },
  { name: 'desktop', width: 1280, height: 800 },
];
const KEY_STORIES = [
  { title: 'Welcome', variant: '(sin título)' },
  { title: 'Tokens', variant: '(sin título)' },
  { title: 'Button', variant: 'Primario' },
  { title: 'Dialog', variant: 'Por defecto' },
  { title: 'Drawer', variant: 'Por defecto' },
  { title: 'Menu', variant: 'Por defecto' },
  { title: 'Toast', variant: 'Por defecto' },
  { title: 'Tooltip', variant: 'Arriba' },
  { title: 'Tabs', variant: 'Por defecto' },
  { title: 'DataTable', variant: 'Por defecto' },
  { title: 'Combobox', variant: 'Por defecto' },
  { title: 'DatePicker', variant: 'Por defecto' },
];

function sanitizeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function storyByTitle(title: string) {
  const index = histoireIndex();
  const story = index.stories.find((s) => s.title === title);
  if (!story) throw new Error(`No se encontró la story "${title}"`);
  return story;
}

test.describe('BENCH regresión visual (histoire snapshots)', () => {
  for (const storyRef of KEY_STORIES) {
    const story = storyByTitle(storyRef.title);
    const variant = story.variants.find((v: any) => v.title === storyRef.variant) ?? story.variants[0];
    for (const theme of ['light', 'dark'] as const) {
      for (const viewport of VIEWPORTS) {
        test(
          `${story.title} / ${variant.title} / ${theme} / ${viewport.name}`,
          async ({ page }) => {
            await page.setViewportSize(viewport);
            await page.goto(variantUrl(story, variant), { waitUntil: 'networkidle' });
            const sandbox = sandboxOf(page);
            await setTheme(sandbox, theme === 'dark');
            const sandboxBody = sandbox.locator('body');
            await expect(sandboxBody).toHaveScreenshot(
              `${sanitizeName(story.title)}-${sanitizeName(variant.title)}-${theme}-${viewport.name}.png`,
              { animations: 'disabled', caret: 'hide', clip: sandboxBody, maxDiffPixelRatio: 0.002 },
            );
          },
          { tag: 'visual-regression' },
        );
      }
    }
  }
});