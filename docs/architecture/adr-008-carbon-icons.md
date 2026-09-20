# ADR-008: Icon set migrates from Tabler to Carbon, with a documented interim coverage gap

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
2. Unlike the Tabler end-state, **this migration ships with a known,
   documented coverage gap, on purpose**: `carbon-outline.json` currently
   contains ~54 icons — the set verified, one by one, across the six Bench
   reference demos **and** every icon name actually referenced by
   `apps/showcase` in this repository — not
   Carbon's full ~2,200-icon catalog.
3. The gap is disclosed in three places that a consumer is likely to actually
   read before filing a confused bug report: `THIRD_PARTY_NOTICES.md`,
   `README.md`, and a migration-note comment at the top of `icon-names.ts`
   (whose ~180-name autocomplete union is inherited from the Tabler era and is
   **not** yet verified against real Carbon names beyond the curated ~54).

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

- `resolveCarbonIcon(name)` returns `undefined` (no error, no console warning)
  for any Carbon-valid name outside the curated ~54 — identical failure mode
  to the pre-ADR-007 Tabler behavior, reintroduced on purpose and with the
  cause documented, not hidden.
- Product teams building on Bench today should treat the icon registry as
  "the ~54 names in `carbon-outline.json`" until the follow-up lands, not as
  "anything Carbon ships."
- Follow-up work (tracked, not yet scheduled): add `@carbon/icons` as an
  actual resolved build-time dependency, write the generation script
  (mirroring the removed Tabler one), regenerate `carbon-outline.json` from
  it, and re-verify `icon-names.ts`'s autocomplete union name-by-name against
  the real Carbon catalog rather than carrying it over from Tabler
  unexamined.
- Third-party attribution for `@carbon/icons` (Apache License 2.0) lives in
  `packages/icons/THIRD_PARTY_NOTICES.md`, alongside the retained (superseded)
  Tabler notice for traceability.
