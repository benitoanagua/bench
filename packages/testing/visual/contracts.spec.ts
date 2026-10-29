import { expect, test } from '@playwright/test';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const STORY_BASE = 'http://127.0.0.1:6006/iframe.html?id=';

/**
 * Fuente de verdad de los tags exportados: se extraen del código fuente de
 * `@bench/components` con el mismo criterio que `tooling/validation/
 * component-matrix.mjs`. Así el contrato de registro cubre automáticamente
 * los 52 tags sin mantener una lista paralela.
 */
function exportedTags(): string[] {
  const root = fileURLToPath(new URL('../../../', import.meta.url));
  const srcRoot = join(root, 'packages', 'components', 'src');
  const tags = new Set<string>();
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) walk(path);
      else if (entry.endsWith('.tsx')) {
        for (const m of readFileSync(path, 'utf8').matchAll(
          /@Component\(\{[^}]*tag:\s*'([^']+)'/gs,
        )) {
          tags.add(m[1]);
        }
      }
    }
  };
  walk(srcRoot);
  return [...tags].sort();
}

test.describe('BENCH public contracts', () => {
  test('every exported tag ships as an upgradeable custom element', async ({ page }) => {
    const tags = exportedTags();
    expect(tags.length).toBeGreaterThan(50);

    await page.goto(`${STORY_BASE}bench-contracts--registry`);

    const results = await page.evaluate(async (list: string[]) => {
      const out: { tag: string; defined: boolean; upgraded: boolean }[] = [];
      for (const tag of list) {
        const ctor = customElements.get(tag) as CustomElementConstructor | undefined;
        const defined = Boolean(ctor);
        let upgraded = false;
        if (ctor) {
          const el = document.createElement(tag);
          document.body.appendChild(el);
          await customElements.whenDefined(tag);
          const ready = (el as unknown as { componentOnReady?: () => Promise<unknown> })
            .componentOnReady;
          if (ready) {
            try {
              await ready.call(el);
            } catch {
              /* el registro no depende de que el render esté libre de errores */
            }
          } else {
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
          }
          upgraded = el.isConnected && el instanceof ctor;
          el.remove();
        }
        out.push({ tag, defined, upgraded });
      }
      return out;
    }, tags);

    const notDefined = results.filter((r) => !r.defined).map((r) => r.tag);
    const notUpgraded = results.filter((r) => !r.upgraded).map((r) => r.tag);
    expect(notDefined, `tags sin custom element: ${notDefined.join(', ')}`).toEqual([]);
    expect(notUpgraded, `tags que no se actualizaron: ${notUpgraded.join(', ')}`).toEqual([]);
  });

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
