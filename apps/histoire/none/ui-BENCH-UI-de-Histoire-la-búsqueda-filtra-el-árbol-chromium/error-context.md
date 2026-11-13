# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui.spec.ts >> BENCH UI de Histoire >> la búsqueda filtra el árbol
- Location: e2e/ui.spec.ts:26:3

# Error details

```
Error: Channel closed
```

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByRole('searchbox', { name: /buscar/i }).first()

```

# Page snapshot

```yaml
- generic [ref=e4]:
    - generic [ref=e6]:
        - generic [ref=e7]:
            - img "Bench Design System logo" [ref=e10]
            - generic [ref=e11]:
                - generic [ref=e12] [cursor=pointer]
                - generic [ref=e15] [cursor=pointer]
        - generic [ref=e18]:
            - generic [ref=e19]:
                - button "Welcome" [ref=e20] [cursor=pointer]
                - link "Welcome 1" [ref=e26] [cursor=pointer]:
                    - /url: '#/story/src-welcome-story-vue'
                    - generic [ref=e27]: Welcome
                    - generic [ref=e31]: '1'
            - button "Foundations" [ref=e34] [cursor=pointer]
            - button "Components" [ref=e40] [cursor=pointer]
            - button "Patterns" [ref=e46] [cursor=pointer]
            - button "Showcase" [ref=e52] [cursor=pointer]
            - button "Foundations" [ref=e57] [cursor=pointer]
            - button "Components" [ref=e64] [cursor=pointer]
            - button "Patterns" [ref=e71] [cursor=pointer]
    - generic [ref=e79]:
        - img "Logo" [ref=e80]
        - generic [ref=e81]:
            - generic [ref=e85]:
                - generic [ref=e86]: '49'
                - generic [ref=e87]: Stories
            - generic [ref=e93]:
                - generic [ref=e94]: '188'
                - generic [ref=e95]: Variants
            - generic [ref=e99]:
                - generic [ref=e100]: '0'
                - generic [ref=e101]: Documents
```

# Test source

```ts
  1   | /**
  2   |  * BENCH catálogo — tests de la UI de Histoire (árbol, búsqueda, controles,
  3   |  * tema, viewport, subruta /bench/ con routerMode hash).
  4   |  */
  5   | import { expect, test } from '@playwright/test';
  6   | import { histoireIndex, sandboxOf, setTheme, variantUrl } from './helpers';
  7   |
  8   | test.describe('BENCH UI de Histoire', () => {
  9   |   test('el árbol respeta el orden Welcome → Foundations → Components → Patterns → Showcase', async ({
  10  |     page,
  11  |   }) => {
  12  |     const url = `http://127.0.0.1:5179/bench/`;
  13  |     await page.goto(url, { waitUntil: 'networkidle' });
  14  |
  15  |     const treeItems = page.getByRole('treeitem');
  16  |     const names = await treeItems.allTextContents();
  17  |     const ordered = ['Welcome', 'Foundations', 'Components', 'Patterns', 'Showcase'];
  18  |     let last = -1;
  19  |     for (const group of ordered) {
  20  |       const idx = names.findIndex((n, i) => i > last && n === group);
  21  |       expect(idx).toBeGreaterThan(-1, `Falta el grupo "${group}" en el árbol`);
  22  |       last = idx;
  23  |     }
  24  |   });
  25  |
  26  |   test('la búsqueda filtra el árbol', async ({ page }) => {
  27  |     await page.goto(`http://127.0.0.1:5179/bench/`, { waitUntil: 'networkidle' });
  28  |
  29  |     const search = page.getByRole('searchbox', { name: /buscar/i }).first();
> 30  |     await search.click();
      |                  ^ Error: locator.click: Test ended.
  31  |     await search.type('Button');
  32  |
  33  |     const treeItems = page.getByRole('treeitem');
  34  |     await expect(treeItems.first()).toContainText('Button');
  35  |     // los grupos que no coinciden se colapsan/ocultan
  36  |     await expect(page.getByRole('treeitem', { name: 'Welcome' })).toBeHidden();
  37  |   });
  38  |
  39  |   test('cambiar de story actualiza el sandbox', async ({ page }) => {
  40  |     const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
  41  |     expect(buttonStory).toBeTruthy();
  42  |     await page.goto(
  43  |       variantUrl(buttonStory!, buttonStory!.variants[0]),
  44  |       { waitUntil: 'networkidle' },
  45  |     );
  46  |
  47  |     const sandbox = sandboxOf(page);
  48  |     await expect(sandbox.getByRole('button', { name: 'Continuar' }).first()).toBeVisible();
  49  |
  50  |     const tokensStory = histoireIndex().stories.find((s) => s.title === 'Tokens');
  51  |     await page.goto(
  52  |       variantUrl(tokensStory!, tokensStory!.variants[0]),
  53  |       { waitUntil: 'networkidle' },
  54  |     );
  55  |
  56  |     const sandbox2 = sandboxOf(page);
  57  |     await expect(sandbox2.getByRole('button', { name: 'Continuar' }).first()).toBeHidden();
  58  |     await expect(sandbox2.getByText('Paleta de colores').first()).toBeVisible();
  59  |   });
  60  |
  61  |   test('el panel de controles aparece en stories con controles', async ({ page }) => {
  62  |     const playground = histoireIndex().stories.find(
  63  |       (s) => s.title === 'Components/Button' && s.variants.some((v) => v.title === 'Playground'),
  64  |     );
  65  |     if (!playground) {
  66  |       test.skip(true, 'Components/Button / Playground no existe aún (Fase 2)');
  67  |       return;
  68  |     }
  69  |     await page.goto(variantUrl(playground, playground.variants.find((v) => v.title === 'Playground')!), {
  70  |       waitUntil: 'networkidle',
  71  |     });
  72  |
  73  |     const panel = page.getByRole('region', { name: /controles/i }).first();
  74  |     await expect(panel).toBeVisible();
  75  |     await expect(panel.getByRole('textbox', { name: /etiqueta/i }).first()).toBeVisible();
  76  |   });
  77  |
  78  |   test('el selector de tema alterna dark y sincroniza data-bch-theme en el sandbox', async ({
  79  |     page,
  80  |   }) => {
  81  |     const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
  82  |     await page.goto(
  83  |       variantUrl(buttonStory!, buttonStory!.variants[0]),
  84  |       { waitUntil: 'networkidle' },
  85  |     );
  86  |
  87  |     const sandbox = sandboxOf(page);
  88  |     await expect(sandbox.locator('html')).toHaveAttribute('data-bch-theme', 'light');
  89  |
  90  |     await page.getByRole('button', { name: /tema/i }).first().click();
  91  |     await expect(sandbox.locator('html')).toHaveAttribute('data-bch-theme', 'dark');
  92  |
  93  |     await page.getByRole('button', { name: /tema/i }).first().click();
  94  |     await expect(sandbox.locator('html')).toHaveAttribute('data-bch-theme', 'light');
  95  |   });
  96  |
  97  |   test('el selector de viewport cambia el tamaño del preview', async ({ page }) => {
  98  |     const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
  99  |     await page.goto(
  100 |       variantUrl(buttonStory!, buttonStory!.variants[0]),
  101 |       { waitUntil: 'networkidle' },
  102 |     );
  103 |
  104 |     const sandbox = sandboxOf(page);
  105 |     await page.getByRole('button', { name: /vista previa|responsive/i }).first().click();
  106 |     await page.getByRole('menuitem', { name: /móvil|mobile/i }).first().click();
  107 |
  108 |     const sandboxHtml = sandbox.locator('html');
  109 |     // Histoire re-monta el sandbox; esperamos el nuevo viewport en el iframe
  110 |     await sandbox.waitForFunction(() => window.innerWidth <= 640, { timeout: 10000 });
  111 |     await expect(sandboxHtml).toHaveAttribute('data-bch-theme', 'light');
  112 |   });
  113 |
  114 |   test('el sitio sirve bajo /bench/ con routerMode hash', async ({ page }) => {
  115 |     const response = await page.goto(`http://127.0.0.1:5179/bench/`, {
  116 |       waitUntil: 'networkidle',
  117 |     });
  118 |     expect(response?.status()).toBe(200);
  119 |
  120 |     const buttonStory = histoireIndex().stories.find((s) => s.title === 'Button');
  121 |     await page.goto(
  122 |       variantUrl(buttonStory!, buttonStory!.variants[0]),
  123 |       { waitUntil: 'networkidle' },
  124 |     );
  125 |     expect(page.url()).toContain('/bench/#/story/');
  126 |     const sandbox = sandboxOf(page);
  127 |     await expect(sandbox.getByRole('button', { name: 'Continuar' }).first()).toBeVisible();
  128 |   });
  129 | });
  130 |
```
