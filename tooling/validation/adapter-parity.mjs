#!/usr/bin/env node
/**
 * Adapter parity check.
 *
 * Every `bch-*` tag exported by `@bench/components` must have a typed React
 * wrapper and a Vue `GlobalComponents` entry. Parsing the sources (instead of
 * trusting a hand-maintained list) keeps the check honest when a component is
 * added.
 *
 * Run: node tooling/validation/adapter-parity.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagesDir = path.join(root, 'packages');
const errors = [];

function componentTags() {
  const sourceRoot = path.join(packagesDir, 'components', 'src');
  const tags = new Set();
  const stack = [sourceRoot];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(file);
      else if (entry.isFile() && file.endsWith('.tsx')) {
        const text = fs.readFileSync(file, 'utf8');
        for (const match of text.matchAll(/@Component\(\{[^}]*tag:\s*'([^']+)'/gs)) {
          tags.add(match[1]);
        }
      }
    }
  }
  return [...tags].sort();
}

function reactWrapperTags() {
  const file = path.join(packagesDir, 'react', 'src', 'index.tsx');
  const text = fs.readFileSync(file, 'utf8');
  const tags = new Set();
  for (const match of text.matchAll(/createWrapper<[\s\S]*?>\s*\(\s*'(bch-[a-z0-9-]+)'\s*\)/g)) {
    tags.add(match[1]);
  }
  return tags;
}

function vueWrapperTags() {
  const file = path.join(packagesDir, 'vue', 'src', 'index.ts');
  const text = fs.readFileSync(file, 'utf8');
  const tags = new Set();
  for (const match of text.matchAll(/'(bch-[a-z0-9-]+)'\s*:/g)) {
    tags.add(match[1]);
  }
  return tags;
}

const tags = componentTags();
const reactTags = reactWrapperTags();
const vueTags = vueWrapperTags();

for (const tag of tags) {
  if (!reactTags.has(tag)) errors.push(`@bench/react is missing a wrapper for ${tag}`);
  if (!vueTags.has(tag)) errors.push(`@bench/vue is missing a GlobalComponents entry for ${tag}`);
}
for (const tag of reactTags) {
  if (!tags.includes(tag)) errors.push(`@bench/react wraps unknown tag ${tag}`);
}
for (const tag of vueTags) {
  if (!tags.includes(tag)) errors.push(`@bench/vue declares unknown tag ${tag}`);
}

if (errors.length) {
  console.error('BENCH adapter parity check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`BENCH adapter parity check passed (${tags.length} tags covered by React and Vue).`);
