# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-matrix.spec.ts >> BENCH smoke mobile-320
- Location: visual/visual-matrix.spec.ts:11:3

# Error details

```
Error: A snapshot doesn't exist at /home/mamaya/Code/bench/packages/testing/visual/visual-matrix.spec.ts-snapshots/bench-mobile-320-linux.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e5]:
    - heading "Navigation controls" [level=2] [ref=e6]
    - button "Open navigation menu" [ref=e7] [cursor=pointer]:
      - paragraph [ref=e10]: Surface/Accordion/Default
    - generic [ref=e11]: Surface/Accordion/Default
    - button "Open addon panel" [ref=e12] [cursor=pointer]
  - generic [ref=e17]:
    - region [ref=e18]:
      - heading "Toolbar" [level=2] [ref=e19]
      - toolbar [ref=e20]:
        - generic [ref=e21]:
          - button "Reload story" [ref=e22] [cursor=pointer]
          - switch "Grid visibility" [ref=e25] [cursor=pointer]
          - button "Preview background" [ref=e28] [cursor=pointer]
          - switch "Measure tool" [ref=e32] [cursor=pointer]
          - switch "Outline tool" [ref=e36] [cursor=pointer]
          - button "Viewport size" [ref=e39] [cursor=pointer]
          - button "BENCH theme light" [ref=e45] [cursor=pointer]: light
        - generic [ref=e48]:
          - button "Open in isolation mode" [ref=e49] [cursor=pointer]
          - switch "Change zoom level" [ref=e55] [cursor=pointer]: 100%
          - button "Open in editor" [ref=e56] [cursor=pointer]
    - main [ref=e60]:
      - heading "Main preview area" [level=2] [ref=e61]
      - iframe [ref=e67]:
        - generic [ref=f1e5]:
          - generic [ref=f1e7]:
            - heading [level=3] [ref=f1e8]:
              - button "What is Bench?" [expanded] [ref=f1e9] [cursor=pointer]
            - region "What is Bench?" [ref=f1e14]: A mobile-first component library.
          - heading [level=3] [ref=f1e17]:
            - button "Is it accessible?" [ref=f1e18] [cursor=pointer]
  - link "Storybook 10.6 Learn what's new in Storybook Dismiss notification" [ref=e69] [cursor=pointer]:
    - /url: /?path=/settings/whats-new
    - generic [ref=e73]:
      - generic "Storybook 10.6" [ref=e74]
      - generic [ref=e75]: Learn what's new in Storybook
    - button "Dismiss notification" [ref=e76]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const viewports = [
  4  |   { name: 'mobile-320', width: 320, height: 800 },
  5  |   { name: 'mobile-375', width: 375, height: 812 },
  6  |   { name: 'tablet-768', width: 768, height: 1024 },
  7  |   { name: 'desktop-1440', width: 1440, height: 900 },
  8  | ];
  9  | 
  10 | for (const viewport of viewports) {
  11 |   test(`BENCH smoke ${viewport.name}`, async ({ page }) => {
  12 |     await page.setViewportSize({ width: viewport.width, height: viewport.height });
  13 |     await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
> 14 |     await expect(page.locator('body')).toHaveScreenshot(`bench-${viewport.name}.png`, {
     |     ^ Error: A snapshot doesn't exist at /home/mamaya/Code/bench/packages/testing/visual/visual-matrix.spec.ts-snapshots/bench-mobile-320-linux.png, writing actual.
  15 |       fullPage: true,
  16 |     });
  17 |   });
  18 | }
  19 | 
```