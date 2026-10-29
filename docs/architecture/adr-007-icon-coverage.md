# ADR-007: Icon set resolves against the full Tabler outline data, not a hand-authored subset

Estado: superado por ADR-008

## Context

`@bench/icons` hand-authored ~20 icons as inline SVG node arrays in `tabler.ts`,
even though `@tabler/icons` (the full ~5,100-icon set) was already a `devDependency`.
Any icon name outside that hand-authored list resolved to `undefined` and rendered
nothing, with no error — a silent failure that only surfaced when someone tried an
icon like `name="add"` that "should" exist but wasn't in the 20 hand-picked names.

## Decision

`@bench/icons` now ships the full Tabler outline dataset (`src/data/tabler-outline.json`,
generated from `@tabler/icons`'s own `tabler-nodes-outline.json`) and resolves icon names
against it directly, instead of maintaining a hand-authored subset. `<bch-icon>` therefore
supports ~5,100 icon names out of the box.

For editor ergonomics, `TablerIconName` is a curated ~180-name autocomplete union
(`CommonTablerIconName`) combined with a `(string & {})` escape hatch, so TypeScript still
suggests common names but never rejects a valid Tabler name that isn't in the curated list.

## Consequences

- `resolveTablerIcon('add')`-style lookups now only fail for names that genuinely don't
  exist in Tabler, not because of an arbitrary hand-authored cutoff.
- The dataset adds ~1.2MB to `@bench/icons`'s source/dist. This is a deliberate
  trade-off: consuming apps that care about bundle size should use `<bch-icon>` via the
  Web Component (which resolves at runtime from one shared module, so the dataset is
  loaded once, not per-icon), or a future tree-shakeable per-icon entry point (tracked
  as follow-up work, see `docs/foundations/icons.md`).
- Third-party attribution for `@tabler/icons` (MIT License) lives in
  `packages/icons/THIRD_PARTY_NOTICES.md`.

## Update (see ADR-008)

The icon _set_ documented here (Tabler) has since been replaced by Carbon —
see `docs/architecture/adr-008-carbon-icons.md`. The architectural lesson
this ADR records (resolve against the real, full dataset; never a silent
hand-authored subset) is exactly the principle ADR-008 had to explicitly
choose to _temporarily_ set aside, on the record, rather than repeat quietly.
