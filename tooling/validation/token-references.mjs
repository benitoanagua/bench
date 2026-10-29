#!/usr/bin/env node
/**
 * Token reference check.
 *
 * Fails when component/app CSS references a `--bch-*` custom property that no
 * stylesheet ever defines (a typo like `--bch-color-state-hover` silently falls
 * back to nothing). Runtime properties set inline from TSX, such as
 * `--bch-slider-percent`, count as definitions too.
 *
 * Public tokens defined in `packages/tokens/src` but not yet consumed inside
 * this repository are reported as a count, not an error: several are part of
 * the documented public contract (breakpoint, z-index, grid and type scales)
 * consumed by downstream applications. The inventory lives in
 * `docs/foundations/tokens.md`.
 *
 * Run: node tooling/validation/token-references.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(new URL('../..', import.meta.url).pathname);
const ignoredDirs = new Set([
  'node_modules',
  '.git',
  'dist',
  '.turbo',
  '.stencil',
  'storybook-static',
  'test-results',
  'coverage',
]);
const sourceFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignoredDirs.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(css|ts|tsx)$/.test(entry)) sourceFiles.push(path);
  }
}

for (const dir of ['apps', 'packages', 'tooling']) walk(join(root, dir));

const definitions = new Set();
const publicTokens = new Set();
const usages = new Map();

for (const file of sourceFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(--bch-[a-z0-9-]+)'?\s*:/g)) {
    definitions.add(match[1]);
    if (file.startsWith(join(root, 'packages', 'tokens', 'src'))) publicTokens.add(match[1]);
  }
  for (const match of text.matchAll(/var\(\s*(--bch-[a-z0-9-]+)/g)) {
    if (!usages.has(match[1])) usages.set(match[1], new Set());
    usages.get(match[1]).add(relative(root, file));
  }
}

const broken = [...usages.keys()].filter((token) => !definitions.has(token)).sort();
const reserved = [...publicTokens].filter((token) => !usages.has(token)).sort();

if (broken.length) {
  console.error('Undefined --bch-* custom properties:');
  for (const token of broken) {
    const files = [...usages.get(token)].slice(0, 3).join(', ');
    console.error(`  - ${token} (used in ${files})`);
  }
  process.exit(1);
}

console.log(
  `✓ token references resolve (${publicTokens.size} public tokens, ${
    publicTokens.size - reserved.length
  } consumed in-repo).`,
);
if (reserved.length) {
  console.log(
    `  ${reserved.length} contract/reserved tokens without an in-repo consumer — inventory in docs/foundations/tokens.md.`,
  );
}
