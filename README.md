# Bench Design System

_(Bench, short for "Workbench" — the surface where someone who's mastered a
craft keeps their tools exactly where they need them, every day, for years.
Built for the person who has this software open 8 hours a day, not the
person opening it for the first time. Full philosophy and the 9 inviolable
rules: [`docs/bench-design-system.md`](./docs/bench-design-system.md).)_

Bench is a design system built from scratch with Stencil, TypeScript and Web
Components. Everything in it — colors, the 4-level border scale, elevation,
motion timing, typography, iconography — exists to answer a specific,
documented problem a power user actually has, not an aesthetic preference.
See `docs/bench-design-system.md` §0.1 for the full problem→rule mapping.

## Principles

- STRATA is used only as a repository-organization reference.
- No STRATA component logic, tokens, visual rules, APIs or behavior are
  inherited. Bench's own visual DNA — colors, the border/elevation scales,
  motion bands, typography — comes from `bench-design-system.md`, not from
  STRATA.
- Carbon Icons is the only icon family used by Bench, for the same design
  lineage as its typography (IBM Plex) — see
  `docs/architecture/adr-008-carbon-icons.md` for the migration record and
  current (intentionally partial, honestly documented) coverage.
- `bch-icon` has a deliberately minimal API: `name` and `aria-label`.
- Native HTML semantics are preferred over custom behavior.
- Components are framework-agnostic; React, Vue and Angular are adapters only.
- No business logic belongs in Bench.

## The 9 inviolable rules, briefly

Category A (negotiable only through a documented exception): every function
reachable by click/focus, not just a shortcut · no state is only momentary if
it changes what the next action means · edits show before confirmation is
asked, blocking confirmation only for the truly irreversible · one component,
one behavior, everywhere · no two surfaces fight over the same gesture ·
density/theme/open-behavior are configurable, never hardcoded.

Category B (authorial, non-negotiable): the border scale (Rule 7), line-style
semantics — solid/dashed/double/triple (Rule 8), and elevation/material
following real convention, never an invented shadow or blur (Rule 9).

Full text, rationale, and token values: `docs/bench-design-system.md` §1–2.

## Packages

- `@bench/tokens` — design tokens and themes.
- `@bench/foundation` — shared DOM, focus and accessibility utilities.
- `@bench/primitives` — small layout/surface primitives.
- `@bench/icons` — the Carbon icon data used by `bch-icon`.
- `@bench/components` — canonical Web Components.
- `@bench/testing` — visual and accessibility test infrastructure.

## Icon usage

```html
<bch-icon name="search"></bch-icon>
```

Accessible icon:

```html
<bch-icon name="search" aria-label="Search"></bch-icon>
```

No other icon provider is supported. Current coverage is a curated subset,
not Carbon's full catalog — see `docs/architecture/adr-008-carbon-icons.md`.

## Quality gate

```bash
pnpm install
pnpm check
pnpm test:visual
```

Visual baselines cover 320×800, 375×812, 768×1024 and 1440×900.

## Showcase

Run the product-like Bench showcase with:

```bash
pnpm showcase
```

Build it with:

```bash
pnpm build:showcase
```

The showcase is intentionally domain-agnostic: it demonstrates the design
system without introducing business logic.

## Reference material

- [`docs/bench-design-system.md`](./docs/bench-design-system.md) — the full
  specification (unchanged, cited as-is).
- [`docs/demos/`](./docs/demos/) — six executable HTML reference demos (open
  directly in a browser, no build step) covering the omnibar/command
  pattern, tiling layout, data-at-scale + persistence, generic components
  (tree/accordion/offcanvas/modal), a second domain context (wallet/ledger),
  and authentication/long-session handling.
