# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/a11y.spec.ts >> BENCH accessibility audit >> keyboard can reach primary controls
- Location: visual/a11y.spec.ts:51:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator(':focus')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator(':focus') with timeout 5000ms
  - waiting for locator(':focus')

```

```yaml
- log
- log: Component test is rendering. Component test completed successfully.
- banner "Storybook":
  - heading "Storybook" [level=1]
  - img
  - link "Skip to content":
    - /url: "#storybook-preview-wrapper"
  - link "Storybook":
    - /url: ./
    - img "Storybook"
  - switch "Settings":
    - img
  - button "Open onboarding guide":
    - img
    - strong: Get started
  - button "Collapse onboarding guide" [expanded]:
    - img
  - button "24% completed":
    - img
    - img
    - text: 24%
  - list:
    - listitem:
      - button "Open onboarding guide for See what's new":
        - img
        - text: See what's new
      - button "Go"
    - listitem:
      - button "Open onboarding guide for Change a story with Controls":
        - img
        - text: Change a story with Controls
    - listitem:
      - button "Open onboarding guide for Publish your Storybook for feedback":
        - img
        - text: Publish your Storybook for feedback
  - text: Search for components
  - search:
    - combobox "Search for components":
      - img
      - searchbox "Search for components"
      - code: ⌃ K
      - button "Tag filters":
        - img
  - navigation "Stories":
    - heading "Stories" [level=2]
    - button "Collapse" [expanded]:
      - img
      - text: BENCH
    - button "Expand all":
      - img
    - button "Components" [expanded]:
      - img
      - img
      - text: Components
    - button "Surface" [expanded]:
      - img
      - img
      - text: Surface
    - button "Accordion" [expanded]:
      - img
      - img
      - text: Accordion
    - link "Default":
      - /url: /?path=/story/bench-components-surface-accordion--default
      - img
      - text: Default
    - link "Skip to content":
      - /url: "#storybook-preview-wrapper"
    - link "Multiple":
      - /url: /?path=/story/bench-components-surface-accordion--multiple
      - img
      - text: Multiple
    - button "Avatar":
      - img
      - img
      - text: Avatar
    - button "Badge":
      - img
      - img
      - text: Badge
    - button "Card":
      - img
      - img
      - text: Card
    - link "Card And Badge":
      - /url: /?path=/story/bench-components-surface--card-and-badge
      - img
      - text: Card And Badge
    - button "Navigation":
      - img
      - img
      - text: Navigation
    - button "Button":
      - img
      - img
      - text: Button
    - button "Forms":
      - img
      - img
      - text: Forms
    - button "Gallery":
      - img
      - img
      - text: Gallery
    - button "Overlays":
      - img
      - img
      - text: Overlays
    - button "Actions":
      - img
      - img
      - text: Actions
    - button "Feedback":
      - img
      - img
      - text: Feedback
    - button "Introduction":
      - img
      - img
      - text: Introduction
    - button "Quality":
      - img
      - img
      - text: Quality
    - button "Showcase":
      - img
      - img
      - text: Showcase
    - button "Visual":
      - img
      - img
      - text: Visual
  - link "Storybook 10.6 Learn what's new in Storybook Dismiss notification":
    - /url: /?path=/settings/whats-new
    - img
    - text: Storybook 10.6 Learn what's new in Storybook
    - button "Dismiss notification":
      - img
- separator "Sidebar resize handle"
- region "Toolbar":
  - heading "Toolbar" [level=2]
  - toolbar:
    - button "Reload story":
      - img
    - switch "Grid visibility":
      - img
    - button "Preview background":
      - img
    - switch "Measure tool":
      - img
    - switch "Outline tool":
      - img
    - button "Viewport size":
      - img
    - button "BENCH theme light":
      - img
      - text: light
    - button "Open in isolation mode":
      - img
    - switch "Change zoom level": 100%
    - button "Enter full screen":
      - img
    - button "Open in editor":
      - img
- main "Main preview area":
  - heading "Main preview area" [level=2]
  - link "Skip to sidebar":
    - /url: "#bench-components-surface-accordion--default"
  - iframe
- separator "Addon panel resize handle"
- region "Addon panel":
  - heading "Addon panel" [level=2]
  - button "Move addon panel to right":
    - img
  - button "Hide addon panel":
    - img
  - tablist "Available addons":
    - tab "Controls" [selected]
    - tab "Actions"
    - tab "Interactions"
  - tabpanel "Controls":
    - text: This story has no controls Storybook couldn't find or generate any controls for this story. Define
    - code: args
    - text: or
    - code: argTypes
    - text: ", or configure docgen to let Storybook generate controls automatically."
    - link "Read docs":
      - /url: https://storybook.js.org/docs/essentials/controls?ref=ui
      - img
      - text: Read docs
      - img
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const views = ['overview', 'activity', 'forms', 'settings'];
  4  | 
  5  | async function assertAccessibleBasics(page: import('@playwright/test').Page) {
  6  |   const violations = await page.evaluate(() => {
  7  |     const problems: string[] = [];
  8  |     document.querySelectorAll('img').forEach((el) => {
  9  |       if (!el.hasAttribute('alt')) problems.push('img without alt');
  10 |     });
  11 |     document.querySelectorAll('button').forEach((el) => {
  12 |       if (
  13 |         !el.textContent?.trim() &&
  14 |         !el.getAttribute('aria-label') &&
  15 |         !el.getAttribute('aria-labelledby')
  16 |       )
  17 |         problems.push('button without accessible name');
  18 |     });
  19 |     document.querySelectorAll('input, textarea, select').forEach((el) => {
  20 |       const labelled =
  21 |         el.getAttribute('aria-label') ||
  22 |         el.getAttribute('aria-labelledby') ||
  23 |         (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`));
  24 |       if (!labelled) problems.push(`${el.tagName.toLowerCase()} without accessible name`);
  25 |     });
  26 |     document.querySelectorAll('[role="dialog"]').forEach((el) => {
  27 |       if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby'))
  28 |         problems.push('dialog without accessible name');
  29 |     });
  30 |     document.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
  31 |       const described = el.getAttribute('aria-describedby');
  32 |       if (!described || !described.split(/\s+/).some((id) => document.getElementById(id)))
  33 |         problems.push('invalid control without described error/hint');
  34 |     });
  35 |     return problems;
  36 |   });
  37 |   expect(violations, violations.join('\n')).toEqual([]);
  38 | }
  39 | 
  40 | test.describe('BENCH accessibility audit', () => {
  41 |   for (const view of views) {
  42 |     test(`${view} has accessible names and semantics`, async ({ page }) => {
  43 |       await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
  44 |       const button = page.locator(`[data-view="${view}"]`).first();
  45 |       if (await button.count()) await button.click();
  46 |       await page.waitForTimeout(100);
  47 |       await assertAccessibleBasics(page);
  48 |     });
  49 |   }
  50 | 
  51 |   test('keyboard can reach primary controls', async ({ page }) => {
  52 |     await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
  53 |     await page.keyboard.press('Tab');
> 54 |     await expect(page.locator(':focus')).toBeVisible();
     |                                          ^ Error: expect(locator).toBeVisible() failed
  55 |     for (let i = 0; i < 8; i++) await page.keyboard.press('Tab');
  56 |     await expect(page.locator(':focus')).toBeVisible();
  57 |   });
  58 | 
  59 |   test('dialog restores focus after Escape', async ({ page }) => {
  60 |     await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
  61 |     const create = page.locator('#create-button').first();
  62 |     await create.focus();
  63 |     await page.keyboard.press('Enter');
  64 |     await expect(page.locator('bch-dialog dialog')).toBeVisible();
  65 |     await page.keyboard.press('Escape');
  66 |     await expect(page.locator('bch-dialog dialog')).toBeHidden();
  67 |     await expect(create).toBeFocused();
  68 |   });
  69 | 
  70 |   test('reduced motion disables animations', async ({ page }) => {
  71 |     await page.emulateMedia({ reducedMotion: 'reduce' });
  72 |     await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
  73 |     const value = await page.evaluate(() =>
  74 |       getComputedStyle(document.documentElement).getPropertyValue('--bch-motion-normal').trim(),
  75 |     );
  76 |     expect(value).toBeTruthy();
  77 |   });
  78 | });
  79 | 
```