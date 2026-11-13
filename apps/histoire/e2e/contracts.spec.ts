import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import {
  exportedTags,
  histoireIndex,
  storyForTag,
  storyUrl,
  kebabCase,
  type StoryRef,
} from './helpers';

let catalogPromise: ReturnType<typeof histoireIndex> | undefined;
function index(request: APIRequestContext) {
  catalogPromise ??= histoireIndex();
  return catalogPromise;
}

/**
 * Cada tag exportado por @bench/components tiene una Historia en
 * .histoire/dist/histoire.json (el índice que sustituye al de la herramienta
 * previa de catálogo).
 */
test.describe('BENCH public contracts (Histoire)', () => {
  test('cada tag exportado tiene una story en el índice de Histoire', async ({ request }) => {
    const idx = index(request);
    const tagsInIndex = new Set<string>();
    const CHILD_ALIASES: Record<string, string> = {
      'bch-accordion-item': 'accordion',
      'bch-breadcrumb-item': 'breadcrumbs',
      'bch-combobox-option': 'combobox',
      'bch-menu-item': 'menu',
      'bch-segmented-item': 'segmented-control',
      'bch-tab': 'tabs',
      'bch-tab-panel': 'tabs',
      'bch-tree-item': 'tree',
    };
    for (const story of idx.stories) {
      const path = story.treePath ?? [];
      const last = path[path.length - 1];
      if (last) tagsInIndex.add(`bch-${kebabCase(last)}`);
    }
    // Los hijos sin historia propia se cubren con la story de su padre (alias),
    // y los tags compuestos (toast-region, nav-item) con la story del padre
    // por prefijo (bch-toast → cubre bch-toast-region).
    for (const tag of exportedTags()) {
      const component = kebabCase(tag.slice(4));
      const storyKeys = [...tagsInIndex].map((k) => kebabCase(k.slice(4)));
      const covered =
        storyKeys.some((k) => component === k || component.startsWith(`${k}-`)) ||
        (CHILD_ALIASES[tag] && storyKeys.includes(kebabCase(CHILD_ALIASES[tag])));
      expect(covered, `Falta story para ${tag}`).toBe(true);
    }
  });

  for (const tag of exportedTags()) {
    test(`${tag} se registra y se hidrata en su historia`, async ({ page, request }) => {
      const url = await storyUrl(tag);
      await page.goto(url, { waitUntil: 'networkidle' });

      // El preview de Histoire renderiza en un iframe (__sandbox.html).
      const sandbox = page.frames().find((f) => f.url().includes('__sandbox'));
      expect(sandbox).toBeTruthy();

      await sandbox!.waitForSelector(tag, { state: 'attached', timeout: 15000 });

      const result = await sandbox!.evaluate((name) => {
        const ctor = customElements.get(name) as CustomElementConstructor | undefined;
        const element = document.querySelector(name);
        return {
          defined: Boolean(ctor),
          upgraded: Boolean(element && ctor && element instanceof ctor),
          connected: Boolean(element?.isConnected),
        };
      }, tag);

      expect(result).toEqual({ defined: true, upgraded: true, connected: true });
    });
  }

  const semantics = [
    { name: 'button', tag: 'bch-button', selector: 'bch-button button', role: 'button' },
    { name: 'input', tag: 'bch-input', selector: 'bch-input input', role: 'textbox' },
    { name: 'checkbox', tag: 'bch-checkbox', selector: 'bch-checkbox input', role: 'checkbox' },
    { name: 'dialog', tag: 'bch-dialog', selector: 'bch-dialog dialog', role: 'dialog' },
    { name: 'tabs', tag: 'bch-tabs', selector: 'bch-tabs [role="tablist"]', role: 'tablist' },
  ] as const;

  for (const c of semantics) {
    test(`${c.name} expone su semántica nativa`, async ({ page }) => {
      const url = await storyUrl(c.tag);
      await page.goto(url, { waitUntil: 'networkidle' });
      const sandbox = page.frames().find((f) => f.url().includes('__sandbox'));
      expect(sandbox).toBeTruthy();
      await expect(sandbox!.locator(c.selector).first()).toHaveRole(c.role);
    });
  }
});
