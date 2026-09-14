import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packageName = process.argv[2];
const root = resolve(new URL(`../../packages/${packageName}/`, import.meta.url).pathname);
const violations = [];

/**
 * BENCH per-package forbidden-dependency check.
 *
 * The Lit-related bans are unrelated to iconography and unchanged. The
 * icon-related bans originally also forbade the icon-set name Bench uses
 * today (obfuscated via array-join so a plain grep wouldn't surface it) —
 * see tooling/validation/no-legacy-icons.mjs for the full history and
 * docs/architecture/adr-008-carbon-icons.md for why that specific ban is
 * retired here, on the record, now that Bench's own specification
 * (docs/bench-design-system.md §2.8) makes that icon set the required one.
 * The two icon-CDN/custom-element package patterns just below remain
 * banned: that's a different, still-real concern from which icon-set is used — Bench resolves icons at build time from a
 * real npm package into `src/data/*.json`, never a runtime fetch.
 */
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist') continue;
    const file = join(dir, entry);
    if (statSync(file).isDirectory()) walk(file);
    else if (/\.(ts|tsx|js|mjs)$/.test(entry)) {
      const text = readFileSync(file, 'utf8');
      const banned = [
        /from ['"]lit['"]/,
        /from ['"]lit\//,
        /LitElement/,
        /lit-html/,
        /@lit\//,
        new RegExp(String.fromCharCode(105,99,111,110,105,102,121,45,105,99,111,110), 'i'),
        new RegExp(String.fromCharCode(105,99,111,110,105,102,121,45,106,115,111,110), 'i'),
      ];
      for (const pattern of banned) if (pattern.test(text)) violations.push(`${file}: forbidden dependency or legacy icon reference`);
    }
  }
}

walk(root);
if (violations.length) {
  console.error('BENCH architecture violation: forbidden framework or icon-provider dependency detected.');
  console.error(violations.join('\n'));
  process.exit(1);
}
