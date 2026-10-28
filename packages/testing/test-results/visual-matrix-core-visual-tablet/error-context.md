# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/matrix.spec.ts >> core visual tablet
- Location: visual/matrix.spec.ts:11:3

# Error details

```
Error: A snapshot doesn't exist at /home/mamaya/Code/bench/packages/testing/visual/matrix.spec.ts-snapshots/core-tablet-linux.png, writing actual.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Couldn't find story matching 'bench-visual-statematrix--controls'." [level=1] [ref=e3]
  - paragraph [ref=e4]: "The component failed to render properly, likely due to a configuration issue in Storybook. Here are some common causes and how you can address them:"
  - list [ref=e5]:
    - listitem [ref=e6]:
      - strong [ref=e7]: Missing Context/Providers
      - text: ": You can use decorators to supply specific contexts or providers, which are sometimes necessary for components to render correctly. For detailed instructions on using decorators, please visit the"
      - link "Decorators documentation" [ref=e8] [cursor=pointer]:
        - /url: https://storybook.js.org/docs/writing-stories/decorators
      - text: .
    - listitem [ref=e9]:
      - strong [ref=e10]: Misconfigured Webpack or Vite
      - text: ": Verify that Storybook picks up all necessary settings for loaders, plugins, and other relevant parameters. You can find step-by-step guides for configuring"
      - link "Webpack" [ref=e11] [cursor=pointer]:
        - /url: https://storybook.js.org/docs/builders/webpack
      - text: or
      - link "Vite" [ref=e12] [cursor=pointer]:
        - /url: https://storybook.js.org/docs/builders/vite
      - text: with Storybook.
    - listitem [ref=e13]:
      - strong [ref=e14]: Missing Environment Variables
      - text: ": Your Storybook may require specific environment variables to function as intended. You can set up custom environment variables as outlined in the"
      - link "Environment Variables documentation" [ref=e15] [cursor=pointer]:
        - /url: https://storybook.js.org/docs/configure/environment-variables
      - text: .
  - code [ref=e17]: "- Are you sure a story with that id exists? - Please check your stories field of your main.js config. - Also check the browser console and terminal for error messages."
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | const viewports = [
  4  |   { name: 'mobile', width: 320, height: 800 },
  5  |   { name: 'mobile-large', width: 375, height: 812 },
  6  |   { name: 'tablet', width: 768, height: 1024 },
  7  |   { name: 'desktop', width: 1440, height: 900 },
  8  | ];
  9  | 
  10 | for (const viewport of viewports) {
  11 |   test(`core visual ${viewport.name}`, async ({ page }) => {
  12 |     await page.setViewportSize({ width: viewport.width, height: viewport.height });
  13 |     await page.goto('/iframe.html?id=bench-visual-statematrix--controls');
  14 |     await page.waitForLoadState('networkidle');
> 15 |     await expect(page).toHaveScreenshot(`core-${viewport.name}.png`, { fullPage: true });
     |     ^ Error: A snapshot doesn't exist at /home/mamaya/Code/bench/packages/testing/visual/matrix.spec.ts-snapshots/core-tablet-linux.png, writing actual.
  16 |   });
  17 | }
  18 | 
```