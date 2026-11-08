/**
 * Utilidades compartidas para los tests e2e de Histoire.
 *
 * - exportedTags(): extrae los tags `bch-*` de los decoradores @Component de
 *   @bench/components (mismo criterio que tooling/validation/component-matrix.mjs).
 * - histoireIndex(): lee .histoire/dist/histoire.json (índice de stories).
 * - storyForTag(): resuelve la story canónica de un tag (primera variant del
 *   story cuyo título contenga el nombre del tag, o el story cuya treePath
 *   termine con el nombre del componente).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { APIRequestContext } from '@playwright/test';

const root = resolve(process.cwd(), '../../');
const componentsDir = join(root, 'packages', 'components', 'src', 'components');

export type StoryRef = {
  tag: string;
  storyId: string;
  variantId: string;
  title: string;
};

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
    'bch-segmented-item': 'segmented-control',
    'bch-tab': 'tabs',
    'bch-tab-panel': 'tabs',
    'bch-tree-item': 'tree',
  };
  const resolvedTag = tag && CHILD_ALIASES[tag] ? CHILD_ALIASES[tag] : tag;
  if (typeof resolvedTag !== 'string') throw new Error(`tag inválido: ${tag}`);
  const componentName = resolvedTag.slice(4).toLowerCase(); // quita 'bch-'
  // Busca el story cuya treePath termine con el nombre del componente
  // (ej. ["Components", "Button"] para bch-button).
  for (const story of index.stories) {
    const path = story.treePath ?? [];
    const last = (path[path.length - 1] ?? '').toLowerCase();
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
  // Fallback: primer story cuyo título contenga el nombre del componente
  for (const story of index.stories) {
    if (story.title.toLowerCase().includes(componentName.toLowerCase())) {
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

export async function storyUrl(tag: string): Promise<string> {
  const idx = histoireIndex();
  const ref = storyForTag(tag, idx);
  return `http://127.0.0.1:5179/bench/#/story/${ref.storyId}?variantId=${ref.variantId}`;
}
