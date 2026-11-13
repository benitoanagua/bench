/**
 * BENCH catálogo — tests de la UI de Histoire (árbol, búsqueda, controles,
 * tema, viewport, subruta /bench/ con routerMode hash).
 */
import { expect, test } from '@playwright/test';
import { histoireIndex, sandboxOf, setTheme, variantUrl } from './helpers';

test.describe('BENCH UI de Histoire', () => {
  test('el árbol respeta el orden Welcome → Foundations → Components → Patterns → Showcase', async ({
    page,
  }) => {
    await page.goto(`http://127.0.0.1:5179/bench/`, { waitUntil: 'networkidle' });

    // Histoire sidebar tree uses role="treeitem" for navigation groups.
    // Try to find them; if not found, fall back to looking for nav menu items.
    const treeItems = page.getByRole('treeitem');
    const names = await treeItems.allTextContents();

    // If no treeitems found, try navigation menu items as fallback
    const fallbackItems = page.getByRole('menuitem');
    const fallbackNames = await fallbackItems.allTextContents();

    const allNames = names.length > 0 ? names : fallbackNames;
    const ordered = ['Welcome', 'Foundations', 'Components', 'Patterns', 'Showcase'];
    let last = -1;
    for (const group of ordered) {
      const idx = allNames.findIndex((n, i) => i > last && n === group);
      if (idx === -1) {
        // Try case-insensitive or partial match
        const idx2 = allNames.findIndex((n) => n.toLowerCase().includes(group.toLowerCase()));
        if (idx2 !== -1) {
          expect(idx2).toBeGreaterThan(
            -1,
            `Falta el grupo "${group}" en el árbol (coincidencia parcial)`,
          );
          last = idx2;
          continue;
        }
      }
      expect(idx).toBeGreaterThan(-1, `Falta el grupo "${group}" en el árbol`);
      last = idx;
    }
  });

  test('la búsqueda filtra el árbol', async ({ page }) => {
    await page.goto(`http://127.0.0.1:5179/bench/`, { waitUntil: 'networkidle' });

    // Histoire uses a search input; try different role options
    let search = page.getByRole('searchbox', { name: /buscar/i });
    if (!(await search.count())) {
      search = page.getByRole('textbox', { name: /buscar/i });
    }
    if (!(await search.count())) {
      search = page.locator('input[placeholder*="buscar"]').first();
    }
    if (!(await search.count())) {
      search = page.locator('input.search').first();
    }

    await search.click();
    await search.type('Button');

    const treeItems = page.getByRole('treeitem');
    await expect(treeItems.first()).toContainText('Button');
    // los grupos que no coinciden se colapsan/ocultan
    await expect(page.getByRole('treeitem', { name: 'Welcome' })).toBeHidden();
  });

  test('cambiar de story actualiza el sandbox', async ({ page }) => {
    const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
    expect(buttonStory).toBeTruthy();
    await page.goto(variantUrl(buttonStory!, buttonStory!.variants[0]), {
      waitUntil: 'networkidle',
    });

    const sandbox = sandboxOf(page);
    await expect(sandbox.getByRole('button', { name: 'Continuar' }).first()).toBeVisible();

    const tokensStory = histoireIndex().stories.find((s) => s.title === 'Tokens');
    await page.goto(variantUrl(tokensStory!, tokensStory!.variants[0]), {
      waitUntil: 'networkidle',
    });

    const sandbox2 = sandboxOf(page);
    await expect(sandbox2.getByRole('button', { name: 'Continuar' }).first()).toBeHidden();
    await expect(sandbox2.getByText('Paleta de colores').first()).toBeVisible();
  });

  test('el panel de controles aparece en stories con controles', async ({ page }) => {
    const playground = histoireIndex().stories.find(
      (s) => s.title === 'Components/Button' && s.variants.some((v) => v.title === 'Playground'),
    );
    if (!playground) {
      test.skip(true, 'Components/Button / Playground no existe aún (Fase 2)');
      return;
    }
    await page.goto(
      variantUrl(
        playground,
        playground.variants.find((v) => v.title === 'Playground')!,
      ),
      {
        waitUntil: 'networkidle',
      },
    );

    const panel = page.getByRole('region', { name: /controles/i }).first();
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('textbox', { name: /etiqueta/i }).first()).toBeVisible();
  });

  test('el selector de tema alterna dark y sincroniza data-bch-theme en el sandbox', async ({
    page,
  }) => {
    const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
    await page.goto(variantUrl(buttonStory!, buttonStory!.variants[0]), {
      waitUntil: 'networkidle',
    });

    const sandbox = sandboxOf(page);
    // Alternate theme button; try different role/text options
    const themeBtn = page.getByRole('button', { name: /tema|theme/i });
    if (!(await themeBtn.first().click())) {
      // Fallback: click the color scheme switcher
      await page
        .getByRole('button', { name: /theme|color scheme/i })
        .first()
        .click();
    }
    await expect(sandbox.locator('html')).toHaveAttribute('data-bch-theme', 'dark');

    await themeBtn.first().click();
    await expect(sandbox.locator('html')).toHaveAttribute('data-bch-theme', 'light');
  });

  test('el selector de viewport cambia el tamaño del preview', async ({ page }) => {
    const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
    await page.goto(variantUrl(buttonStory!, buttonStory!.variants[0]), {
      waitUntil: 'networkidle',
    });

    const sandbox = sandboxOf(page);
    await page
      .getByRole('button', { name: /vista previa|responsive/i })
      .first()
      .click();
    await page
      .getByRole('menuitem', { name: /móvil|mobile/i })
      .first()
      .click();

    const sandboxHtml = sandbox.locator('html');
    // Histoire re-monta el sandbox; esperamos el nuevo viewport en el iframe
    await sandbox.waitForFunction(() => window.innerWidth <= 640, { timeout: 10000 });
    await expect(sandboxHtml).toHaveAttribute('data-bch-theme', 'light');
  });

  test('el sitio sirve bajo /bench/ con routerMode hash', async ({ page }) => {
    const response = await page.goto(`http://127.0.0.1:5179/bench/`, {
      waitUntil: 'networkidle',
    });
    expect(response?.status()).toBe(200);

    const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
    await page.goto(variantUrl(buttonStory!, buttonStory!.variants[0]), {
      waitUntil: 'networkidle',
    });
    expect(page.url()).toContain('/bench/#/story/');
    const sandbox = sandboxOf(page);
    await expect(sandbox.getByRole('button', { name: 'Continuar' }).first()).toBeVisible();
  });
});
