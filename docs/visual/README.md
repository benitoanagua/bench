# Visual Quality

BENCH visual regression is defined by BENCH itself, not by comparison with another design system.

## Viewports

| Name | Width | Height |
|---|---:|---:|
| mobile | 320 | 800 |
| mobile-large | 375 | 812 |
| tablet | 768 | 1024 |
| desktop | 1440 | 900 |

## State coverage

Components are captured in the states that apply to them:

- default
- hover
- active
- focus-visible
- disabled
- loading
- error
- light theme
- dark theme
- reduced motion

## Baseline policy

Baselines are generated from BENCH Storybook stories. They are deterministic artifacts and must only change when the visual contract intentionally changes.
