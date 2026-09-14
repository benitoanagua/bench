# @bench/icons

Bench uses **Carbon Icons exclusively** (bench-design-system.md §2.8) — the
same design lineage as Bench's typography (IBM Plex), chosen for that
continuity rather than for its own sake. See
`docs/architecture/adr-008-carbon-icons.md` for the migration record and
`THIRD_PARTY_NOTICES.md` for attribution.

The public API is intentionally small. Components consume `bch-icon` with a
Carbon icon name. No provider abstraction, aliases, fallback collections, or
alternate icon families are supported.

```html
<bch-icon name="search"></bch-icon>
```

**Coverage note:** the registry currently resolves a curated ~40-icon subset —
exactly the icons used across the six reference demos in `docs/demos/` — not
Carbon's full ~2,200-icon catalog. `resolveCarbonIcon()` / `isCarbonIconName()`
return `undefined` / `false` for any Carbon-valid name outside that subset, with
no error. This is a deliberate, documented, temporary gap — not the silent
hand-authored-subset mistake ADR-007 already corrected once for Tabler. New
icons must be sourced from Carbon's own SVG data and added to
`src/data/carbon-outline.json` with their official path/shape data (fill-based
for filled Carbon glyphs, stroke-based only where Carbon itself draws that
glyph with a stroke — see `carbon.ts`'s `CarbonNode` type).
