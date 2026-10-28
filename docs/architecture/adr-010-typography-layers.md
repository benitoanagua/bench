# ADR-010: Two-layer type scale (product-content vs dense chrome) and self-hosted IBM Plex through `@bench/fonts`

## Context

`bench-design-system.md` §2.7 says nothing above 14–16px unless the content is
an empty/error hero, and simultaneously defines a "type scale" for body/labels
plus what used to look like a marketing type ladder (`--bch-type-h1-size` =
2.25rem, `--bch-type-display-size` = 3rem…). Removing display/h1/h2 outright
would break the documented `.bch-type-*` utility API that product teams already
use for landing/onboarding content, and the spec does not actually forbid them
— it forbids _dramatic hierarchy inside the dense chrome_.

Separately, the spec closes three font-serving decisions: variable font
preferred, self-hosted (never a runtime CDN), and `font-display: swap` with a
metrically-adjusted fallback stack. The repo had the variables and fallbacks
but no pathway to obtain the actual `.woff2` files from the official IBM
packages.

## Decision

1. **Two explicit layers, one source of tokens:**
   - **Dense chrome layer** (default of the system): grids, toolbars, tables,
     forms, menus — everything the resident user stares at for 8 hours. Its
     sizes come from `--bch-density-fs-data` / `--bch-density-fs-ui` (§2.9),
     which are density-responsive. Nothing here may reach for
     `--bch-type-display/h1/h2`.
   - **Product-content layer** (opt-in: onboarding pages, empty/error heroes,
     marketing-adjacent product pages): the `--bch-type-*` roles, capped by
     the §2.7 rule to at most display/h1/h2 usage on genuinely editorial
     content. `display`, `h1`, `h2` stay in the token set (they are already
     used and documented), but every component in `@bench/components` for the
     dense UI is required to use the density scale. Enforcement lives in the
     Treo/Lint `design-rules` script: component CSS may not reference
     `--bch-type-display-size`, `-h1-size` or `-h2-size`.
     The 14px panel-title scale from §2.7 is unchanged — that _is_ the chrome
     layer's heading size; there is no "h3 vs panel-title" ambiguity to resolve.
2. **Self-hosting pathway:** a new build step, `pnpm fonts:build`
   (`tooling/typography/build.mjs`), copies the official IBM Plex woff2 assets
   from the `@ibm/plex-sans` / `@ibm/plex-mono` devDependencies into
   `packages/fonts/dist` (`fonts.css` + `.woff2`). Prefer the variable build
   when the official package ships one; today's packages publish static files
   only, so the generator falls back to the two weights the spec actually
   uses (400 and 600) and remains ready to switch to a variable file when IBM
   publishes it. The dimensioned `IBM Plex Sans/Mono Fallback` stack (the
   `ascent-override`/`descent-override`/`size-adjust` from spec decision 3)
   stays in `styles/global.css`, and is _also_ emitted inside
   `packages/fonts/dist/fonts.css` so an application that only consumes the
   font package gets the fallback too.
3. `apps` that need self-hosting include
   `packages/fonts/dist/fonts.css` and ship the generated `.woff2` files as
   their own static assets.

## Consequences

- No change to any component's rendered chrome: the density-driven sizes were
  already the default; this ADR makes the separation explicit and linted.
- The `README` and `docs/foundations/tokens.md` gain the "two layers"
  explanation in plain language so product teams stop reaching for
  `--bch-type-display` inside a data grid.
- When IBM publishes variable `.woff2` versions of these files, no consumer
  code changes — only regenerate the font package.
