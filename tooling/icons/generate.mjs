/**
 * Generates `packages/icons/src/data/carbon-outline.json` and
 * `packages/icons/src/icon-names.ts` from the official `@carbon/icons` npm
 * package — never hand-authored path data (bench-design-system.md §2.8: "se
 * importa el asset tal como lo entrega el paquete oficial"; ADR-008: a
 * hand-picked subset is a trap · the ADR-007 lesson applies).
 *
 * Name selection is curated on purpose (all ~2,200 glyphs would inflate the
 * bundle for names Bench never uses): the script takes every name referenced
 * as `<bch-icon name="…">` in repo source plus the previous JSON's keys,
 * resolves each against @carbon/icons' metadata.json (name lowercase; also
 * dotted/aliased forms), and emits ONLY those — in the [tag, attributes]
 * node format `bch-icon.tsx` renders. A requested name that no longer
 * resolves is an ERROR: generation fails loudly instead of silently
 * shrinking coverage. Both generated files come from the same data, so
 * `icon-names.ts` and the data file can never diverge (also enforced by
 * tooling/validation/icon-consistency.mjs).
 *
 *   node tooling/icons/generate.mjs
 */
/**
 *PARSER + RENAME TABLE BELOWS
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const iconsOutDir = join(root, 'packages', 'icons', 'src');


/**
 * Resolve @carbon/icons: devDependency of @bench/icons, so it usually links
 * at packages/icons/node_modules; fall back to the pnpm store like the
 * typography generator does.
 */
function resolveIconsPkg() {
  const candidates = [
    join(root, 'packages', 'icons', 'node_modules', '@carbon', 'icons'),
  ];
  const storeNames = join(root, 'node_modules', '.pnpm');
  if (existsSync(storeNames)) {
    for (const d of readdirSync(storeNames)) {
      if (d.startsWith('@carbon+icons@') || d.startsWith('carbon-icons@')) {
        candidates.push(join(storeNames, d, 'node_modules', '@carbon', 'icons'));
      }
    }
  }
  const found = candidates.find((c) => existsSync(join(c, 'metadata.json')));
  if (!found) {
    throw new Error('@carbon/icons not found — run pnpm install (devDependency of @bench/icons)');
  }
  return found;
}

const ignoredDirs = new Set(['node_modules', 'dist', '.git', '.turbo', 'test-results', 'coverage']);

/**
 * Public API name → official Carbon name. Bench's `<bch-icon name>` surface
 * predates the Carbon migration (ADR-007 era Tabler-style names); renaming
 * every consumer is invasive, so the DIFFERENT names get an explicit,
 * documented alias — the asset itself is still verbatim Carbon data.
 */
const BENCH_NAME_TO_CARBON = {
  'arrow-down': 'arrow--down',
  'arrows-sort': 'arrows--vertical',
  bell: 'notification',
  check: 'checkmark',
  'circle-solid': 'circle--solid',
  'chevron-down': 'chevron--down',
  'chevron-left': 'chevron--left',
  'chevron-right': 'chevron--right',
  'chevron-up': 'chevron--up',
  clipboard: 'paste',
  clock: 'time',
  'cloud-upload': 'upload',
  eye: 'view',
  file: 'document',
  'info-circle': 'information',
  'menu-2': 'menu',
  notes: 'notebook',
  /** Carbon has no inbox glyph — the closest "received items" asset. */
  inbox: 'email',
  plus: 'add',
  shield: 'security',
  trash: 'trash-can',
  type: 'types',
};

/** Only `<bch-icon name="…">` elements count as icon references. */
function collectReferencedNames() {
  const names = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (ignoredDirs.has(entry)) continue;
      const path = join(dir, entry);
      const stat = statSync(path);
      if (stat.isDirectory()) walk(path);
      else if (/\.(tsx?|jsx|mjs|css)$/.test(entry)) {
        const text = readFileSync(path, 'utf8');
        for (const m of text.matchAll(/<bch-icon[^>]*name=["']([\w-]+)/g)) names.add(m[1]);
      }
    }
  };
  walk(root);
  return names;
}

/**
 * Parse the official `source` SVG string into the [tag, attributes] node
 * format. Keeps shape/content elements, drops <title>/<defs>/<style>.
 */
function parseSvg(source) {
  const nodes = [];
  const tagRe = /<(\/)?(path|polygon|polyline|circle|ellipse|rect|line|g|use)\b([^>]*?)\/?>/g;
  for (const match of source.matchAll(tagRe)) {
    const [, closing, tag, rawAttrs] = match;
    if (closing) continue; // synthetic short-form parsing: only self-closing/attrs matter
    const attrs = {};
    for (const attr of rawAttrs.matchAll(/([\w:-]+)="([^"]*)"/g)) attrs[attr[1]] = attr[2];
    if (attrs.style) {
      // inline .cls-1 {fill:none} conventions in Carbon assets resolve to
      // explicit fills: drop style blocks' side effects, keep attributes.
      delete attrs.style;
    }
    nodes.push([tag, attrs]);
  }
  return nodes;
}

function main() {
  const iconsPkg = resolveIconsPkg();
  const previousJsonPath = join(iconsOutDir, 'data', 'carbon-outline.json');
  const previous = existsSync(previousJsonPath)
    ? JSON.parse(readFileSync(previousJsonPath, 'utf8'))
    : {};
  // "x" etc. is the drawer/dialog close icon's.Bunifu alias in this repo — kept from previous keys.
  const requested = new Set([...Object.keys(previous), ...collectReferencedNames()]);

  const metadata = JSON.parse(readFileSync(join(iconsPkg, 'metadata.json'), 'utf8'));
  const byExact = new Map(metadata.icons.map((e) => [e.name.toLowerCase(), e]));

  const failures = [];
  const resolved = new Map();
  for (const name of [...requested].sort()) {
    const carbonName = BENCH_NAME_TO_CARBON[name] ?? name;
    const entry = byExact.get(carbonName.toLowerCase());
    const asset = entry?.assets?.find((a) => a.size === 32) ?? entry?.assets?.[0];
    const nodes = asset?.source ? parseSvg(asset.source) : [];
    if (!entry || !nodes.length) {
      failures.push(name);
      continue;
    }
    resolved.set(name.toLowerCase(), nodes);
  }

  if (failures.length) {
    console.error(
      `✖ ${failures.length} requested icon name(s) unresolved against official @carbon/icons:\n  ${failures.join(', ')}`,
    );
    process.exit(1);
  }

  mkdirSync(dirname(previousJsonPath), { recursive: true });
  const out = {};
  for (const [name, nodes] of [...resolved.entries()].sort()) out[name.toLowerCase()] = nodes;
  writeFileSync(previousJsonPath, JSON.stringify(out, null, 2) + '\n');

  const namesFile = join(iconsOutDir, 'icon-names.ts');
  writeFileSync(
    namesFile,
    `/**
 * GENERATED from the official @carbon/icons metadata — never hand-maintained.
 * (tooling/icons/generate.mjs · ADR-008 carries the Tabler→Carbon closure.)
 */
export type CarbonIconName =
${Object.keys(out)
  .map((n) => `  | '${n}'`)
  .join('\n')};

export const carbonIconNames: readonly CarbonIconName[] = [
${Object.keys(out)
  .map((n) => `  '${n}',`)
  .join('\n')}
] as const;
`,
  );

  console.log(`✓ carbon-outline.json + icon-names.ts regenerated: ${Object.keys(out).length} icons`);
}

main();
