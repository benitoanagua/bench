# Bench Foundations

The single normative source for everything below — philosophy, the 9
inviolable rules, and every token value — is
[`docs/bench-design-system.md`](../bench-design-system.md). These
foundations pages are an orientation layer on top of that document, scoped to
how this specific component library implements it; when the two disagree,
`bench-design-system.md` wins and this page is the one that's out of date.

## Why Bench exists

Bench is built for the person who has this software open 8 hours a day, not
the person opening it for the first time. Every rule below exists to solve a
specific, real problem that person has — not an abstract aesthetic
preference (`bench-design-system.md` §0.1):

| Problem                                                                                        | Where Bench answers it                                  |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Repeats the same task hundreds of times a day — any friction multiplies                        | Rules 1–2, omnibar/command patterns, macros             |
| Muscle memory is the most valuable asset a dense UI has, and inconsistency destroys it         | Rule 4, the border/line-style scales (§2.2–2.3)         |
| Can't afford to lose work to an app, browser, or personal error                                | Rule 3, visible undo history, full-state persistence    |
| Works with financial/operational data where a misread number costs money                       | Financial extension (§2.10)                             |
| Scans hundreds of rows an hour — decorative animation is accumulated friction                  | Motion with purpose (§2.5), configurable density (§2.9) |
| Already invested time learning this tool — an unmotivated behavior change costs that time back | Rule 9 and the visual layer (convention, never a whim)  |

## Foundation areas

- **Color** — Bench semantic color tokens (`tokens.css`), including the
  opt-in financial extension (`--bch-color-risk` / `--bch-color-security`).
- **Border & elevation** — the 4-level border scale and the 4-level elevation
  scale (Rules 7 and 9) — see `tokens.md`.
- **Line-style semantics** — solid/dashed/double/triple, each tied to one
  state, never to taste (Rule 8) — see `tokens.md`.
- **Typography** — IBM Plex Sans/Mono, self-hosted, with a dimensioned
  fallback so the fonts loading in doesn't reflow a dense grid — see
  `tokens.md`.
- **Motion** — named bands (80/140/180/220/300ms), never an invented
  duration — see `visual-system.md`.
- **Density & viewport** — compact/comfortable/spacious/terminal, plus
  conventional breakpoints (Rule 6) — see `visual-system.md`.
- **Iconography** — Carbon Icons behind the Bench `bch-icon` boundary (see
  `docs/architecture/adr-008-carbon-icons.md` for the current coverage
  status — it's an honest, documented subset, not the full catalog yet).

## Reference material (unchanged, cited as-is)

- [`docs/bench-design-system.md`](../bench-design-system.md) — the full
  normative specification.
- [`docs/demos/`](../demos/) — the six executable HTML reference demos this
  design system was validated against, kept exactly as delivered.
