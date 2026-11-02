import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { exportedTags, storyForTag } from './story-catalog';

const STORY_BASE = 'http://127.0.0.1:6006/iframe.html?id=';

// `disableRules` solo se usa donde axe no modela bien la relación ARIA a través
// del projection de slots de Stencil (ver tabs). Cualquier otra excepción debe
// llevar su justificación junto al tag.
const DISABLED_RULES: Record<string, string[]> = {
  'bch-tabs': [
    // bch-tabs proyecta los paneles con <slot name="panel"> HERMANO del
    // role="tablist"; axe recorre el árbol plano y da falsos positivos de
    // required-parent/children. La relación real se comprueba en
    // contracts.spec.ts y en la spec de tabs.
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
    // como huérfano. La semántica real (ol > li) se valida en la spec.
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

test.describe('BENCH accessibility audit', () => {
  for (const tag of exportedTags()) {
    test(`${tag} story sin violaciones WCAG 2 A/AA`, async ({ page, request }) => {
      const story = await storyForTag(request, tag);
      await page.goto(`${STORY_BASE}${story.storyId}`);
      // El elemento puede estar oculto (dialog cerrado) pero debe existir.
      await page.waitForSelector(`${tag}.hydrated`, { state: 'attached' });

      // Auditar el subárbol del componente, no la página de demo completa:
      // varias stories comparten superficie (Showcase) y el resto de la
      // composición no forma parte del contrato de este tag.
      let axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).include(tag);
      const disabled = DISABLED_RULES[tag];
      if (disabled) axe = axe.disableRules(disabled);
      const results = await axe.analyze();

      expect(
        results.violations,
        `${tag} (${story.storyId}):\n${JSON.stringify(results.violations, null, 2)}`,
      ).toEqual([]);
    });
  }

  test('teclado puede alcanzar el botón', async ({ page }) => {
    await page.goto(`${STORY_BASE}bench-components-button--primary`);
    const button = page.locator('bch-button button').first();
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('dialog tiene etiqueta accesible', async ({ page }) => {
    await page.goto(`${STORY_BASE}bench-components-overlays-dialog--default`);
    const dialog = page.locator('bch-dialog dialog').first();
    await expect(dialog).toHaveAttribute('aria-labelledby');
  });
});
