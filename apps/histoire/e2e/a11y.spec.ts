import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { exportedTags, histoireIndex, storyForTag } from './helpers';

/**
 * Excepciones de axe justificadas por tag. Las justificaciones se mantienen
 * íntegras (migradas de packages/testing/visual/a11y.spec.ts).
 */
const DISABLED_RULES: Record<string, string[]> = {
  'bch-tabs': [
    // bch-tabs proyecta los paneles con <slot name="panel"> HERMANO del
    // role="tablist"; axe recorre el árbol plano y da falsos positivos de
    // required-parent/children. La relación real se comprueba en contracts.
    'aria-required-children',
    'aria-required-parent',
  ],
  'bch-tab': [
    // El rol tab vive en el <button> interno, pero su padre físico es el
    // custom element <bch-tab> (scoped), no el role="tablist". La relación
    // real está cubierta por la spec de tabs.
    'aria-required-parent',
  ],
  'bch-breadcrumbs': [
    // Stencil scoped proyecta los <bch-breadcrumb-item> dentro del <ol>,
    // pero axe ve el custom element como hijo directo y el <li> interno
    // como huérfano. La semántica real (ol > li) se valida en contracts.
    'list',
    'listitem',
  ],
  'bch-breadcrumb-item': ['listitem'],
  'bch-splitter': [
    // El splitter es un control de delta: no posee el tamaño absoluto de los
    // paneles (lo clampa la app), así que no hay un aria-valuenow honesto que
    // exponer. role="separator" + aria-orientation describen la interacción.
    'aria-required-attr',
  ],
};

test.describe('BENCH accessibility audit (Histoire)', () => {
  for (const tag of exportedTags()) {
    test(`${tag} historia sin violaciones WCAG 2 A/AA`, async ({ page, request }) => {
      const ref = storyForTag(tag, histoireIndex(request));
      await page.goto(ref, { waitUntil: 'networkidle' });
      const sandbox = page.frames().find((f) => f.url().includes('__sandbox'));
      expect(sandbox).toBeTruthy();

      await sandbox!.waitForSelector(tag, { state: 'attached', timeout: 15000 });

      let axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).include(tag);
      const disabled = DISABLED_RULES[tag];
      if (disabled) axe = axe.disableRules(disabled);
      const results = await axe.analyze();

      expect(
        results.violations,
        `${tag} (${ref.storyId}):\n${JSON.stringify(results.violations, null, 2)}`,
      ).toEqual([]);
    });
  }
});
