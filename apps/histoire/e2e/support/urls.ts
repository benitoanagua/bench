/**
 * utilidades de URL para tests e2e de Histoire.
 *
 * Todas las URLs se construyen sobre BASE_PATH (por defecto /bench/),
 * consistiendo con histoire.config.ts y playwright.config.ts.
 */
import { BASE_PATH, BASE_URL } from './env';
import { histoireIndex } from './catalog';

/** Construye la URL completa de una story por tag + variantId. */
export function storyUrl(tag: string, variantId?: string, density?: string): string {
  const idx = histoireIndex();
  const ref = (() => {
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
    const base = CHILD_ALIASES[tag] ?? resolvedTag.slice(4);

    // Primera pasada: coincidencia exacta en treePath
    for (const story of idx.stories) {
      const path = story.treePath ?? [];
      const last = story.title?.split('/').pop() ?? '';
      const lastKebab = last.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\\s]+/g, '-').toLowerCase();
      if (lastKebab === base) {
        const variant = story.variants?.[0];
        return {
          tag,
          storyId: story.id,
          variantId: variant?.id ?? `${story.id}-0`,
        };
      }
    }
    // Segunda pasada: prefijo
    for (const story of idx.stories) {
      const path = story.treePath ?? [];
      const last = story.title?.split('/').pop() ?? '';
      const lastKebab = last.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\\s]+/g, '-').toLowerCase();
      if (last && base.startsWith(`${last}-`)) {
        const variant = story.variants?.[0];
        return {
          tag,
          storyId: story.id,
          variantId: variant?.id ?? `${story.id}-0`,
        };
      }
    }
    // Fallback
    for (const story of idx.stories) {
      if (story.title.toLowerCase().includes(base)) {
        const variant = story.variants?.[0];
        return {
          tag,
          storyId: story.id,
          variantId: variant?.id ?? `${story.id}-0`,
        };
      }
    }
  })();

  const id = variantId ?? ref.variantId;
  const search = new URLSearchParams();
  if (density) search.set('density', density);
  const qs = search.toString() ? `?${search.toString()}` : '';
  return `${BASE_URL}/#/story/${ref.storyId}?variantId=${id}${qs}`;
}

/** URL legible por títulos (storyTitle, variantTitle). */
export function storyUrlByTitle(storyTitle: string, variantTitle: string, density?: string): string {
  const idx = histoireIndex();
  const story = idx.stories.find((s: any) => s.title === storyTitle);
  if (!story) throw new Error(`No se encontró la story "${storyTitle}"`);
  const variant = story.variants?.find((v: any) => v.title === variantTitle);
  if (!variant) throw new Error(`No se encontró la variant "${variantTitle}" en "${storyTitle}"`);
  return storyUrl(story, variant, density);
}

/** URL de una story/variant arbitraria del índice (barrido automatizado). */
export function variantUrl(story: any, variant: any, density?: string): string {
  const search = new URLSearchParams();
  if (density) search.set('density', density);
  const qs = search.toString() ? `?${search.toString()}` : '';
  return `${BASE_URL}/#/story/${story.id}?variantId=${variant.id}${qs}`;
}