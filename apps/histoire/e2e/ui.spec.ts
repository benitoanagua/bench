/**
 * BENCH catálogo — tests de la UI de Histoire (árbol, búsqueda, controles,
 * tema, viewport, subruta /bench/ con routerMode hash).
 */
import { expect, test } from '@playwright/test';
import { histoireIndex, sandboxOf, variantUrl } from './helpers';
import * as env from './support/env';

test.describe('BENCH UI de Histoire', () => {
  test('el árbol respeta el orden Welcome → Foundations → Components → Patterns → Showcase', async ({
    page,
  }) => {
    await page.goto(env.BASE_URL, { waitUntil: 'networkidle' });

    // Los grupos del árbol son elementos con role="button" cuyo nombre es el
    // del grupo; verificamos su orden vertical en la barra lateral.
    const groups = ['Welcome', 'Foundations', 'Components', 'Patterns', 'Showcase'];
    let prevY = -Infinity;
    for (const group of groups) {
      const btn = page.getByRole('button', { name: group, exact: true }).first();
      await expect(btn).toBeVisible();
      const y = (await btn.boundingBox())!.y;
      expect(y, `El grupo "${group}" debe aparecer en orden en el árbol`).toBeGreaterThanOrEqual(
        prevY,
      );
      prevY = y;
    }
  });

  test('la búsqueda (Ctrl+K) encuentra stories', async ({ page }) => {
    await page.goto(env.BASE_URL, { waitUntil: 'networkidle' });

    // El atajo de la paleta de búsqueda de Histoire es Ctrl+K / Cmd+K.
    await page.keyboard.press('Control+k');
    const searchInput = page.locator('input:not([type="checkbox"])').first();
    await expect(searchInput).toBeVisible({ timeout: 10_000 });
    await searchInput.fill('Button');
    await expect(page.getByText('Button', { exact: true }).first()).toBeVisible();
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
    // La variante "Paleta de colores" muestra el texto explicativo de tokens.
    await expect(
      sandbox2.getByText(/Tokens de color definidos en/i).first(),
    ).toBeVisible();
  });

  test('el panel de controles aparece en stories con controles', async ({ page }) => {
    const playground = histoireIndex().stories.find(
      (s) => s.title === 'Button' && s.variants.some((v) => v.title === 'Playground'),
    );
    expect(
      playground,
      'Button / Playground no existe: la story de Button debe tener controles',
    ).toBeTruthy();
    await page.goto(
      variantUrl(
        playground!,
        playground!.variants.find((v) => v.title === 'Playground')!,
      ),
      {
        waitUntil: 'networkidle',
      },
    );

    // El panel de controles lista el estado inicial y los controles por
    // título (HstText con title="Etiqueta" → textbox accesible "Etiqueta").
    await expect(page.getByText('Initial state').first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Etiqueta' }).first()).toBeVisible();
  });

  test('el bridge de tema del sandbox sincroniza data-bch-theme', async ({
    page,
  }) => {
    // Nota: el toggle de esquema de color de la UI de Histoire (beta) no
    // expone role/name accesibles, así que el cambio por UI se valida como
    // hallazgo abierto; aquí se prueba el puente que esa UI gobierna:
    // la clase `dark` en <html> del sandbox → data-bch-theme.
    const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
    await page.goto(variantUrl(buttonStory!, buttonStory!.variants[0]), {
      waitUntil: 'networkidle',
    });

    const sandbox = sandboxOf(page);
    await sandbox.evaluate(() => document.documentElement.classList.add('dark'));
    await expect(sandbox.locator('html')).toHaveAttribute('data-bch-theme', 'dark');
    await sandbox.evaluate(() => document.documentElement.classList.remove('dark'));
    await expect(sandbox.locator('html')).toHaveAttribute('data-bch-theme', 'light');
  });

  // Comportamiento real de Histoire: el canvas del preview es de ancho fijo
  // (720px por defecto) y el shell se recentra/scrolla al cambiar el viewport.
  // La adaptación a anchos concretos se hace con los responsivePresets de la
  // toolbar, que no exponen roles accesibles (ver gap documentado).
  test('el preview mantiene el canvas fijo y visible en cualquier viewport', async ({ page }) => {
    const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
    await page.goto(variantUrl(buttonStory!, buttonStory!.variants[0]), {
      waitUntil: 'networkidle',
    });

    const iframe = page.locator('iframe[src*="__sandbox"]').first();
    await page.setViewportSize({ width: 800, height: 600 });
    await expect(iframe).toBeVisible();
    await expect(iframe.boundingBox()).resolves.toMatchObject({ width: 720 });

    await page.setViewportSize({ width: 1400, height: 900 });
    await expect(iframe).toBeVisible();
    // El ancho del canvas no depende del viewport del shell.
    await expect(iframe.boundingBox()).resolves.toMatchObject({ width: 720 });
    // El contenido del sandbox sigue visible tras el reflow del shell.
    const sandbox = sandboxOf(page);
    await expect(sandbox.getByRole('button', { name: 'Continuar' }).first()).toBeVisible();
  });

  test('el sitio sirve bajo /bench/ con routerMode hash', async ({ page }) => {
    const response = await page.goto(env.BASE_URL, {
      waitUntil: 'networkidle',
    });
    expect(response?.status()).toBe(200);

    const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
    await page.goto(variantUrl(buttonStory!, buttonStory!.variants[0]), {
      waitUntil: 'networkidle',
    });
    expect(page.url()).toContain(`${env.BASE_PATH || ''}/#/story/`);
    // La segunda navegación solo cambia el hash (same-document), así que el
    // iframe del sandbox aparece asíncronamente: frameLocator espera por él.
    const sandboxFrame = page.frameLocator('iframe[src*="__sandbox"]');
    await expect(sandboxFrame.getByRole('button', { name: 'Continuar' }).first()).toBeVisible();
  });
});
