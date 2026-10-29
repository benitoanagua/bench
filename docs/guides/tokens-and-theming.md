# Tokens and theming

Every visual decision in Bench comes from a CSS custom property in
`packages/tokens/src/tokens.css` (primitives and semantic aliases) or
`themes.css` (light/dark values). Component CSS must not hard-code colors,
spacing, radii, borders, shadows or motion durations.

## Three layers

1. **Primitive** — raw scales: neutral colors, spacing, radii, type, motion.
2. **Semantic** — intent: `--bch-color-surface`, `--bch-color-text`,
   `--bch-color-danger`, `--bch-state-active`, and the opt-in financial pair
   (`risk` / `security`).
3. **Component** — only when no semantic token expresses the decision. Extend
   the semantic layer instead of adding a one-off value.

Full inventory and rationale: [foundations/tokens.md](../foundations/tokens.md).

## Themes

`themes.css` defines a complete set of values per theme. Surfaces, borders and
soft state colors are authored twice on purpose; dark mode is not an opacity
trick over light mode.

```css
:root,
[data-bch-theme='light'] {
  --bch-color-surface: var(--bch-color-neutral-0);
  --bch-color-text: var(--bch-color-neutral-900);
}

[data-bch-theme='dark'] {
  --bch-color-surface: #171c21;
  --bch-color-text: #e8ebee;
}
```

Change the theme by setting the attribute on a container (usually `<html>`).
Components consume the tokens, so no component needs a theme prop:

```ts
document.documentElement.setAttribute('data-bch-theme', 'dark');
```

## Density

Density is a preference, not a component prop. It changes the
`--bch-density-*` values that data-heavy components read:

```html
<html data-bch-density="compact">
  <!-- dense chrome -->
  <section data-bch-density="comfortable" data-bch-panel="raw-data">
    <!-- terminal density requires both attributes -->
  </section>
</html>
```

```ts
import {
  getDensityPreference,
  setDensity,
  installDensityObserver,
  type BchDensityPreference,
} from '@bench/foundation';

setDensity(getDensityPreference());
const stop = installDensityObserver();
```

The preference persists in `localStorage` under `bch-density`. It is the one
documented storage exception in the library because it stores a UI preference
string, never domain data.

## Focus and state

- `--bch-focus-width` + `--bch-focus-color` drive the outline used by controls.
- `--bch-focus-ring` is the box-shadow alternative for surfaces that cannot use
  an outline (for example, a ring clipped by `overflow: hidden`).
- `--bch-state-active` is a theme-aware mix. Use it instead of inventing a hover color.
  instead of inventing a hover color.
- `--bch-color-border-floating`, `--bch-radius-xl` and `--bch-elev-*` encode
  the fourth border/elevation level for modals and floating cards.

## Rules of thumb

- Style with `var(--bch-*)`; a literal color in component CSS is a review
  failure.
- Do not read token values from JavaScript unless you must; import
  `breakpoints` for media-query math rather than parsing CSS.
- New tokens require a spec justification and a row in the token inventory.
  Run `pnpm check:tokens` to catch references to tokens that were never
  defined.
