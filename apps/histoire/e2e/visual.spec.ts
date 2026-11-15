import { expect, test } from '@playwright/test';
import { histoireIndex, sandboxOf, setTheme, variantUrl } from './helpers';

const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 740 },
  { name: 'desktop', width: 1280, height: 800 },
];
const KEY_STORIES = [
  { title: 'Welcome', variant: 'Bienvenida' },
  { title: 'Tokens', variant: 'Paleta de colores' },
  { title: 'Button', variant: 'Primario' },
  { title: 'Dialog', variant: 'Por defecto / Abierto' },
  { title: 'Drawer', variant: 'Por defecto / Abierto' },
  { title: 'Menu', variant: 'Por defecto / Abierto' },
  { title: 'Toast', variant: 'Por defecto / Visible' },
  { title: 'Tooltip', variant: 'Por defecto / Visible' },
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
  const story = index.stories.find((s: any) => s.title === title);
  if (!story) throw new Error(`No se encontró la story "${title}"`);
  return story;
}

test.describe('BENCH regresión visual (histoire snapshots)', () => {
  for (const storyRef of KEY_STORIES) {
    const story = storyByTitle(storyRef.title);
    // Título de variant esperado: si no existe es un desfase story↔E2E, no un
    // fallback silencioso (antes Dialog apuntaba a una variant inexistente y
    // terminaba fotografiando el Playground cerrado).
    const variant = story.variants.find((v: any) => v.title === storyRef.variant);
    if (!variant) {
      throw new Error(
        `La story "${story.title}" no tiene la variant "${storyRef.variant}". ` +
          `Variantes reales: ${story.variants.map((v: any) => v.title).join(' | ')}`,
      );
    }
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
              { animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.002 },
            );
          },
          { tag: 'visual-regression' },
        );
      }
    }
  }
});