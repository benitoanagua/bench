/**
 * Utilidades compartidas para los tests e2e de Histoire.
 *
 * - exportedTags(): extrae los tags `bch-*` de los decoradores @Component de
 *   @bench/components (mismo criterio que tooling/validation/component-matrix.mjs).
 * - histoireIndex(): lee .histoire/dist/histoire.json (índice de stories).
 * - storyForTag(): resuelve la story canónica de un tag.
 * - storyUrl(): URL completa de una story/variant bajo el prefijo BASE_PATH.
 * - sandboxOf(page): el iframe __sandbox donde Histoire renderiza la preview.
 * - setTheme(sandbox, dark): alterna la clase `dark` en <html> del sandbox y
 *   espera a que data-bch-theme se sincronice (puente de histoire.setup.ts).
 * - setDensity(page, density): navega a la misma variant con ?density=...
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { APIRequestContext, Page } from '@playwright/test';

const root = resolve(process.cwd(), '../../');
const componentsDir = join(root, 'packages', 'components', 'src', 'components');

// Prefijo bajo el que se sirve el build de Histoire (GitHub Pages: /bench/).
// Debe coincidir con e2e/playwright.config.ts y histoire.config.ts (vite.base).
export function basePath(): string {
  return (process.env.BASE_PATH ?? '/bench/').replace(/\/+$/, '') || '';
}

export type StoryRef = {
  tag: string;
  storyId: string;
  variantId: string;
  title: string;
};

export function kebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

export function exportedTags(): string[] {
  const tags = new Set<string>();
  for (const entry of readdirSync(componentsDir)) {
    if (!entry.endsWith('.tsx')) continue;
    const text = readFileSync(join(componentsDir, entry), 'utf8');
    for (const match of text.matchAll(/@Component\(\{\s*tag:\s*'([^']+)'/g)) {
      const t = match[1];
      if (t && t.startsWith('bch-')) tags.add(t);
    }
  }
  return [...tags].sort();
}

export function histoireIndex(): { stories: any[] } {
  const indexPath = join(root, 'apps', 'histoire', '.histoire', 'dist', 'histoire.json');
  const text = readFileSync(indexPath, 'utf8');
  return JSON.parse(text);
}

export function storyForTag(tag: string, index: { stories: any[] }): StoryRef {
  // Hijos que no tienen historia propia: se resuelven contra la historia del padre.
  const CHILD_ALIASES: Record<string, string> = {
    'bch-accordion-item': 'accordion',
    'bch-breadcrumb-item': 'breadcrumbs',
    'bch-combobox-option': 'combobox',
    'bch-menu-item': 'menu',
    'bch-nav-item': 'nav',
    'bch-segmented-item': 'segmented-control',
    'bch-tab': 'tabs',
    'bch-tab-panel': 'tabs',
    'bch-tree-item': 'tree',
  };
  const resolvedTag = tag && CHILD_ALIASES[tag] ? CHILD_ALIASES[tag] : tag;
  if (typeof resolvedTag !== 'string') throw new Error(`tag inválido: ${tag}`);
  // Para aliases (hijos sin historia propia) el componente ya viene sin
  // prefijo; para el resto se quita 'bch-'.
  const base = CHILD_ALIASES[tag] ?? resolvedTag.slice(4);
  const componentName = kebabCase(base);

  // Busca el story cuya treePath termine con el nombre del componente
  // (ej. ["Components", "DatePicker"] para bch-date-picker). Primera pasada:
  // coincidencia exacta (evita que bch-icon-button caiga bajo bch-icon).
  for (const story of index.stories) {
    const path = story.treePath ?? [];
    const last = kebabCase(path[path.length - 1] ?? '');
    if (last === componentName) {
      const variant = story.variants?.[0];
      return {
        tag,
        storyId: story.id,
        variantId: variant?.id ?? `${story.id}-0`,
        title: story.title,
      };
    }
  }
  // Segunda pasada: prefijo (bch-toast-region cae bajo la story "Toast").
  for (const story of index.stories) {
    const path = story.treePath ?? [];
    const last = kebabCase(path[path.length - 1] ?? '');
    if (last && componentName.startsWith(`${last}-`)) {
      const variant = story.variants?.[0];
      return {
        tag,
        storyId: story.id,
        variantId: variant?.id ?? `${story.id}-0`,
        title: story.title,
      };
    }
  }
  // Fallback: primer story cuyo título contenga el nombre del componente
  for (const story of index.stories) {
    if (kebabCase(story.title).includes(componentName)) {
      const variant = story.variants?.[0];
      return {
        tag,
        storyId: story.id,
        variantId: variant?.id ?? `${story.id}-0`,
        title: story.title,
      };
    }
  }
  throw new Error(`No Histoire story found for tag ${tag}`);
}

export async function storyUrl(tag: string, variantId?: string, density?: string): Promise<string> {
  const idx = histoireIndex();
  const ref = storyForTag(tag, idx);
  const id = variantId ?? ref.variantId;
  const search = new URLSearchParams();
  if (density) search.set('density', density);
  const qs = search.toString() ? `?${search.toString()}` : '';
  return `http://127.0.0.1:5179${basePath()}/#/story/${ref.storyId}?variantId=${id}${qs}`;
}

/** URL de una story/variant por títulos (legible, sin hardcodear ids). */
export function storyUrlByTitle(
  storyTitle: string,
  variantTitle: string,
  density?: string,
): string {
  const idx = histoireIndex();
  const story = idx.stories.find((s) => s.title === storyTitle);
  if (!story) throw new Error(`No se encontró la story "${storyTitle}"`);
  const variant = story.variants?.find((v: any) => v.title === variantTitle);
  if (!variant) throw new Error(`No se encontró la variant "${variantTitle}" en "${storyTitle}"`);
  return variantUrl(story, variant, density);
}

/** URL de una story/variant arbitraria del índice (barrido automatizado). */
export function variantUrl(story: any, variant: any, density?: string): string {
  const search = new URLSearchParams();
  if (density) search.set('density', density);
  const qs = search.toString() ? `?${search.toString()}` : '';
  return `http://127.0.0.1:5179${basePath()}/#/story/${story.id}?variantId=${variant.id}${qs}`;
}

export function sandboxOf(page: Page) {
  const sandbox = page.frames().find((f) => f.url().includes('__sandbox'));
  if (!sandbox) throw new Error('No se encontró el iframe __sandbox de Histoire');
  return sandbox;
}

/** Alterna el tema en el sandbox y espera la sincronización data-bch-theme. */
export async function setTheme(sandbox: Page, dark: boolean) {
  await sandbox.evaluate((d) => {
    if (d) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, dark);
  await pageEventually(sandbox, dark);
}

async function pageEventually(sandbox: Page, dark: boolean) {
  const expected = dark ? 'dark' : 'light';
  await sandbox.evaluate((e) => {
    window.__expectedTheme = e;
  }, expected);
  await sandbox.waitForFunction(
    () => document.documentElement.getAttribute('data-bch-theme') === window.__expectedTheme,
    { timeout: 8000 },
  );
}

/** Navega (recarga) la variant con la densidad dada y espera la aplicación del token. */
export async function gotoDensity(
  page: Page,
  url: string,
  density: 'compact' | 'comfortable' | 'spacious',
) {
  await page.goto(url, { waitUntil: 'networkidle' });
  const sandbox = sandboxOf(page);
  // El setup lee ?density= solo al cargar; esperamos el atributo en el sandbox.
  await sandbox.evaluate((d) => {
    window.__expectedDensity = d;
  }, density);
  await sandbox.waitForFunction(
    () => document.documentElement.getAttribute('data-bch-density') === window.__expectedDensity,
    { timeout: 8000 },
  );
}
