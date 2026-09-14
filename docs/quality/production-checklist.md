# BENCH Production Checklist

Every component must have: typed public API, native semantics where possible, keyboard behavior, focus-visible behavior, accessible name/description, disabled/loading/error states where applicable, unit tests, accessibility tests, Storybook states, responsive visual coverage, and documented events/methods.

## Form controls
- Preserve native HTML semantics.
- Keep `name`, `value`, `required`, `disabled`, and `readonly` meaningful.
- Expose `focus()` when a control has a focus target.
- Emit `bchInput` for live edits and `bchChange` for committed changes.
- Never use visual text alone to communicate an error; expose it through ARIA.

## Visual regression
Required viewports: 320x800, 375x812, 768x1024, 1440x900.
Required themes: light and dark.
Required states: default, hover, focus, active, disabled, loading, error where applicable.

## Framework adapters
Adapters must contain no component logic. They only provide framework-friendly typing/registration. The source of truth remains `@bench/components`.
