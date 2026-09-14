# BENCH accessibility contracts

BENCH prefers native HTML semantics. ARIA is added only when native semantics cannot express the behavior.

## Forms

- Labels must be programmatically associated with controls.
- Hint and error content must be referenced with `aria-describedby` when present.
- Invalid controls expose `aria-invalid="true"`.
- Required state uses native `required` when available.

## Actions

- Buttons use native `<button>`.
- Icon-only buttons require an accessible label.
- Loading controls are disabled and expose `aria-busy="true"`.
- Focus is always visible with `:focus-visible`.

## Overlays

- Dialogs use native `<dialog>` where supported.
- Dialog titles are referenced with `aria-labelledby`.
- Escape closes dialogs unless explicitly disabled.
- Focus returns to the previously focused element after close.
- Drawers expose dialog semantics and a modal scrim.

## Navigation and disclosure

- Navigation uses links for navigation and buttons for actions.
- Tabs expose `role="tablist"`, `role="tab"`, and `aria-selected`.
- Accordion triggers expose `aria-expanded` and `aria-controls`.
