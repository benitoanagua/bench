/**
 * BENCH catálogo — regresión visual con toHaveSnapshot().
 *
 * Una captura por story clave × tema (claro/oscuro) × viewport clave
 * (móvil, escritorio). Animaciones desactivadas y umbral de diff bajo.
 *
 * Los baselines viven en e2e/baselines/ y se generan con:
 *   pnpm story:e2e:update   (Playwright: --update-snapshots)
 * Sólo en Linux (misma fuente de render que CI); nunca desde Windows/macOS.
 */
import { expect, test } from '@playwright/test';
import { histoireIndex, sandboxOf, setTheme, variantUrl } from './helpers';

const index = histoireIndex();

function storyByTitle(title: string) {
  const story = index.stories.find((s) => s.title === title);
  if (!story) throw new Error(`No se encontró la story "${title}"`);
  return story;
}

const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 740 },
  { name: 'desktop', width: 1280, height: 800 },
];

// Stories clave: una representación de cada área del catálogo.
const KEY_STORIES = [
  { title: 'Welcome', variant: '(sin título)' },
  { title: 'Foundations/Tokens', variant: '(sin título)' },
  { title: 'Components/Button', variant: 'Primario' },
  { title: 'Components/Dialog', variant: 'Por defecto' },
  { title: 'Components/Drawer', variant: 'Por defecto' },
  { title: 'Components/Menu', variant: 'Por defecto' },
  { title: 'Components/Toast', variant: 'Por defecto' },
  { title: 'Components/Tooltip', variant: 'Arriba' },
  { title: 'Components/Tabs', variant: 'Por defecto' },
  { title: 'Components/DataTable', variant: 'Por defecto' },
  { title: 'Components/Combobox', variant: 'Por defecto' },
  { title: 'Components/DatePicker', variant: 'Por defecto' },
];

test.describe('BENCH regresión visual (histoire snapshots)', () => {
  for (const storyRef of KEY_STORIES) {
    const story = storyByTitle(storyRef.title);
    const variant = story.variants.find((v) => v.title === storyRef.variant) ?? story.variants[0];
    for (const theme of ['light', 'dark'] as const) {
      for (const viewport of VIEWPORTS) {
        test(`${story.title} / ${variant.title} / ${theme} / ${viewport.name}`, async ({
          page,
        }) => {
          test
            .info()
            .annotations.push({ type: 'issue', description: 'baseline generada en Linux' });

          await page.setViewportSize(viewport);
          await page.goto(variantUrl(story, variant), { waitUntil: 'networkidle' });

          const sandbox = sandboxOf(page);
          await setTheme(sandbox, theme === 'dark');

          // El preview vive dentro del iframe del sandbox; capturamos la página
          // entera (chrome de Histoire + sandbox) para congelar el estado del catálogo.
          await expect(page).toHaveScreenshot(
            `${story.title}/${variant.title}/${theme}/${viewport.name}.png`,
            {
              animations: 'disabled',
              maxDiffPixelRatio: 0.02,
            },
          );
        });
      }
    }
  }
});
