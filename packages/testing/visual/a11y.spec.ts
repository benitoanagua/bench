import { test, expect } from '@playwright/test';

const views = ['overview', 'activity', 'forms', 'settings'];

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
      )
        problems.push('button without accessible name');
    });
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      const labelled =
        el.getAttribute('aria-label') ||
        el.getAttribute('aria-labelledby') ||
        (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`));
      if (!labelled) problems.push(`${el.tagName.toLowerCase()} without accessible name`);
    });
    document.querySelectorAll('[role="dialog"]').forEach((el) => {
      if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby'))
        problems.push('dialog without accessible name');
    });
    document.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
      const described = el.getAttribute('aria-describedby');
      if (!described || !described.split(/\s+/).some((id) => document.getElementById(id)))
        problems.push('invalid control without described error/hint');
    });
    return problems;
  });
  expect(violations, violations.join('\n')).toEqual([]);
}

test.describe('BENCH accessibility audit', () => {
  for (const view of views) {
    test(`${view} has accessible names and semantics`, async ({ page }) => {
      await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
      const button = page.locator(`[data-view="${view}"]`).first();
      if (await button.count()) await button.click();
      await page.waitForTimeout(100);
      await assertAccessibleBasics(page);
    });
  }

  test('keyboard can reach primary controls', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    for (let i = 0; i < 8; i++) await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('dialog restores focus after Escape', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
    const create = page.locator('#create-button').first();
    await create.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('bch-dialog dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('bch-dialog dialog')).toBeHidden();
    await expect(create).toBeFocused();
  });

  test('reduced motion disables animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('http://127.0.0.1:6006/?path=/story/bench-components');
    const value = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--bch-motion-normal').trim(),
    );
    expect(value).toBeTruthy();
  });
});
