import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { exportedTags, storyCatalog, storyForTag } from './story-catalog';

const STORY_BASE = 'http://127.0.0.1:6006/iframe.html?id=';

let catalogPromise: ReturnType<typeof storyCatalog> | undefined;
function catalog(request: APIRequestContext) {
  catalogPromise ??= storyCatalog(request);
  return catalogPromise;
}

test.describe('BENCH public contracts', () => {
  test('cada tag exportado tiene una story en el índice de Storybook', async ({ request }) => {
    const entries = await catalog(request);
    expect(entries.map((entry) => entry.tag).sort()).toEqual(exportedTags());
    expect(entries.every((entry) => entry.storyId.length > 0)).toBe(true);
  });

  // Una story por tag: la lista se genera desde los decoradores de
  // @bench/components y se resuelve contra apps/storybook/src + index.json.
  for (const tag of exportedTags()) {
    test(`${tag} se registra y actualiza en su story`, async ({ page, request }) => {
      const story = await storyForTag(request, tag);
      await page.goto(`${STORY_BASE}${story.storyId}`);
      await page.waitForSelector(`${tag}.hydrated`, { state: 'attached' });

      const result = await page.evaluate((name) => {
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
    {
      name: 'button',
      story: 'bench-components-button--primary',
      selector: 'bch-button button',
      role: 'button',
    },
    {
      name: 'input',
      story: 'bench-components-forms-input--default',
      selector: 'bch-input input',
      role: 'textbox',
    },
    {
      name: 'checkbox',
      story: 'bench-components-forms-checkbox--default',
      selector: 'bch-checkbox input',
      role: 'checkbox',
    },
    {
      name: 'dialog',
      story: 'bench-components-overlays-dialog--default',
      selector: 'bch-dialog dialog',
      role: 'dialog',
    },
    {
      name: 'tabs',
      story: 'bench-components-navigation-tabs--default',
      selector: 'bch-tabs [role="tablist"]',
      role: 'tablist',
    },
  ] as const;

  for (const c of semantics) {
    test(`${c.name} expone su semántica nativa`, async ({ page }) => {
      await page.goto(`${STORY_BASE}${c.story}`);
      await expect(page.locator(c.selector).first()).toHaveRole(c.role);
    });
  }
});
