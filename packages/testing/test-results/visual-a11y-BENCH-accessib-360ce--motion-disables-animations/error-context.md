# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/a11y.spec.ts >> BENCH accessibility audit >> reduced motion disables animations
- Location: visual/a11y.spec.ts:70:3

# Error details

```
Error: expect(received).toBeTruthy()

Received: ""
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - log
    - log [ref=e3]:
      - generic [ref=e4]: Component test is rendering.
  - generic [ref=e6]:
    - generic [ref=e7]:
      - banner [ref=e9]:
        - heading "Storybook" [level=1] [ref=e10]
        - generic [ref=e14]:
          - generic [ref=e15]:
            - generic [ref=e16]:
              - link "Skip to content" [ref=e17] [cursor=pointer]:
                - /url: "#storybook-preview-wrapper"
              - link "Storybook" [ref=e19] [cursor=pointer]:
                - /url: ./
                - img "Storybook" [ref=e20]
              - switch "Settings" [ref=e25] [cursor=pointer]
            - generic [ref=e31]:
              - generic [ref=e33] [cursor=pointer]:
                - button "Open onboarding guide" [ref=e37]:
                  - strong [ref=e41]: Get started
                - generic [ref=e42]:
                  - button "Collapse onboarding guide" [expanded] [ref=e43]
                  - button "24% completed" [ref=e46]:
                    - generic [ref=e52]: 24%
              - list [ref=e55]:
                - listitem [ref=e56]:
                  - button "Open onboarding guide for See what's new" [ref=e57] [cursor=pointer]:
                    - generic [ref=e61]: See what's new
                  - button "Go"
                - listitem [ref=e63]:
                  - button "Open onboarding guide for Change a story with Controls" [ref=e64] [cursor=pointer]:
                    - generic [ref=e68]: Change a story with Controls
                - listitem [ref=e70]:
                  - button "Open onboarding guide for Publish your Storybook for feedback" [ref=e71] [cursor=pointer]:
                    - generic [ref=e75]: Publish your Storybook for feedback
          - generic [ref=e77]: Search for components
          - search [ref=e78]:
            - combobox [ref=e79]:
              - searchbox "Search for components" [ref=e80]
              - code: ⌃ K
              - button "Tag filters" [ref=e82] [cursor=pointer]
          - navigation [ref=e86]:
            - heading "Stories" [level=2] [ref=e87]
            - generic [ref=e89]:
              - generic [ref=e90]:
                - button "Collapse" [expanded] [ref=e91] [cursor=pointer]: BENCH
                - button "Expand all" [ref=e95] [cursor=pointer]
              - button [expanded] [ref=e99] [cursor=pointer]
              - button [expanded] [ref=e107] [cursor=pointer]
              - button [expanded] [ref=e115] [cursor=pointer]
              - generic [ref=e122]:
                - link [ref=e123] [cursor=pointer]:
                  - /url: /?path=/story/bench-components-surface-accordion--default
                - link "Skip to content" [ref=e127] [cursor=pointer]:
                  - /url: "#storybook-preview-wrapper"
              - link [ref=e129] [cursor=pointer]:
                - /url: /?path=/story/bench-components-surface-accordion--multiple
              - button [ref=e134] [cursor=pointer]
              - button [ref=e142] [cursor=pointer]
              - button [ref=e150] [cursor=pointer]
              - link [ref=e158] [cursor=pointer]:
                - /url: /?path=/story/bench-components-surface--card-and-badge
              - button [ref=e163] [cursor=pointer]
              - button [ref=e171] [cursor=pointer]
              - button [ref=e179] [cursor=pointer]
              - button [ref=e187] [cursor=pointer]
              - button [ref=e195] [cursor=pointer]
              - button [ref=e203] [cursor=pointer]
              - button [ref=e211] [cursor=pointer]
              - button [ref=e219] [cursor=pointer]
              - button [ref=e227] [cursor=pointer]
              - button [ref=e235] [cursor=pointer]
              - button [ref=e243] [cursor=pointer]
      - separator "Sidebar resize handle" [ref=e250]
    - generic [ref=e252]:
      - region [ref=e253]:
        - heading "Toolbar" [level=2] [ref=e254]
        - toolbar [ref=e255]:
          - generic [ref=e256]:
            - button "Reload story" [ref=e257] [cursor=pointer]
            - switch "Measure tool" [ref=e260] [cursor=pointer]
            - switch "Outline tool" [ref=e264] [cursor=pointer]
            - button "Viewport size" [ref=e267] [cursor=pointer]
            - button "BENCH theme light" [ref=e273] [cursor=pointer]: light
          - generic [ref=e276]:
            - button "Open in isolation mode" [ref=e277] [cursor=pointer]
            - switch "Change zoom level" [ref=e283] [cursor=pointer]: 100%
            - button "Enter full screen" [ref=e284] [cursor=pointer]
            - button "Open in editor" [ref=e287] [cursor=pointer]
      - main [ref=e291]:
        - heading "Main preview area" [level=2] [ref=e292]
        - generic [ref=e294]:
          - link "Skip to sidebar" [ref=e295] [cursor=pointer]:
            - /url: "#bench-components-surface-accordion--default"
          - iframe [ref=e299]
    - generic [ref=e300]:
      - separator "Addon panel resize handle" [ref=e301]
      - region [ref=e303]:
        - heading "Addon panel" [level=2] [ref=e304]
        - generic [ref=e305]:
          - generic [ref=e306]:
            - generic [ref=e307]:
              - button "Move addon panel to right" [ref=e308] [cursor=pointer]
              - button "Hide addon panel" [ref=e312] [cursor=pointer]
            - tablist "Available addons" [ref=e318]:
              - tab "Controls" [selected] [ref=e319] [cursor=pointer]
              - tab "Actions" [ref=e322] [cursor=pointer]
              - tab "Interactions" [ref=e325] [cursor=pointer]
          - tabpanel "Controls" [ref=e328]
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
  54 |     await expect(page.locator(':focus')).toBeVisible();
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
> 76 |     expect(value).toBeTruthy();
     |                   ^ Error: expect(received).toBeTruthy()
  77 |   });
  78 | });
  79 | 
```