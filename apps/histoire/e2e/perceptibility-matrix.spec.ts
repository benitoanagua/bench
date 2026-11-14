/**
 * BENCH perceptibilidad P1–P11 — matriz completa.
 * Uno por cada combinación: story × variante × densidad × tema × viewport.
 * Usa expect.soft para reportar TODOS los findings simultáneamente.
 * Importa allVariants desde catalog.ts.
 */
import { allVariants } from './support/catalog';
import { expect, test } from '@playwright/test';
import { checkPerceptibility, type Finding } from './support/perceptibility';
import { sandboxOf, setTheme } from './support/sandbox';

const DENSITIES: ('compact' | 'comfortable' | 'spacious')[] = ['compact', 'comfortable', 'spacious'];
const THEMES: ('light' | 'dark')[] = ['light', 'dark'];
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 360, height: 740 },
];

// Obtiene todas las story/variant del índice
const variants = allVariants();

// Crea un test individual por cada story/variant/density/theme/viewport combinación
for (const { story, variant } of variants) {
  for (const density of DENSITIES) {
    for (const theme of THEMES) {
      for (const viewport of VIEWPORTS) {
        const testTitle = `${story.title} / ${variant.title} / ${theme} / ${viewport.name} / ${density}`;

        test(
          testTitle,
          async ({ page }) => {
            // Navegar a la story/variant con la densidad especificada
            const url = `http://127.0.0.1:5179#/story/${story.id}?variantId=${variant.id}&density=${density}`;
            await page.goto(url, { waitUntil: 'networkidle' });

            // Obtener el sandbox
            const sandbox = sandboxOf(page);

            // Alternar tema
            await setTheme(sandbox, theme === 'dark');

            // Ejecutar todas las checks P1-P11
            const findings = await checkPerceptibility(
              sandbox,
              story.title,
              variant.title,
              theme,
              viewport,
            );

            // Reportar todos los findings con expect.soft
            // Soft assertions acumulan todos los problemas sin cortar temprano
            expect.soft(findings).toEqual([]);
          },
          { tag: 'perceptibility-matrix' }
        );
      }
    }
  }
}