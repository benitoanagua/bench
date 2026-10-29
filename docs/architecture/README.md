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

## Public API rules

Prefer semantic HTML, slots, typed properties, and typed custom events. Do not expose implementation dependencies or internal CSS class names as public contracts.
