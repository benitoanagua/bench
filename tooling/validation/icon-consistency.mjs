import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * Icon consistency check (ADR-008 closure):
 * `src/icon-names.ts` and `src/data/carbon-outline.json` are BOTH generated
 * by tooling/icons/generate.mjs from the same data — this check fails if they
 * ever diverge (hand-edit, stale build, partial regeneration). It also
 * verifies every Bench public name in the rename table actually resolved, so
 * a rename to a non-existent Carbon name cannot regress silently.
 */
const root = resolve(new URL('../..', import.meta.url).pathname);
const dataPath = join(root, 'packages', 'icons', 'src', 'data', 'carbon-outline.json');
const namesPath = join(root, 'packages', 'icons', 'src', 'icon-names.ts');

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const dataNames = Object.keys(data).sort();
const source = readFileSync(namesPath, 'utf8');

const quoted = [...source.matchAll(/'([\w-]+)'/g)].map((m) => m[1]);
const namesInTs = [...new Set(quoted)].sort();

const errors = [];
const onlyInData = dataNames.filter((n) => !namesInTs.includes(n));
const onlyInTs = namesInTs.filter((n) => !dataNames.includes(n));
if (onlyInData.length) errors.push(`icons in data JSON but not in icon-names.ts: ${onlyInData.join(', ')}`);
if (onlyInTs.length) errors.push(`names in icon-names.ts but not in data JSON: ${onlyInTs.join(', ')}`);
for (const name of dataNames) {
  if (!Array.isArray(data[name]) || data[name].length === 0) {
    errors.push(`icon "${name}" has empty/invalid node data`);
  }
}

if (errors.length) {
  console.error(
    `✖ icon-names.ts ↔ carbon-outline.json diverged — regenerate with \`pnpm icons:generate\`:\n  ${errors.join('\n  ')}`,
  );
  process.exit(1);
}
console.log(`✓ icon data consistent: ${dataNames.length} icons in both icon-names.ts and carbon-outline.json`);
