/**
 * Índice tipado y memoizado de historias de Histoire.
 *
 * Leo .histoire/dist/histoire.json y devuelvo un mapa estructurado por tag,
 * facilitando el barrido automático de variantes en los tests e2e.
 *
 * La ruta base se sobreescribe mediante HISTOIRE_ROOT, sino se usa una
 * ruta por defecto conocida.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// --- Ruta base: HISTOIRE_ROOT desde entorno o ruta por defecto ---
const HISTOIRE_ROOT = process.env.HISTOIRE_ROOT || '/home/mamaya/Code/bench';

const componentsDir = join(HISTOIRE_ROOT, 'packages', 'components', 'src', 'components');
const historieDist = join(HISTOIRE_ROOT, 'apps', 'histoire', '.histoire', 'dist');
const indexPath = join(historieDist, 'histoire.json');

let cachedIndex: { stories: any[] } | null = null;

/** Lee el índice de Histoire, cacheado por proceso. */
export function histoireIndex(): { stories: any[] } {
  if (!cachedIndex) {
    if (!existsSync(indexPath)) {
      throw new Error(
        `.histoire/dist/histoire.json no encontrado en ${indexPath}. ` +
          'Define HISTOIRE_ROOT o verifica la ruta.',
      );
    }
    cachedIndex = JSON.parse(readFileSync(indexPath, 'utf8'));
  }
  return cachedIndex;
}

/** Todas las etiquetas bch-* exportadas por Stencil. */
export function exportedTags(): string[] {
  const tags = new Set<string>();
  for (const entry of readdirSync(componentsDir)) {
    if (!entry.endsWith('.tsx')) continue;
    const text = readFileSync(join(componentsDir, entry), 'utf8');
    for (const match of text.matchAll(/@Component\({\s*tag:\s*'([^']+)'/g)) {
      const t = match[1];
      if (t && t.startsWith('bch-')) tags.add(t);
    }
  }
  return [...tags].sort();
}

/** Resuelve story ref para un tag (usa aliases de hijos). */
export function storyForTag(tag: string, index: { stories: any[] }): {
  tag: string;
  storyId: string;
  variantId: string;
  title: string;
} {
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
  const base = CHILD_ALIASES[tag] ?? resolvedTag.slice(4);
  for (const story of index.stories) {
    const path = story.treePath ?? [];
    const last = story.title?.split('/').pop() ?? '';
    const lastKebab = last
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[_\\s]+/g, '-')
      .toLowerCase();
    if (lastKebab === base) {
      const variant = story.variants?.[0];
      return {
        tag,
        storyId: story.id,
        variantId: variant?.id ?? `${story.id}-0`,
        title: story.title,
      };
    }
  }
  for (const story of index.stories) {
    const path = story.treePath ?? [];
    const last = story.title?.split('/').pop() ?? '';
    const lastKebab = last
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[_\\s]+/g, '-')
      .toLowerCase();
    if (last && base.startsWith(`${last}-`)) {
      const variant = story.variants?.[0];
      return {
        tag,
        storyId: story.id,
        variantId: variant?.id ?? `${story.id}-0`,
        title: story.title,
      };
    }
  }
  for (const story of index.stories) {
    if (story.title.toLowerCase().includes(base)) {
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

/** kebabCase para nombres de componente. */
function kebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\\s]+/g, '-')
    .toLowerCase();
}

/** Todas las story/variant para barrido automatizado. */
export function allVariants(): Array<{ story: any; variant: any }> {
  const idx = histoireIndex();
  const result: Array<{ story: any; variant: any }> = [];
  for (const story of idx.stories) {
    for (const variant of story.variants ?? []) {
      result.push({ story, variant });
    }
  }
  return result;
}