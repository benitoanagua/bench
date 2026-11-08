import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import {
  exportedTags,
  histoireIndex,
  storyForTag,
  storyUrl,
  type StoryRef,
} from './helpers';

let catalogPromise: ReturnType<typeof histoireIndex> | undefined;
function index(request: APIRequestContext) {
  catalogPromise ??= histoireIndex();
  return catalogPromise;
}

/**
 * Cada tag exportado por @bench/components tiene una Historia en
 * .histoire/dist/histoire.json (el índice que sustituye al index.json de
 * Storybook).
 */
test.describe('BENCH public contracts (Histoire)', () => {
  test('cada tag exportado tiene una story en el índice de Histoire', async ({ request }) => {
    const idx = index(request);
    const tagsInIndex = new Set(
      idx.stories.map((s) => {
        const path = s.treePath ?? [];
        return path[path.length - 1] ? `bch-${path[path.length - 1].toLowerCase()}` : '';
      }),
    );
    for (const tag of exportedTags()) {
      expect(tagsInIndex.has(tag), `Falta story para ${tag}`).toBe(true);
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
