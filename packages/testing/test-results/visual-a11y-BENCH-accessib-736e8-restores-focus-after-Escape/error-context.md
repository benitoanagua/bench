# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/a11y.spec.ts >> BENCH accessibility audit >> dialog restores focus after Escape
- Location: visual/a11y.spec.ts:59:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.focus: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#create-button').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - log
    - log
  - generic [ref=e4]:
    - generic [ref=e5]:
      - banner [ref=e7]:
        - heading "Storybook" [level=1] [ref=e8]
        - generic [ref=e11]:
          - generic [ref=e12]:
            - generic [ref=e13]:
              - generic [ref=e14]:
                - link "Skip to content" [ref=e15] [cursor=pointer]:
                  - /url: "#storybook-preview-wrapper"
                - link "Storybook" [ref=e17] [cursor=pointer]:
                  - /url: ./
                  - img "Storybook" [ref=e18]
                - switch "Settings" [ref=e23] [cursor=pointer]
              - generic [ref=e29]:
                - generic [ref=e31] [cursor=pointer]:
                  - button "Open onboarding guide" [ref=e35]:
                    - strong [ref=e39]: Get started
                  - generic [ref=e40]:
                    - button "Collapse onboarding guide" [expanded] [ref=e41]
                    - button "24% completed" [ref=e44]:
                      - generic [ref=e50]: 24%
                - list [ref=e53]:
                  - listitem [ref=e54]:
                    - button "Open onboarding guide for See what's new" [ref=e55] [cursor=pointer]:
                      - generic [ref=e59]: See what's new
                    - button "Go"
                  - listitem [ref=e61]:
                    - button "Open onboarding guide for Change a story with Controls" [ref=e62] [cursor=pointer]:
                      - generic [ref=e66]: Change a story with Controls
                  - listitem [ref=e68]:
                    - button "Open onboarding guide for Publish your Storybook for feedback" [ref=e69] [cursor=pointer]:
                      - generic [ref=e73]: Publish your Storybook for feedback
            - generic [ref=e75]: Search for components
            - search [ref=e76]:
              - combobox [ref=e77]:
                - searchbox "Search for components" [ref=e78]
                - code: ⌃ K
                - button "Tag filters" [ref=e80] [cursor=pointer]
            - navigation [ref=e84]:
              - heading "Stories" [level=2] [ref=e85]
              - generic [ref=e87]:
                - generic [ref=e88]:
                  - button "Collapse" [expanded] [ref=e89] [cursor=pointer]: BENCH
                  - button "Expand all" [ref=e93] [cursor=pointer]
                - button [expanded] [ref=e97] [cursor=pointer]
                - button [expanded] [ref=e105] [cursor=pointer]
                - button [expanded] [ref=e113] [cursor=pointer]
                - generic [ref=e120]:
                  - link [ref=e121] [cursor=pointer]:
                    - /url: /?path=/story/bench-components-surface-accordion--default
                  - link "Skip to content" [ref=e125] [cursor=pointer]:
                    - /url: "#storybook-preview-wrapper"
                - link [ref=e127] [cursor=pointer]:
                  - /url: /?path=/story/bench-components-surface-accordion--multiple
                - button [ref=e132] [cursor=pointer]
                - button [ref=e140] [cursor=pointer]
                - button [ref=e148] [cursor=pointer]
                - link [ref=e156] [cursor=pointer]:
                  - /url: /?path=/story/bench-components-surface--card-and-badge
                - button [ref=e161] [cursor=pointer]
                - button [ref=e169] [cursor=pointer]
                - button [ref=e177] [cursor=pointer]
                - button [ref=e185] [cursor=pointer]
                - button [ref=e193] [cursor=pointer]
                - button [ref=e201] [cursor=pointer]
                - button [ref=e209] [cursor=pointer]
                - button [ref=e217] [cursor=pointer]
                - button [ref=e225] [cursor=pointer]
                - button [ref=e233] [cursor=pointer]
                - button [ref=e241] [cursor=pointer]
          - link "Storybook 10.6 Learn what's new in Storybook Dismiss notification" [ref=e250] [cursor=pointer]:
            - /url: /?path=/settings/whats-new
            - generic [ref=e254]:
              - generic "Storybook 10.6" [ref=e255]
              - generic [ref=e256]: Learn what's new in Storybook
            - button "Dismiss notification" [ref=e257]
      - separator "Sidebar resize handle" [ref=e260]
    - generic [ref=e262]:
      - region [ref=e263]:
        - heading "Toolbar" [level=2] [ref=e264]
        - toolbar [ref=e265]:
          - generic [ref=e266]:
            - button "Reload story" [ref=e267] [cursor=pointer]
            - switch "Grid visibility" [ref=e270] [cursor=pointer]
            - button "Preview background" [ref=e273] [cursor=pointer]
            - switch "Measure tool" [ref=e277] [cursor=pointer]
            - switch "Outline tool" [ref=e281] [cursor=pointer]
            - button "Viewport size" [ref=e284] [cursor=pointer]
            - button "BENCH theme light" [ref=e290] [cursor=pointer]: light
          - generic [ref=e293]:
            - button "Open in isolation mode" [ref=e294] [cursor=pointer]
            - switch "Change zoom level" [ref=e300] [cursor=pointer]: 100%
            - button "Enter full screen" [ref=e301] [cursor=pointer]
            - button "Open in editor" [ref=e304] [cursor=pointer]
      - main [ref=e308]:
        - heading "Main preview area" [level=2] [ref=e309]
        - generic [ref=e311]:
          - link "Skip to sidebar" [ref=e312] [cursor=pointer]:
            - /url: "#bench-components-surface-accordion--default"
          - iframe [ref=e316]:
            - generic [ref=f1e5]:
              - generic [ref=f1e7]:
                - heading [level=3] [ref=f1e8]:
                  - button "What is Bench?" [expanded] [ref=f1e9] [cursor=pointer]
                - region "What is Bench?" [ref=f1e14]: A mobile-first component library.
              - heading [level=3] [ref=f1e17]:
                - button "Is it accessible?" [ref=f1e18] [cursor=pointer]
    - generic [ref=e317]:
      - separator "Addon panel resize handle" [ref=e318]
      - region [ref=e320]:
        - heading "Addon panel" [level=2] [ref=e321]
        - generic [ref=e322]:
          - generic [ref=e323]:
            - generic [ref=e324]:
              - button "Move addon panel to right" [ref=e325] [cursor=pointer]
              - button "Hide addon panel" [ref=e329] [cursor=pointer]
            - tablist "Available addons" [ref=e335]:
              - tab "Controls" [selected] [ref=e336] [cursor=pointer]
              - tab "Actions" [ref=e339] [cursor=pointer]
              - tab "Interactions" [ref=e342] [cursor=pointer]
          - tabpanel "Controls" [ref=e345]:
            - generic [ref=e352]:
              - generic [ref=e353]:
                - generic [ref=e354]: This story has no controls
                - generic [ref=e355]:
                  - text: Storybook couldn't find or generate any controls for this story. Define
                  - code [ref=e356]: args
                  - text: or
                  - code [ref=e357]: argTypes
                  - text: ", or configure docgen to let Storybook generate controls automatically."
              - link "Read docs" [ref=e360] [cursor=pointer]:
                - /url: https://storybook.js.org/docs/essentials/controls?ref=ui
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
> 62 |     await create.focus();
     |                  ^ Error: locator.focus: Test timeout of 30000ms exceeded.
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