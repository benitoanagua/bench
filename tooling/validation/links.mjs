#!/usr/bin/env node
/**
 * Relative Markdown link check.
 *
 * Scans every tracked `.md` in the repository and verifies that relative links
 * resolve to a real file or directory. External URLs, anchors, mailto and
 * absolute paths are intentionally out of scope (no network at check time).
 *
 * Run: node tooling/validation/links.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(new URL('../..', import.meta.url).pathname);
const ignoredDirs = new Set([
  'node_modules',
  '.git',
  'dist',
  '.turbo',
  '.stencil',
  'storybook-static',
]);
const markdownFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignoredDirs.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.md$/.test(entry)) markdownFiles.push(path);
  }
}

walk(root);

const linkPattern = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const errors = [];
for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(linkPattern)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|#|\/)/.test(target)) continue;
    const withoutAnchor = target.split('#')[0].split('?')[0];
    if (!withoutAnchor) continue;
    const resolved = join(dirname(file), decodeURIComponent(withoutAnchor));
    if (!existsSync(resolved)) {
      errors.push(`${file.replace(`${root}/`, '')}: link "${target}" does not resolve`);
    }
  }
}

if (errors.length) {
  console.error('Broken relative Markdown links:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`✓ relative links OK in ${markdownFiles.length} Markdown files.`);
