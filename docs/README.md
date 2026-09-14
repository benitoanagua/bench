# Bench documentation

Bench is an independent design system implemented with Stencil and Web
Components.

STRATA is referenced only for repository-organization ideas. No STRATA
visual language, tokens, component logic, APIs, or behavior are inherited.

## Start here

- [`bench-design-system.md`](./bench-design-system.md) — the full, normative
  specification: philosophy, the 9 inviolable rules, every design token,
  the complete pattern catalog, and the research this all traces back to
  (Solaris CDE, Mac OS Classic, NeXTSTEP, HyperCard, Oracle EBS, SAP, AS/400).
  Kept exactly as delivered — reference material, not adapted per-package.
- [`demos/`](./demos/) — the six executable HTML demos that document was
  validated against. Open any of them directly in a browser; no build step.
  See the spec's own trazabilidad table (§4.10) for which demo exercises
  which pattern.

## Documentation areas

- `architecture` — including ADR-007 and ADR-008 (icon-set history: Tabler →
  Carbon, and why that migration shipped with an honestly-documented
  coverage gap instead of a silent one).
- `foundations` — Bench's philosophy, tokens, and visual system, mapped onto
  this repository's actual CSS/TS (`tokens.md`, `visual-system.md`).
- `components`
- `accessibility`
- `visual regression`
- `framework integrations`

## Showcase

The repository includes `apps/showcase`, a small product-like surface built
exclusively from Bench Web Components. It is the reference application for
composition, responsive behavior, forms, navigation, overlays, themes, and
visual consistency.
