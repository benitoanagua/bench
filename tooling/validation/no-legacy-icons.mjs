import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(new URL('../..', import.meta.url).pathname);

/**
 * BENCH legacy/anti-pattern icon reference check.
 *
 * History: this check originally forbade two obfuscated words (decoded via
 * String.fromCharCode so a plain repo-wide grep wouldn't trivially surface
 * them) — the icon-set name this project uses today, and a third-party
 * runtime CDN that resolves icons over the network at render time.
 *
 * Bench's own specification (docs/bench-design-system.md §2.8, and
 * docs/architecture/adr-008-carbon-icons.md) has since made the FIRST of
 * those two the explicitly sanctioned, required icon set — banning that
 * word repo-wide would now flag Bench's own icon package, its README, its
 * third-party notices, and its own reference documentation as violations.
 * That half of the original check is retired here, on the record, rather
 * than silently dropped.
 *
 * The SECOND concern — a runtime CDN dependency for icons — remains exactly
 * as forbidden as before, and for the same reason Bench also refuses a
 * runtime CDN for its webfont (§2.7): a network fetch needed to resolve at
 * *render time* can fail silently depending on the environment (a sandboxed
 * preview with a restrictive network policy, for example) — the icon or
 * glyph simply doesn't appear, with no visible error. Bench's icon assets
 * are resolved at build time from the real npm package and embedded in the
 * bundle — never fetched by URL when the component renders.
 */
const forbidden = [
  new RegExp(String.fromCharCode(105, 99, 111, 110, 105, 102, 121), 'i'), // decodes to the runtime icon-CDN service name — still forbidden, kept obfuscated on purpose (see comment above)
];

// Reference material explicitly kept unchanged (docs/bench-design-system.md,
// docs/demos/*) is allowed to discuss a forbidden pattern *by name*, in
// cautionary prose, without that counting as the codebase actually using it.
// Implementation code has no such exemption.
const referenceExempt = new Set(['docs/bench-design-system.md']);
const referenceExemptPrefixes = ['docs/demos/'];

const ignored = new Set(['node_modules', 'dist', '.git', 'coverage', 'test-results']);
const violations = [];

function isExempt(relativePath) {
  if (referenceExempt.has(relativePath)) return true;
  return referenceExemptPrefixes.some((prefix) => relativePath.startsWith(prefix));
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignored.has(entry)) continue;
    const file = join(dir, entry);
    const stat = statSync(file);
    if (stat.isDirectory()) {
      walk(file);
      continue;
    }
    if (!/\.(ts|tsx|js|mjs|json|md|css|html|yaml|yml)$/.test(entry)) continue;
    const relative = file.replace(root + '/', '');
    if (isExempt(relative)) continue;
    const text = readFileSync(file, 'utf8');
    if (forbidden.some((pattern) => pattern.test(text))) violations.push(file);
  }
}

walk(root);
if (violations.length) {
  console.error('BENCH legacy icon reference check failed:');
  console.error(violations.join('\n'));
  process.exit(1);
}
console.log('BENCH legacy icon reference check passed.');
