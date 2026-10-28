# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-matrix.spec.ts >> BENCH smoke desktop-1440
- Location: visual/visual-matrix.spec.ts:11:3

# Error details

```
Error: A snapshot doesn't exist at /home/mamaya/Code/bench/packages/testing/visual/visual-matrix.spec.ts-snapshots/bench-desktop-1440-linux.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - log
    - log [ref=e3]:
      - generic [ref=e4]: Component test is rendering.
      - generic [ref=e5]: Component test completed successfully.
  - generic [ref=e7]:
    - generic [ref=e8]:
      - banner [ref=e10]:
        - heading "Storybook" [level=1] [ref=e11]
        - generic [ref=e14]:
          - generic [ref=e15]:
            - generic [ref=e16]:
              - generic [ref=e17]:
                - link "Skip to content" [ref=e18] [cursor=pointer]:
                  - /url: "#storybook-preview-wrapper"
                - link "Storybook" [ref=e20] [cursor=pointer]:
                  - /url: ./
                  - img "Storybook" [ref=e21]
                - switch "Settings" [ref=e26] [cursor=pointer]
              - generic [ref=e32]:
                - generic [ref=e34] [cursor=pointer]:
                  - button "Open onboarding guide" [ref=e38]:
                    - strong [ref=e42]: Get started
                  - generic [ref=e43]:
                    - button "Collapse onboarding guide" [expanded] [ref=e44]
                    - button "24% completed" [ref=e47]:
                      - generic [ref=e53]: 24%
                - list [ref=e56]:
                  - listitem [ref=e57]:
                    - button "Open onboarding guide for See what's new" [ref=e58] [cursor=pointer]:
                      - generic [ref=e62]: See what's new
                    - button "Go"
                  - listitem [ref=e64]:
                    - button "Open onboarding guide for Change a story with Controls" [ref=e65] [cursor=pointer]:
                      - generic [ref=e69]: Change a story with Controls
                  - listitem [ref=e71]:
                    - button "Open onboarding guide for Publish your Storybook for feedback" [ref=e72] [cursor=pointer]:
                      - generic [ref=e76]: Publish your Storybook for feedback
            - generic [ref=e78]: Search for components
            - search [ref=e79]:
              - combobox [ref=e80]:
                - searchbox "Search for components" [ref=e81]
                - code: ⌃ K
                - button "Tag filters" [ref=e83] [cursor=pointer]
            - navigation [ref=e87]:
              - heading "Stories" [level=2] [ref=e88]
              - generic [ref=e90]:
                - generic [ref=e91]:
                  - button "Collapse" [expanded] [ref=e92] [cursor=pointer]: BENCH
                  - button "Expand all" [ref=e96] [cursor=pointer]
                - button [expanded] [ref=e100] [cursor=pointer]
                - button [expanded] [ref=e108] [cursor=pointer]
                - button [expanded] [ref=e116] [cursor=pointer]
                - generic [ref=e123]:
                  - link [ref=e124] [cursor=pointer]:
                    - /url: /?path=/story/bench-components-surface-accordion--default
                  - link "Skip to content" [ref=e128] [cursor=pointer]:
                    - /url: "#storybook-preview-wrapper"
                - link [ref=e130] [cursor=pointer]:
                  - /url: /?path=/story/bench-components-surface-accordion--multiple
                - button [ref=e135] [cursor=pointer]
                - button [ref=e143] [cursor=pointer]
                - button [ref=e151] [cursor=pointer]
                - link [ref=e159] [cursor=pointer]:
                  - /url: /?path=/story/bench-components-surface--card-and-badge
                - button [ref=e164] [cursor=pointer]
                - button [ref=e172] [cursor=pointer]
                - button [ref=e180] [cursor=pointer]
                - button [ref=e188] [cursor=pointer]
                - button [ref=e196] [cursor=pointer]
                - button [ref=e204] [cursor=pointer]
                - button [ref=e212] [cursor=pointer]
                - button [ref=e220] [cursor=pointer]
                - button [ref=e228] [cursor=pointer]
                - button [ref=e236] [cursor=pointer]
                - button [ref=e244] [cursor=pointer]
          - link "Storybook 10.6 Learn what's new in Storybook Dismiss notification" [ref=e253] [cursor=pointer]:
            - /url: /?path=/settings/whats-new
            - generic [ref=e257]:
              - generic "Storybook 10.6" [ref=e258]
              - generic [ref=e259]: Learn what's new in Storybook
            - button "Dismiss notification" [ref=e260]
      - separator "Sidebar resize handle" [ref=e263]
    - generic [ref=e265]:
      - region [ref=e266]:
        - heading "Toolbar" [level=2] [ref=e267]
        - toolbar [ref=e268]:
          - generic [ref=e269]:
            - button "Reload story" [ref=e270] [cursor=pointer]
            - switch "Grid visibility" [ref=e273] [cursor=pointer]
            - button "Preview background" [ref=e276] [cursor=pointer]
            - switch "Measure tool" [ref=e280] [cursor=pointer]
            - switch "Outline tool" [ref=e284] [cursor=pointer]
            - button "Viewport size" [ref=e287] [cursor=pointer]
            - button "BENCH theme light" [ref=e293] [cursor=pointer]: light
          - generic [ref=e296]:
            - button "Open in isolation mode" [ref=e297] [cursor=pointer]
            - switch "Change zoom level" [ref=e303] [cursor=pointer]: 100%
            - button "Enter full screen" [ref=e304] [cursor=pointer]
            - button "Open in editor" [ref=e307] [cursor=pointer]
      - main [ref=e311]:
        - heading "Main preview area" [level=2] [ref=e312]
        - generic [ref=e314]:
          - link "Skip to sidebar" [ref=e315] [cursor=pointer]:
            - /url: "#bench-components-surface-accordion--default"
          - iframe [ref=e319]:
            - generic [ref=f1e5]:
              - generic [ref=f1e7]:
                - heading [level=3] [ref=f1e8]:
                  - button "What is Bench?" [expanded] [ref=f1e9] [cursor=pointer]
                - region "What is Bench?" [ref=f1e14]: A mobile-first component library.
              - heading [level=3] [ref=f1e17]:
                - button "Is it accessible?" [ref=f1e18] [cursor=pointer]
    - generic [ref=e320]:
      - separator "Addon panel resize handle" [ref=e321]
      - region [ref=e323]:
        - heading "Addon panel" [level=2] [ref=e324]
        - generic [ref=e325]:
          - generic [ref=e326]:
            - generic [ref=e327]:
              - button "Move addon panel to right" [ref=e328] [cursor=pointer]
              - button "Hide addon panel" [ref=e332] [cursor=pointer]
            - tablist "Available addons" [ref=e338]:
              - tab "Controls" [selected] [ref=e339] [cursor=pointer]
              - tab "Actions" [ref=e342] [cursor=pointer]
              - tab "Interactions" [ref=e345] [cursor=pointer]
          - tabpanel "Controls" [ref=e348]:
            - generic [ref=e355]:
              - generic [ref=e356]:
                - generic [ref=e357]: This story has no controls
                - generic [ref=e358]:
                  - text: Storybook couldn't find or generate any controls for this story. Define
                  - code [ref=e359]: args
                  - text: or
                  - code [ref=e360]: argTypes
                  - text: ", or configure docgen to let Storybook generate controls automatically."
              - link "Read docs" [ref=e363] [cursor=pointer]:
                - /url: https://storybook.js.org/docs/essentials/controls?ref=ui
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
     |     ^ Error: A snapshot doesn't exist at /home/mamaya/Code/bench/packages/testing/visual/visual-matrix.spec.ts-snapshots/bench-desktop-1440-linux.png, writing actual.
  15 |       fullPage: true,
  16 |     });
  17 |   });
  18 | }
  19 | 
```