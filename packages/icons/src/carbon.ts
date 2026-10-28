import iconData from './data/carbon-outline.json';
import type { CarbonIconName } from './icon-names';

export type { CarbonIconName } from './icon-names';

/**
 * A single SVG child node: [tagName, attributes]. Unlike the Tabler-era format
 * this replaces, attributes are NOT assumed to inherit a uniform stroke from
 * the wrapping <svg> — Carbon icons are mostly filled/optically-corrected
 * shapes, some with `fill-rule="evenodd"` for rings/cutouts (see bch-icon.tsx,
 * which no longer hardcodes fill/stroke on the root <svg>). Each node carries
 * whatever fill/stroke/fill-rule it actually needs.
 */
export type CarbonNode = readonly [string, Record<string, string | number>];

/**
 * Carbon Icons node data, sourced from `@carbon/icons` (Apache License 2.0)
 * at build time — see packages/icons/THIRD_PARTY_NOTICES.md for attribution
 * and packages/icons/package.json's build script for the generation step.
 *
 * Carbon icon data is GENERATED from the official `@carbon/icons` package
 * (tooling/icons/generate.mjs, devDependency pinned via @bench/icons) —
 * never hand-authored. Coverage is curated: every name referenced as
 * `<bch-icon name="…">` in this repo plus Bench's public alias table
 * (Bench-era names like `chevron-down` are re-keyed to their Carbon asset).
 * ADR-008 closes the ADR-007-era gap by making this the single generation
 * path enforced by tooling/validation/icon-consistency.mjs.
 */
const icons = iconData as unknown as Record<string, readonly CarbonNode[]>;

export function resolveCarbonIcon(name: string): readonly CarbonNode[] | undefined {
  const normalized = name.trim().toLowerCase();
  const resolved = icons[normalized];
  if (!resolved && process.env.NODE_ENV !== 'production') {
    // Dev-only affordance (§2.8: a missing glyph must not fail silently in
    // production, but also must not spam end users): tell the developer the
    // name is not in the generated set — run `pnpm icons:generate` after
    // adding `<bch-icon name="…">` usage, or check the spelling/ADR-008.
    console.warn(
      `[bch-icon] "${name}" is not in the generated Carbon set (${carbonIconCount} icons). ` +
        'If it is a new usage, run `pnpm icons:generate`; otherwise check docs/architecture/adr-008-carbon-icons.md.',
    );
  }
  return resolved;
}

export function isCarbonIconName(name: string): name is CarbonIconName {
  return Boolean(resolveCarbonIcon(name));
}

/** Total number of icons available in the resolved (currently curated) set. */
export const carbonIconCount = Object.keys(icons).length;

/** All available icon names, sorted. Useful for a documentation/icon-picker page. */
export function listCarbonIconNames(): string[] {
  return Object.keys(icons).sort();
}
