# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src/contracts.spec.ts >> BENCH public contracts >> button exposes a native button
- Location: src/contracts.spec.ts:4:3

# Error details

```
Error: expect(locator).toHaveRole(expected) failed

Locator: locator('bch-button button')
Expected: "button"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveRole" locator('bch-button button') with timeout 5000ms
  - waiting for locator('bch-button button')

```

```yaml
- text: Continue
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('BENCH public contracts', () => {
  4  |   test('button exposes a native button', async ({ page }) => {
  5  |     await page.setContent('<bch-button>Continue</bch-button>');
  6  |     const button = page.locator('bch-button button');
> 7  |     await expect(button).toHaveRole('button', { name: 'Continue' });
     |                          ^ Error: expect(locator).toHaveRole(expected) failed
  8  |   });
  9  | });
  10 | 
```