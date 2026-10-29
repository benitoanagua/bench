#!/usr/bin/env node
/**
 * Component matrix coverage check.
 *
 * `docs/components/component-matrix.md` is the single component matrix of the
 * repository. This check extracts every `@Component({ tag: '...' })` from
 * `packages/components/src` and fails if a tag has no row in the matrix, or if
 * the matrix documents a tag that no longer exists.
 *
 * Run: node tooling/validation/component-matrix.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(new URL('../..', import.meta.url).pathname);
const sourceRoot = join(root, 'packages', 'components', 'src');
const matrixPath = join(root, 'docs', 'components', 'component-matrix.md');

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.tsx$/.test(entry)) files.push(path);
  }
  return files;
}

const sourceTags = new Set();
for (const file of walk(sourceRoot)) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/@Component\(\{[^}]*tag:\s*'([^']+)'/gs)) {
    sourceTags.add(match[1]);
  }
}

const matrix = readFileSync(matrixPath, 'utf8');
const documentedTags = new Set();
for (const line of matrix.split('\n')) {
  if (!line.trimStart().startsWith('|')) continue;
  for (const match of line.matchAll(/`(bch-[a-z0-9-]+)`/g)) documentedTags.add(match[1]);
}

const missing = [...sourceTags].filter((tag) => !documentedTags.has(tag)).sort();
const stale = [...documentedTags].filter((tag) => !sourceTags.has(tag)).sort();

if (missing.length || stale.length) {
  if (missing.length) console.error(`Missing matrix rows: ${missing.join(', ')}`);
  if (stale.length) console.error(`Matrix rows without a component: ${stale.join(', ')}`);
  process.exit(1);
}
console.log(`✓ component matrix covers all ${sourceTags.size} exported tags.`);
