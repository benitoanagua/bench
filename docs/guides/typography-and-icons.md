# Typography and icons

## Type families

Bench uses IBM Plex Sans for UI and IBM Plex Mono for data, both self-hosted.
`@bench/fonts` copies the official woff2 files from `@ibm/plex-sans` and
`@ibm/plex-mono` and generates `fonts.css` with dimensioned fallbacks.

```bash
pnpm fonts:build
```

```ts
import '@bench/fonts/fonts.css';
```

The fallback families (`IBM Plex Sans Fallback`, `IBM Plex Mono Fallback`) set
`ascent-override`, `descent-override` and `size-adjust` so a dense grid does
not reflow when the real font arrives. Never load fonts from a CDN at runtime.

## Two typographic layers

- **Dense chrome** — grids, toolbars, forms, menus. Use
  `--bch-density-fs-data` (13px) and `--bch-density-fs-ui` (13px), plus
  `--bch-density-row-height`, `--bch-density-cell-py` and
  `--bch-density-cell-px`.
- **Product content** — onboarding, empty/error heroes, editorial pages. Use
  the `--bch-type-*` roles (`display`, `h1`–`h4`, `body-lg/md/sm`, `label`,
  `caption`, `overline`).

Do not use `--bch-type-display` inside a data grid, and do not use density
sizes for long-form content. See
[ADR-010](../architecture/adr-010-typography-layers.md).

## Weights and tracking

Only weights 400 and 600 are used. `--bch-font-weight-medium`,
`-semibold` and `-bold` all resolve to 600 so existing component APIs stay
stable.

Tracking is applied by role:

```css
--bch-tracking-body: 0.16px; /* UI text at 14–16px */
--bch-tracking-mono: 0.32px; /* monospaced data at ~12px */
```

`--bch-letter-spacing-overline` is reserved for uppercase labels such as mode
badges and column overlines.

## Icons

Use `bch-icon` with a Carbon name. The icon component renders inline SVG and
defaults to `currentColor`:

```html
<bch-icon name="search"></bch-icon> <bch-icon name="warning" aria-label="Warning"></bch-icon>
```

- Decorative icons are `aria-hidden` automatically. Pass `aria-label` only when
  the icon is the sole label; otherwise label the interactive parent.
- Icon-only actions use `bch-icon-button`, which requires a `label`:

```html
<bch-icon-button name="settings" label="Settings"></bch-icon-button>
```

The repository ships a curated Carbon subset, not the full catalogue. Adding an
icon is a generation step, never hand-authored path data:

```bash
pnpm icons:generate
pnpm check:icons
pnpm check:icons-consistency
```

See [ADR-008](../architecture/adr-008-carbon-icons.md) and the
[component matrix](../components/component-matrix.md).
