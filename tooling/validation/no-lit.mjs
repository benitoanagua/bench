import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../..', import.meta.url).pathname;
const scanRoots = ['apps', 'packages'];
const excludedDirs = new Set(['node_modules', 'dist', 'storybook-static', '.git']);
const forbidden = [
  /from\s+['"]lit(?:\/|['"])/,
  /from\s+['"]lit-html['"]/, 
  /@lit\//,
  /LitElement/,
  /@storybook\/web-components(?:-vite)?/,
  /storybook\/web-components(?:-vite)?/,
];
const extensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.yaml', '.yml']);
const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (excludedDirs.has(entry.name)) continue;
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file);
      continue;
    }
    if (!extensions.has(file.slice(file.lastIndexOf('.')))) continue;
    const text = readFileSync(file, 'utf8');
    text.split('\n').forEach((line, index) => {
      if (forbidden.some((pattern) => pattern.test(line))) {
        hits.push(`${file}:${index + 1}: ${line.trim()}`);
      }
    });
  }
}

for (const relative of scanRoots) walk(join(root, relative));
for (const file of ['package.json', 'pnpm-workspace.yaml']) {
  const path = join(root, file);
  const text = readFileSync(path, 'utf8');
  text.split('\n').forEach((line, index) => {
    if (forbidden.some((pattern) => pattern.test(line))) hits.push(`${path}:${index + 1}: ${line.trim()}`);
  });
}

if (hits.length) {
  console.error('BENCH Lit/Web Components renderer check failed:');
  console.error(hits.join('\n'));
  process.exit(1);
}

console.log('BENCH Stencil renderer check passed.');
