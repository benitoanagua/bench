/**
 * BENCH catálogo — barrido automático de TODAS las stories y variants del
 * índice real de Histoire (nunca listas hardcodeadas).
 *
 * Por variant (viewport 1280×800, tema claro, densidad comfortable por defecto):
 *   a. cero console.error / pageerror / peticiones fallidas (salvo favicon 404)
 *   b. todo bch-* usado está definido e hidratado (clase `hydrated` de Stencil)
 *   c. bounding box > 0, sin overflow horizontal del documento
 *   d. no está vacío
 *   e. axe wcag2a/wcag2aa en claro y oscuro, respetando DISABLED_RULES
 *   f. matriz 3 viewports × 3 densidades (comprobaciones de layout + sincronía
 *      de data-bch-theme al alternar `dark`)
 */
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  histoireIndex,
  sandboxOf,
  setTheme,
  gotoDensity,
  variantUrl,
  exportedTags,
  basePath,
} from './helpers';

const DISABLED_RULES: Record<string, string[]> = {
  'bch-tabs': ['aria-required-children', 'aria-required-parent'],
  'bch-tab': ['aria-required-parent'],
  'bch-breadcrumbs': ['list', 'listitem'],
  'bch-breadcrumb-item': ['listitem'],
  'bch-splitter': ['aria-required-attr'],
};

const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 740 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];
const DENSITIES: ('compact' | 'comfortable' | 'spacious')[] = [
  'compact',
  'comfortable',
  'spacious',
];

const index = histoireIndex();

test.describe('BENCH catálogo — barrido automático (todas las stories × variants)', () => {
  for (const story of index.stories) {
    test.describe(story.title, () => {
      for (const variant of story.variants) {
        test(`${variant.title || '(sin título)'}`, async ({ page }) => {
          await checkVariant(page, story, variant);
        });
      }
    });
  }
});

async function checkVariant(page, story, variant) {
  const url = variantUrl(story, variant);
  const usedTags: string[] = [];

  // --- captura de errores de red y consola (solo del sandbox) -------------
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error' && msg.frame().url().includes('__sandbox')) {
      consoleErrors.push(`${msg.text()} [${msg.location()?.url}]`);
    }
  });
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('requestfailed', (req) => {
    if (!req.url().includes('favicon')) failedRequests.push(req.url());
  });

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const sandbox = sandboxOf(page);

  // El sandbox monta el preview de forma asíncrona; esperamos al primer
  // elemento (cualquiera) antes de seguir.
  await sandbox.waitForFunction(() => document.body.children.length > 0, {
    timeout: 15000,
  });

  // --- a. cero errores de consola / página / red --------------------------
  await expect(consoleErrors).toEqual([]);
  await expect(pageErrors).toEqual([]);
  await expect(failedRequests).toEqual([]);

  // --- b. todos los bch-* definidos e hidratados --------------------------
  const hydration = await sandbox.evaluate(() => {
    const result: Array<{ tag: string; defined: boolean; hydrated: boolean }> = [];
    document.querySelectorAll('bch-*').forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const ctor = customElements.get(tag);
      result.push({
        tag,
        defined: Boolean(ctor),
        hydrated: Boolean(ctor && el instanceof ctor && el.classList.contains('hydrated')),
      });
    });
    return result;
  });

  const notDefined = hydration.filter((h) => !h.defined).map((h) => h.tag);
  const notHydrated = hydration.filter((h) => !h.hydrated).map((h) => h.tag);
  expect(notDefined, `custom elements no definidos: ${notDefined.join(', ')}`).toEqual([]);
  expect(notHydrated, `custom elements no hidratados: ${notHydrated.join(', ')}`).toEqual([]);
  usedTags.push(...hydration.map((h) => h.tag));

  // --- c. bounding box > 0 y sin overflow horizontal ----------------------
  const geometry = await sandbox.evaluate(() => {
    const html = document.documentElement;
    const first = document.body.querySelector(':scope > *:not(script):not(style)');
    const rect = first ? first.getBoundingClientRect() : html.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      scrollWidth: html.scrollWidth,
      innerWidth: window.innerWidth,
      bodyText: document.body.textContent?.trim() ?? '',
    };
  });

  expect(geometry.width).toBeGreaterThan(0);
  expect(geometry.height).toBeGreaterThan(0);
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.innerWidth + 2);

  // --- d. no está vacío -----------------------------------------------------
  expect(geometry.bodyText.length > 0 || usedTags.length > 0, 'variant vacío').toBeTruthy();

  // --- e. axe en claro y oscuro --------------------------------------------
  const disabled = Array.from(new Set(usedTags.flatMap((tag) => DISABLED_RULES[tag] ?? [])));

  if (usedTags.length) {
    const selector = usedTags.join(', ');
    const runAxe = async (theme: 'light' | 'dark') => {
      await setTheme(sandbox, theme === 'dark');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .include(['iframe[src*="__sandbox"]', selector])
        .disableRules(disabled)
        .analyze();
      expect(
        results.violations,
        `${theme}:\n${JSON.stringify(results.violations, null, 2)}`,
      ).toEqual([]);
    };
    await runAxe('light');
    await runAxe('dark');
    await setTheme(sandbox, false); // restaura claro
  }

  // --- f. matriz viewports × densidades ------------------------------------
  const defaultCombo = { name: 'desktop', width: 1280, height: 800, density: 'comfortable' };
  for (const viewport of VIEWPORTS) {
    for (const density of DENSITIES) {
      if (viewport.name === defaultCombo.name && density === defaultCombo.density) continue;

      const comboUrl = variantUrl(story, variant, density);
      await gotoDensity(page, comboUrl, density);
      await page.setViewportSize(viewport);

      // sin errores nuevos de consola/red
      const comboConsole: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && msg.frame().url().includes('__sandbox')) {
          comboConsole.push(msg.text());
        }
      });

      const comboSandbox = sandboxOf(page);
      await comboSandbox.waitForFunction(() => document.body.children.length > 0, {
        timeout: 15000,
      });

      const comboGeo = await comboSandbox.evaluate(() => {
        const html = document.documentElement;
        const first = document.body.querySelector(':scope > *:not(script):not(style)');
        const rect = first ? first.getBoundingClientRect() : html.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          scrollWidth: html.scrollWidth,
          innerWidth: window.innerWidth,
        };
      });

      expect(comboConsole).toEqual([]);
      expect(comboGeo.width).toBeGreaterThan(0);
      expect(comboGeo.height).toBeGreaterThan(0);
      expect(comboGeo.scrollWidth).toBeLessThanOrEqual(comboGeo.innerWidth + 2);

      // tema claro/oscuro con sincronía de data-bch-theme en cada combinación
      await setTheme(comboSandbox, true);
      await expect(comboSandbox.locator('html')).toHaveAttribute('data-bch-theme', 'dark');
      await setTheme(comboSandbox, false);
      await expect(comboSandbox.locator('html')).toHaveAttribute('data-bch-theme', 'light');
    }
  }
}

test.describe('BENCH catálogo — cobertura del índice', () => {
  test('cada tag exportado tiene al menos una story en el índice', async ({}) => {
    const tagsInIndex = new Set(
      index.stories.map((s) => {
        const path = s.treePath ?? [];
        return path[path.length - 1] ? `bch-${path[path.length - 1].toLowerCase()}` : '';
      }),
    );
    for (const tag of exportedTags()) {
      expect(tagsInIndex.has(tag), `Falta story para ${tag}`).toBeTruthy();
    }
  });

  test('el índice de Histoire tiene stories y variants (no vacío)', async ({}) => {
    expect(index.stories.length).toBeGreaterThan(0);
    let variants = 0;
    for (const story of index.stories) variants += story.variants?.length ?? 0;
    expect(variants).toBeGreaterThan(0);
  });
});
