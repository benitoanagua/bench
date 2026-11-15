/**
 * BENCH perceptibilidad P1–P11 — matriz completa.
 * Una prueba por cada combinación: story × variante × densidad × tema × viewport.
 * Usa expect.soft para reportar TODOS los findings simultáneamente.
 *
 * La matriz cruza TODAS las variantes del índice (≈ 3 600 combinaciones y
 * crece con cada story): sólo se registra cuando se pide explícitamente con
 * PERCEPTIBILITY_MATRIX=1, para no multiplicar el tiempo del barrido e2e
 * habitual (smoke/contracts/a11y/visual/interactions).
 *
 *   PERCEPTIBILITY_MATRIX=1 pnpm --filter @bench/histoire test:e2e perceptibility-matrix.spec.ts
 */
import { expect, test } from '@playwright/test';
import { allVariants, sandboxOf, setTheme, variantUrl } from './helpers';
import { checkPerceptibility, type Finding } from './support/perceptibility';

const ENABLED = process.env.PERCEPTIBILITY_MATRIX === '1';
const DENSITIES: ('compact' | 'comfortable' | 'spacious')[] = ['compact', 'comfortable', 'spacious'];
const THEMES: ('light' | 'dark')[] = ['light', 'dark'];
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 360, height: 740 },
];

test.describe('BENCH perceptibilidad P1–P11 (matriz)', () => {
  test.skip(!ENABLED, 'Matriz completa desactivada: lanzar con PERCEPTIBILITY_MATRIX=1');

  for (const { story, variant } of allVariants()) {
    for (const density of DENSITIES) {
      for (const theme of THEMES) {
        for (const viewport of VIEWPORTS) {
          const testTitle = `${story.title} / ${variant.title} / ${theme} / ${viewport.name} / ${density}`;

          test(
            testTitle,
            async ({ page }) => {
              // variantUrl respeta BASE_PATH (por defecto /bench/).
              const url = variantUrl(story, variant, density);
              await page.goto(url, { waitUntil: 'networkidle' });

              const sandbox = sandboxOf(page);
              await setTheme(sandbox, theme === 'dark');

              // Ejecutar todas las checks P1–P11.
              const findings = await checkPerceptibility(
                sandbox,
                story.title,
                variant.title,
                theme,
                viewport,
              );

              // Soft assertions acumulan todos los problemas sin cortar temprano.
              expect.soft(findings).toEqual([]);
            },
            { tag: 'perceptibility-matrix' },
          );
        }
      }
    }
  }
});
