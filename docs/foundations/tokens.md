# Bench Foundations & Tokens

Bench tokens are authored independently. They are not copied from STRATA.
Full rationale and exact values live in
[`bench-design-system.md` §2](../bench-design-system.md) — this page maps
that specification onto the actual CSS custom properties in
`packages/tokens/src/tokens.css` and `themes.css`.

## Token hierarchy

1. **Primitive** — raw scales: neutral colors, spacing, radii, typography, motion.
2. **Semantic** — intent: background, surface, text, border, action/primary,
   success, warning, danger, pending, and the opt-in financial-extension pair
   (risk/security).
3. **Component** — local component decisions only when semantic tokens are
   insufficient. Prefer extending a semantic token over hardcoding a
   component-local value — see the "no hardcoded values" audit note below.

Tokens are CSS custom properties and should be consumed, never hard-coded,
inside component styles.

## Border scale — 4 levels, never a 5th value (Rule 7)

Smaller element → thinner, more subtle border, smaller radius. Larger element
→ thicker, darker border, larger radius. No component introduces a
border-width or radius outside this table.

| Level | Token | Width | Radius | Example |
|---|---|---|---|---|
| 1 — Micro | `--bch-color-border-micro`, `--bch-radius-sm` | 1px | 1px | badges, chips, checkboxes |
| 2 — Control | `--bch-color-border-control`, `--bch-radius-md` | 1px | 2px | inputs, buttons, grid cells |
| 3 — Container | `--bch-color-border-container`, `--bch-radius-lg` | 1.5px | 4px | panels, cards, toolbars |
| 4 — Floating | `--bch-color-border-floating`, `--bch-radius-xl` | 2px | 6px | floating cards, modals |

`--bch-radius-pill` (999px) is the one documented exception: status badges
are intentionally pill-shaped, which doesn't contradict the proportionality
rule because a pill isn't a rectangular container being judged against it.
`--bch-color-border` / `--bch-color-border-strong` remain as backward-compatible
aliases for levels 1 and 2 — existing component CSS referencing them by the
old two-level names keeps working unchanged.

## Line-style semantics (Rule 8)

| Style | Meaning | Where |
|---|---|---|
| Solid (default) | Confirmed / persisted state | everywhere, by default |
| Dashed | Provisional, not yet confirmed | a cell mid-edit, a just-duplicated record |
| Double | Closing / totalization boundary | a totals row, a closing summary |
| Triple | Real irreversible confirmation — the system's loudest signal, used almost never on purpose | permanent-delete confirmation |

There is no CSS custom property for "triple border" by itself — it's always
paired with `--bch-shadow-critical` (elevation §below), because in Bench the
border and the shadow escalate together, never separately.

**Reference implementation:** `bch-dialog`'s `tone="critical"` prop
(`packages/components/src/components/dialog.tsx`/`.css`) is the first real
component wiring this — `.dialog--critical` applies
`var(--bch-border-width-floating) solid var(--bch-color-danger)` +
`var(--bch-shadow-critical)` together. Any new "are you sure" flow for a
genuinely irreversible action should reach for this prop rather than
reintroducing the escalation ad hoc.

## Elevation — 4 levels, double-shadow technique (Rule 9)

```css
--bch-elev-0: none;
--bch-elev-1: 0 1px 3px rgb(15 20 25 / .10), 0 1px 2px rgb(15 20 25 / .06);
--bch-elev-2: 0 6px 16px rgb(15 20 25 / .16), 0 2px 4px rgb(15 20 25 / .08);
--bch-elev-3: 0 12px 32px rgb(15 20 25 / .24), 0 0 0 1px var(--bch-color-danger);
```

`--bch-shadow-sm/md/lg` are the pre-existing component-facing aliases, mapped
faithfully to Bench's real elevation model rather than to "small/medium/large
= arbitrary bigger shadow": `shadow-sm` is `elev-1` (cards, tiles),
`shadow-md` **and** `shadow-lg` both resolve to `elev-2`, because Bench does
not distinguish "a modal" from "a menu" by elevation — both are floating
surfaces of the same level. `--bch-shadow-critical` is the new, separate
token for `elev-3`, reserved for the same irreversible-confirmation moments
that trigger the triple border above — never used for "this dialog feels
important."

## Material — maximum two (§2.6)

- `--bch-material-acento-bg` + `--bch-material-acento-blur`: the one
  translucent material, reserved for non-editable informational overlays
  (a live price/data tooltip). Never applied to a surface with editable data —
  transparency there creates real ambiguity about what's interactive.
- Everything else is the solid base material (a plain `--bch-color-surface`
  background) — the default, not an exception.

## Typography (§2.7)

`--bch-font-family-sans` / `-mono` resolve to IBM Plex Sans/Mono with a
dimensioned `Fallback` family (`ascent-override`/`descent-override`/
`size-adjust`, declared in `styles/global.css`) so a dense grid doesn't
visibly reflow when the real webfont finishes loading. Bench self-hosts these
— the consuming application is expected to ship the actual `.woff2` files
(ideally the variable-font build covering the full weight range); this
package only ships the fallback `@font-face` rules and the token names, on
the same "never a third-party CDN in runtime" principle already applied to
iconography (§2.8).

**Weight rule:** only 400 and 600 are used anywhere in Bench. The
`--bch-font-weight-medium` / `-semibold` / `-bold` tokens all resolve to
`600` — three semantic names kept for component-API stability, one real
value, so no component had to be rewritten to obey the rule.

## Motion (§2.5)

```css
--bch-motion-fast: 80ms;      /* hover/focus */
--bch-motion-normal: 180ms;   /* confirmation flash */
--bch-motion-panel: 140ms;    /* panel/modal open */
--bch-motion-badge: 220ms;    /* badge/status color cross-fade */
--bch-motion-slow: 300ms;     /* ceiling: streaming-data highlight */
```

Nothing that represents a **discrete state change** animates for longer than
`--bch-motion-slow`, and those five tokens collapse to `0ms` under
`prefers-reduced-motion: reduce`.

**Continuous/infinite animations are a separate category**, not covered by
`bench-design-system.md`'s original motion table (which is explicitly about
one-shot transitions, not loops): `--bch-motion-loop` (1.4s) is the one
token shared by every `infinite` animation in the system — spinner rotation,
skeleton shimmer, indeterminate progress. Before this token existed, each of
those three improvised its own value independently (one of them, the
spinner, was actively wrong — reusing `--bch-motion-normal` made it spin
more than five times a second). `--bch-motion-loop` deliberately does **not**
collapse to `0ms` under reduced motion — an `infinite` animation with a
`0ms` duration doesn't cleanly stop, it can still fire per-frame. Each
consumer disables its own loop instead, the idiomatic way for its case:
`spinner`/`progress` wrap the rule in an explicit
`@media (prefers-reduced-motion: reduce) { animation: none; }`; `skeleton`
wraps the animation declaration itself in
`@media (prefers-reduced-motion: no-preference)` so it simply never applies
under reduced motion. Both are correct; pick whichever reads more clearly
for the component at hand.

## Density (§2.9)

`--bch-density-*` tokens (row height, cell padding, data/UI font size) default
to the "comfortable" mode in `:root`. `[data-bch-density="compact"]` and
`[data-bch-density="spacious"]` variants are wired in `tokens.css` and can be
applied on any container — the app root, or a single dense panel. The
terminal variant requires **both** `[data-bch-density="terminal"]` **and**
`[data-bch-panel="raw-data"]` on the same element — a single attribute is
not enough on purpose, so a monospaced dark panel never becomes a whole
screen's theme by accident (§4.4). Individual components consuming these
tokens for row height/padding (grid, list, table-like components) is tracked
per-component, not blocked on the token layer being ready — the tokens are
the contract those components should read from as they adopt density.

## Financial extension (§2.10, opt-in)

`--bch-color-risk` / `--bch-color-risk-soft` and `--bch-color-security` /
`--bch-color-security-soft` exist as tokens everywhere, but are a
**by-convention opt-in** — a module wires them in only if it shows a
persisted balance that changes state, writes to a real ledger/transaction, or
needs two-step confirmation because a misread number has direct monetary
consequence. Reporting/read-only screens don't reach for these even if they
display numbers — see `bench-design-system.md` §2.10 for the exact
qualification test.
