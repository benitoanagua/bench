import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../..', import.meta.url).pathname;
const forbidden = [/from\s+['"]lit(?:\/|['"])/, /from\s+['"]lit-html['"]/, /LitElement/];
const ignored = new Set(['node_modules', 'dist', '.git']);

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (ignored.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) files.push(...walk(path));
    else if (/\.(ts|tsx|js|mjs|jsx)$/.test(name)) files.push(path);
  }
  return files;
}

const files = walk(join(root, 'packages'));
const violations = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const pattern of forbidden)
    if (pattern.test(text)) violations.push(`${file}: forbidden Lit dependency`);
}
if (violations.length) {
  console.error(violations.join('\n'));
  process.exit(1);
}
console.log(`BENCH architecture rules passed (${files.length} source files checked).`);
