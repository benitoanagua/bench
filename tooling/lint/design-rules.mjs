import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../..', import.meta.url).pathname;
const forbidden = [/from\s+['"]lit(?:\/|['"])/, /from\s+['"]lit-html['"]/, /LitElement/];
const ignored = new Set([
  'node_modules',
  'dist',
  '.typecheck',
  '.git',
  '.turbo',
  'storybook-static',
  'coverage',
]);

function walk(dir, predicate) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (ignored.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) files.push(...walk(path, predicate));
    else if (predicate(name)) files.push(path);
  }
  return files;
}

const files = walk(join(root, 'packages'), (name) => /\.(ts|tsx|js|mjs|jsx)$/.test(name));
const violations = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const pattern of forbidden)
    if (pattern.test(text)) violations.push(`${file}: forbidden Lit dependency`);
}

/* ---- design tokens ---------------------------------------------------
 * The token layer is the only place allowed to declare raw colours. Every
 * other CSS file must reference `var(--bch-*)` (or `color-mix` of tokens).
 * The two overlay scrims are the documented exception: a translucent black
 * is a material, not a palette colour, and must stay independent of theme.
 */
const tokenLayer = 'packages/tokens/src/';
const colorExceptions = new Map([
  ['packages/components/src/components/dialog.css', [/rgb\(0 0 0 \/ 0\.48\)/g]],
  ['packages/components/src/components/drawer.css', [/rgb\(0 0 0 \/ 0\.42\)/g]],
]);
const rawColor = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g;

/* ---- raw pixel values ------------------------------------------------
 * The product/showcase layer must express spacing, sizes and radii with
 * tokens or rem. Primitive component CSS is intentionally out of scope:
 * hairlines and inward focus offsets are optical geometry the spacing scale
 * does not model. `0.5px` (optical centering) and `-2px` (inward focus
 * offset, §3) are kept as explicit allowances.
 */
const showcaseLayer = 'packages/components/src/showcase/';
const rawPx = /(?<![\w.-])-?(?:\d+|\d*\.\d+)px/g;
const pxAllow = new Set(['0.5px', '-2px']);

function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '');
}

const cssFiles = walk(join(root, 'packages'), (name) => name.endsWith('.css'));
for (const file of cssFiles) {
  const relativePath = relative(root, file).replaceAll('\\', '/');
  if (relativePath.startsWith(tokenLayer)) continue;

  let text = stripComments(readFileSync(file, 'utf8'));
  const exceptions = colorExceptions.get(relativePath) ?? [];
  for (const exception of exceptions) text = text.replace(exception, '');

  for (const match of text.matchAll(rawColor)) {
    violations.push(`${file}: raw colour "${match[0]}" (use var(--bch-*))`);
  }

  if (relativePath.startsWith(showcaseLayer)) {
    for (const match of text.matchAll(rawPx)) {
      if (!pxAllow.has(match[0])) {
        violations.push(`${file}: raw pixel value "${match[0]}" (use a --bch-* token or rem)`);
      }
    }
  }
}

if (violations.length) {
  console.error(violations.join('\n'));
  process.exit(1);
}
console.log(`BENCH architecture rules passed (${files.length} source files checked).`);
