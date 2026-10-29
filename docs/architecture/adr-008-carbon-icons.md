# ADR-008: Icon set migrates from Tabler to Carbon, with a documented interim coverage gap

Estado: aceptado

## Context

Bench's design system (`bench-design-system.md` §2.8) standardizes on **Carbon
Icons** rather than Tabler, Phosphor, or a hand-drawn set, for a specific
reason that is not aesthetic preference: Carbon is the same design lineage as
Bench's typography (IBM Plex, §2.7) — both come from the Carbon Design System,
the same tradition of dense, operational, enterprise-workstation software that
motivates Bench end to end (AS/400, OS/2 Warp — see `docs/foundations/README.md`
"Why Bench exists"). Phosphor was evaluated and rejected specifically because
its six selectable stroke weights are a structural invitation to the exact
inconsistency Rule 8 (line-style semantics) exists to prevent: two teams
picking different weights without anyone deciding to allow that.

This is the second time this package has had to decide how much icon coverage
to ship. **ADR-007** documents the first time: `tabler.ts` originally
hand-authored ~20 icons as inline SVG, silently returning nothing for any
other name, until the full ~5,100-icon Tabler dataset replaced that subset.
That ADR's lesson — a silent, undocumented, hand-picked subset is a trap, not
a shortcut — applies directly here, which is why this ADR exists instead of
quietly swapping `tabler.ts` for an equally-sized `carbon.ts` and calling it
done.

## Decision

1. `@bench/icons` now resolves against **Carbon** icon data
   (`src/data/carbon-outline.json`) instead of Tabler's. `<bch-icon>`'s
   render contract changed accordingly (`bch-icon.tsx`, `icon.css`): the root
   `<svg>` no longer hardcodes `viewBox="0 0 24 24"` and
   `fill="none" stroke="currentColor"` — Carbon's grid is 32×32, and most
   Carbon glyphs are filled/optically-corrected shapes, not uniform strokes
   (§2.8 "formas mixtas"). Individual nodes now carry their own
   `fill`/`stroke`/`fill-rule` attributes.
2. The data file is generated at build time from the official `@carbon/icons`
   npm package (`tooling/icons/generate.mjs`, devDependency in `@bench/icons`).
   Generation is name-curated: every `<bch-icon name="…">` usage in the repo
   plus Bench's public alias table (`BENCH_NAME_TO_CARBON`) is resolved against
   Carbon metadata and emitted in the [tag, attributes] node format.
   Both `carbon-outline.json` and `icon-names.ts` are emitted from the same
   dataset, making the type union authoritative.
3. Development affordance: `resolveCarbonIcon` logs a dev-only warning when a
   name is absent from the generated set, guiding the developer to run
   `pnpm icons:generate`. Production remains silent (no runtime errors).
4. Consistency check `tooling/validation/icon-consistency.mjs` is part of
   `pnpm check` to prevent drift between the data file and the type union.

## Why not just ship the full Carbon dataset now

The full dataset requires generating `carbon-outline.json` from the real
`@carbon/icons` npm package at build time — the same mechanism ADR-007 used
for `tabler-outline.json` (never hand-typing 2,200 icons' path data). That
generation step is tracked as the direct follow-up to this ADR. Shipping a
plausible-looking but unverified 2,200-entry JSON file authored without the
real package in hand would reintroduce exactly the failure mode ADR-007
fixed — icons that look present in the type system but silently render
nothing — except at 2,200-icon scale instead of 20. A small, honestly-labeled
gap is safer than a large, falsely-confident one.

## Consequences

- `resolveCarbonIcon(name)` returns `undefined` for any name not in the generated set; in development it now emits a console warning (dev-only) guiding to `pnpm icons:generate`. This closes the silent-failure gap of the interim curated set.
- Icon data is generated from the official `@carbon/icons` package via `tooling/icons/generate.mjs` (`pnpm icons:generate`). The generator curates names referenced in the repo + Bench-era alias table (`BENCH_NAME_TO_CARBON`), resolving each against Carbon metadata, and emits BOTH `src/data/carbon-outline.json` and `src/icon-names.ts` from the same dataset.
- Consistency is enforced by `tooling/validation/icon-consistency.mjs` (added to `pnpm check`). `icon-names.ts` can no longer diverge from the data file; any manual edit fails `pnpm check`.
- The public alias table documents Bench’s legacy names (`chevron-down`, `bell`, `check`, `inbox`, …) mapped to Carbon assets (`chevron--down`, `notification`, `checkmark`, `email`, …). Consumers keep the Bench API surface; the data layer is pure Carbon.
- Follow-up work originally tracked here is now closed: `@carbon/icons` is a devDependency of `@bench/icons`, generation script exists, and `icon-names.ts` is regenerated from the same source as the data file.
- Third-party attribution for `@carbon/icons` (Apache License 2.0) lives in `packages/icons/THIRD_PARTY_NOTICES.md`, alongside the retained (superseded) Tabler notice for traceability.
