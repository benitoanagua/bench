# Bench Visual System

Bench is designed independently from STRATA. Full rationale lives in
[`bench-design-system.md`](../bench-design-system.md); this page is the
implementation-facing summary for this component library.

## Principles (from the 9 inviolable rules)

Category A — UX principles, negotiable only through documented exception:

- Every executable function has a click/focus path, independent of any
  shortcut.
- No state is only momentary if it affects how the next action is
  interpreted — an armed leader-key sequence, a live filter, a recording
  macro all need a persistent indicator, not just a toast that fades.
- Edits reflect in the UI _before_ confirmation is requested; blocking
  confirmation is reserved for the genuinely irreversible.
- One component type = one interaction definition, everywhere it appears —
  a component never behaves differently because of which screen it's on.
- No interactive surface competes for the same gesture ambiguously — not with
  another Bench component, and not with the browser's own UI.
- Density, theme, and open-behavior are configurable, never hardcoded in a
  component — and respond to viewport breakpoints (640/768/1024/1280/1536px),
  not ad hoc ones.

Category B — visual rules, authorial and non-negotiable:

- Border proportionality: 4 levels, never a 5th value (`tokens.md`).
- Line-style semantics: solid/dashed/double/triple, each tied to one state.
- Elevation and material follow standard convention (double-shadow
  technique, max two materials) — never an invented shadow or blur value.

## Responsive strategy

Prefer container-aware composition and fluid sizing. Use the six
conventional viewport breakpoints only for layout decisions that genuinely
depend on the viewport — never a one-off number picked for a single
component. Below 768px, multi-panel layouts collapse to a single column
**without hiding any function** — the click/focus-path rule above holds even
under space pressure.

## States

Interactive components must define default, hover, active, focus-visible,
disabled, and loading/error states where applicable. Hover/active change
luminosity ±6–8% (`--bch-state-hover` / `--bch-state-active`) — never a
different color family.

## Focus

Focus is always visible for keyboard users, using
`--bch-focus-ring`/`--bch-focus-width`. Focus traps are reserved for true
blocking modals — a docked or floating non-modal panel never traps focus,
`Tab` always escapes it.

## Motion

Motion communicates a real state change; it never decorates. Named bands
only (`tokens.md` §Motion) — 80/140/180/220/300ms, nothing invented, nothing
above 300ms. `prefers-reduced-motion` collapses every duration to 0ms.

## Themes

Light and dark themes use the same semantic token names
(`packages/tokens/src/themes.css`). Dark mode is a first-class theme with its
own surface, border, and "soft" state-color values — not an automatic filter
applied to the light palette (a soft-tinted badge that looks right on white
looks muddy on a dark surface at the same opacity).

## Touch

Interactive targets should normally provide at least a 44px effective hit
area even when their visual glyph is smaller — this doesn't conflict with
Bench's dense, keyboard-first origin: the compact/comfortable/spacious
density modes (`tokens.md` §Density) are exactly the mechanism for a control
to be visually tight for a mouse/keyboard power user and still meet a real
tap target once density responds to a touch viewport.
