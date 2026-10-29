import { expect, test } from '@playwright/test';

async function assertAccessibleBasics(page: import('@playwright/test').Page) {
  const violations = await page.evaluate(() => {
    const problems: string[] = [];
    document.querySelectorAll('img').forEach((el) => {
      if (!el.hasAttribute('alt')) problems.push('img without alt');
    });
    document.querySelectorAll('button').forEach((el) => {
      if (
        !el.textContent?.trim() &&
        !el.getAttribute('aria-label') &&
        !el.getAttribute('aria-labelledby')
      ) {
        problems.push('button without accessible name');
      }
    });
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      const labelled =
        el.getAttribute('aria-label') ||
        el.getAttribute('aria-labelledby') ||
        (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`));
      if (!labelled) problems.push(`${el.tagName.toLowerCase()} without accessible name`);
    });
    document.querySelectorAll('[role="dialog"]').forEach((el) => {
      if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
        problems.push('dialog without accessible name');
      }
    });
    document.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
      const described = el.getAttribute('aria-describedby');
      if (!described || !described.split(/\s+/).some((id) => document.getElementById(id))) {
        problems.push('invalid control without described error/hint');
      }
    });
    return problems;
  });
  expect(violations, violations.join('\n')).toEqual([]);
}

test.describe('BENCH accessibility audit', () => {
  test('button story has accessible names and semantics', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-button--primary');
    await assertAccessibleBasics(page);
  });

  test('input story has accessible names and semantics', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-forms-input--default');
    await assertAccessibleBasics(page);
  });

  test('checkbox story has accessible names and semantics', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-forms-checkbox--default');
    await assertAccessibleBasics(page);
  });

  test('dialog story has accessible names and semantics', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-overlays-dialog--default');
    await assertAccessibleBasics(page);
  });

  test('tabs story has accessible names and semantics', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-navigation-tabs--default');
    await assertAccessibleBasics(page);
  });

  test('keyboard can reach button', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-button--primary');
    const button = page.locator('bch-button button').first();
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('dialog has accessible label', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=bench-components-overlays-dialog--default');
    const dialog = page.locator('bch-dialog dialog').first();
    await expect(dialog).toHaveAttribute('aria-labelledby');
  });
});
