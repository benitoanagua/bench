import { expect, test } from '@playwright/test';
import { exportedTags, histoireIndex, storyForTag, storyUrl } from './helpers';

function histoireIndexOnce() {
  return histoireIndex();
}/**
 * Cada tag exportado por @bench/components tiene una Historia en
 * .histoire/dist/histoire.json (el índice que sustituye al de la herramienta
 * previa de catálogo).
 */
test.describe('BENCH public contracts (Histoire)', () => {
  test('cada tag exportado tiene una story en el índice de Histoire', async () => {
    const idx = histoireIndexOnce();
    // storyForTag aplica los mismos aliases de hijos y matching por prefijo
    // que usa la navegación del catálogo: si un tag no resuelve a ninguna
    // story, el usuario no puede verlo.
    const unresueltos: string[] = [];
    for (const tag of exportedTags()) {
      try {
        storyForTag(tag, idx);
      } catch {
        unresueltos.push(tag);
      }
    }
    expect(unresueltos, `Tags sin story en el índice: ${unresueltos.join(', ')}`).toEqual([]);
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
