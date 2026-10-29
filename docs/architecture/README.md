# BENCH Architecture

BENCH is an independent design system.

## Layers

`tokens → foundation → components`

Dependencies must point downward in this diagram only. Application/domain code does not belong in BENCH.

## Runtime

- Stencil + TypeScript
- Native Web Components / Custom Elements
- Light DOM by default
- Shadow DOM only when an explicit component contract requires isolation
- CSS custom properties for theming
- Carbon Icons used exclusively through the BENCH `bch-icon` API

## Icon boundary

`@bench/icons` owns the icon registry. `@bench/components` owns the `bch-icon` Web Component. Public consumers should use `bch-icon` and must not couple application code to the icon registry internals.

Carbon Icons are rendered as inline SVG nodes so BENCH does not require a runtime icon web-component dependency.

## ADRs

Every decision record states its status on the first line after the title.

| ADR                                        | Title                                          | Status           |
| ------------------------------------------ | ---------------------------------------------- | ---------------- |
| [001](./adr-001-independence.md)           | BENCH independence                             | aceptado         |
| [002](./adr-002-framework-integrations.md) | Framework integrations are adapters            | aceptado         |
| [007](./adr-007-icon-coverage.md)          | Full icon dataset, not a hand-authored subset  | superado por 008 |
| [008](./adr-008-carbon-icons.md)           | Carbon icons with a documented coverage gap    | aceptado         |
| [009](./adr-009-catalog-scope.md)          | Scope classification: library / helper / guide | aceptado         |
| [010](./adr-010-typography-layers.md)      | Two-layer type scale and `@bench/fonts`        | aceptado         |

Numbers 003–006 were never issued. The gap is preserved deliberately: ADR
numbers are permanent identifiers referenced from code and docs, so reusing a
missing number would silently change the meaning of older references.

## Public API rules

Prefer semantic HTML, slots, typed properties, and typed custom events. Do not expose implementation dependencies or internal CSS class names as public contracts.
