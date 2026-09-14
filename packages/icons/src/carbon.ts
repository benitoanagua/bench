import iconData from './data/carbon-outline.json';
import type { CarbonIconName } from './icon-names';

export type { CarbonIconName, CommonCarbonIconName } from './icon-names';

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
 * Honesty note (see docs/architecture/adr-008-carbon-icons.md): as of this
 * migration, `src/data/carbon-outline.json` ships a curated subset (~25
 * icons — the set verified across the Bench reference demos and every icon
 * name actually used by `apps/showcase` in this repository)
 * rather than Carbon's full ~2,200-icon catalog. This is a DELIBERATE,
 * TEMPORARY, and DOCUMENTED gap, not a repeat of the mistake ADR-007 already
 * corrected once (a silent, undocumented hand-authored subset). Regenerating
 * this file from the real `@carbon/icons` package to reach full coverage is
 * tracked as the direct follow-up to this ADR — until then, `bch-icon` will
 * render nothing (no error) for any Carbon-valid name outside the curated
 * set, exactly like the pre-ADR-007 Tabler behavior this migration
 * temporarily reintroduces on purpose, with the cause documented instead of
 * hidden.
 */
const icons = iconData as unknown as Record<string, readonly CarbonNode[]>;

export function resolveCarbonIcon(name: string): readonly CarbonNode[] | undefined {
  const normalized = name.trim().toLowerCase();
  return icons[normalized];
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
