import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { APIRequestContext } from '@playwright/test';

export type StoryRef = {
  tag: string;
  storyId: string;
  title: string;
  storyName: string;
};

type IndexEntry = {
  id: string;
  title: string;
  name: string;
  type: string;
};

type StoryFile = {
  base: string;
  title: string;
  tags: string[];
};

const root = fileURLToPath(new URL('../../../', import.meta.url));
const storySourceDir = join(root, 'apps', 'storybook', 'src');

/**
 * Tags exported by @bench/components, extracted from the Stencil decorators
 * (same criterion as tooling/validation/component-matrix.mjs).
 */
export function exportedTags(): string[] {
  const sourceRoot = join(root, 'packages', 'components', 'src');
  const tags = new Set<string>();
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) walk(path);
      else if (entry.endsWith('.tsx')) {
        for (const match of readFileSync(path, 'utf8').matchAll(
          /@Component\(\{[^}]*tag:\s*'([^']+)'/gs,
        )) {
          tags.add(match[1]);
        }
      }
    }
  };
  walk(sourceRoot);
  return [...tags].sort();
}

/**
 * Story files are the source of truth for which tags a story exercises; the
 * Storybook index supplies the stable story ids at runtime (dev server or
 * static build). No hand-maintained tag→story table is needed beyond the
 * parent/child aliases below.
 */
function storyFiles(): StoryFile[] {
  return readdirSync(storySourceDir)
    .filter((name) => name.endsWith('.stories.ts'))
    .map((name) => {
      const text = readFileSync(join(storySourceDir, name), 'utf8');
      const title = text.match(/title:\s*'([^']+)'/)?.[1] ?? '';
      const tags = [...new Set(text.match(/bch-[a-z0-9-]+/g) ?? [])];
      return {
        base: name
          .replace(/\.stories\.ts$/, '')
          .replace(/[^a-z0-9]/gi, '')
          .toLowerCase(),
        title,
        tags,
      };
    });
}

/**
 * Child components live inside their parent's story, and the six composite
 * showcase components share the Showcase story.
 */
const STORY_ALIASES: Record<string, string> = {
  'bch-accordion-item': 'accordion',
  'bch-breadcrumb-item': 'breadcrumbs',
  'bch-combobox-option': 'combobox',
  'bch-menu-item': 'menu',
  'bch-segmented-item': 'segmentedcontrol',
  'bch-tab': 'tabs',
  'bch-tab-panel': 'tabs',
  'bch-tree-item': 'tree',
  'bch-alert': 'showcase',
  'bch-data-table': 'showcase',
  'bch-empty-state': 'showcase',
  'bch-metric-card': 'showcase',
  'bch-status': 'showcase',
  'bch-toolbar': 'showcase',
};

function pickStoryFile(tag: string, files: StoryFile[]): StoryFile | undefined {
  const tagBase = tag.slice(4).replace(/-/g, '');
  const alias = STORY_ALIASES[tag];
  const candidates = files.filter((file) => file.tags.includes(tag));
  return (
    candidates.find((file) => file.base === alias) ??
    candidates.find((file) => file.base === tagBase) ??
    candidates.find((file) => file.base === `${tagBase}s`) ??
    candidates.sort((a, b) => a.tags.length - b.tags.length)[0]
  );
}

async function indexEntries(request: APIRequestContext): Promise<IndexEntry[]> {
  const response = await request.get('/index.json');
  if (!response.ok()) {
    throw new Error(`Storybook index.json returned ${response.status()}`);
  }
  const body = (await response.json()) as { entries: Record<string, IndexEntry> };
  return Object.values(body.entries).filter((entry) => entry.type === 'story');
}

function buildCatalog(files: StoryFile[], entries: IndexEntry[]): StoryRef[] {
  return exportedTags().map((tag) => {
    const file = pickStoryFile(tag, files);
    if (!file) throw new Error(`No Storybook source exercises ${tag}`);
    const stories = entries.filter((entry) => entry.title === file.title);
    if (stories.length === 0) throw new Error(`No Storybook entry for title "${file.title}"`);
    const story = stories.find((entry) => entry.name === 'Default') ?? stories[0];
    return { tag, storyId: story.id, title: story.title, storyName: story.name };
  });
}

export async function storyCatalog(request: APIRequestContext): Promise<StoryRef[]> {
  const [files, entries] = await Promise.all([
    Promise.resolve(storyFiles()),
    indexEntries(request),
  ]);
  return buildCatalog(files, entries);
}

/**
 * Matrix generation needs the catalog synchronously at module load. The
 * Storybook static index is produced by `pnpm build:storybook` (part of
 * `pnpm check`); the CI visual job builds it before running this spec.
 */
export function staticStoryCatalog(): StoryRef[] {
  const indexPath = join(root, 'apps', 'storybook', 'storybook-static', 'index.json');
  if (!existsSync(indexPath)) {
    throw new Error(`Missing ${indexPath}. Run "pnpm build:storybook" before the visual matrix.`);
  }
  const body = JSON.parse(readFileSync(indexPath, 'utf8')) as {
    entries: Record<string, IndexEntry>;
  };
  const entries = Object.values(body.entries).filter((entry) => entry.type === 'story');
  return buildCatalog(storyFiles(), entries);
}

export async function storyForTag(request: APIRequestContext, tag: string): Promise<StoryRef> {
  const catalog = await storyCatalog(request);
  const match = catalog.find((entry) => entry.tag === tag);
  if (!match) throw new Error(`No story mapped for ${tag}`);
  return match;
}

export function uniqueStories(catalog: StoryRef[]): StoryRef[] {
  const seen = new Set<string>();
  return catalog.filter((entry) => {
    if (seen.has(entry.storyId)) return false;
    seen.add(entry.storyId);
    return true;
  });
}
