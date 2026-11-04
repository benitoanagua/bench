import { test, expect } from '@playwright/test';

/**
 * Demos de los patrones de aplicación de tier (c) — ADR-009.
 *
 * Cada test cubre una demo de la vista "Patterns" del showcase, que es la
 * versión ejecutable de las guías de docs/integrations/patterns/.
 */

const DEMO_IDS = [
  'demo-command-palette',
  'demo-context-menu',
  'demo-layout-persistence',
  'demo-inspector',
  'demo-workspace',
  'demo-window-placement',
  'demo-record-cards',
  'demo-modes',
  'demo-balloon-help',
  'demo-macros',
  'demo-apply',
  'demo-undo',
  'demo-templates',
  'demo-persistence',
  'demo-secure-fields',
];

async function openPatterns(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Patterns' }).first().click();
  await expect(page.locator('#page-title')).toHaveText('Patterns');
}

test('the patterns view exposes one demo per tier (c) guide', async ({ page }) => {
  await openPatterns(page);
  for (const id of DEMO_IDS) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test('§4.1 the palette opens with Ctrl+K and runs the selected function', async ({ page }) => {
  await openPatterns(page);
  await page.keyboard.press('Control+k');
  await expect(page.locator('#palette-dialog dialog')).toBeVisible();

  await page.locator('#palette-omnibar input').fill('nueva');
  await page.locator('#palette-omnibar .omnibar-result').first().click();
  await expect(page.locator('#palette-status')).toContainText('Nueva factura');
});

test('§4.1 the leader sequence arms the mode badge', async ({ page }) => {
  await openPatterns(page);
  await page.locator('#demo-command-palette').click();
  await page.keyboard.press('g');
  await expect(page.locator('#palette-leader')).toContainText('Leader armed');
  await page.keyboard.press('f');
  await expect(page.locator('#palette-status')).toContainText('Panel de facturación');
});

test('§4.2 the context menu reports the chosen action', async ({ page }) => {
  await openPatterns(page);
  await page.getByRole('button', { name: 'Invoice actions' }).click();
  await expect(page.getByRole('menu', { name: 'Invoice actions' })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Duplicate' }).click();
  await expect(page.locator('#context-status')).toContainText('duplicate');
});

test('§4.3 the splitter delta is applied by the application and persisted', async ({ page }) => {
  await openPatterns(page);
  const pane = page.locator('#layout-pane-left');
  const before = await pane.evaluate((el) => el.getBoundingClientRect().width);

  // The focusable element is the separator itself, not the custom element host.
  await page.locator('#layout-splitter [role="separator"]').focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(100);

  const after = await pane.evaluate((el) => el.getBoundingClientRect().width);
  expect(after).toBeGreaterThan(before);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('bench.showcase.layout.v1')))
    .not.toBeNull();
});

test('§4.3 selecting a node fills the inspector drawer', async ({ page }) => {
  await openPatterns(page);
  await page.locator('#inspector-tree bch-tree-item').first().click();
  await expect(page.locator('#inspector-drawer .drawer')).toBeVisible();
  await expect(page.locator('#inspector-client input')).toHaveValue('AC Constructores');
});

test('§4.3 switching workspace swaps the tab group and keeps the state', async ({ page }) => {
  await openPatterns(page);
  await page.getByRole('button', { name: 'Switch workspace' }).click();
  await page.getByRole('menuitem', { name: 'Operations' }).click();

  await expect(page.locator('#workspace-finance')).toBeHidden();
  await expect(page.locator('#workspace-operations')).toBeVisible();
  await expect(page.locator('#workspace-status')).toContainText('Operations');

  await page.getByRole('button', { name: 'Switch workspace' }).click();
  await page.getByRole('menuitem', { name: 'Finance' }).click();
  await expect(page.locator('#workspace-finance')).toBeVisible();
});

test('§4.3 the screen detection degrades when the API cannot be used', async ({ page }) => {
  await openPatterns(page);
  await page.getByRole('button', { name: 'Detect screens' }).click();
  // Either the API is missing or the permission is denied: both degrade to the
  // current window, without breaking the surface.
  await expect(page.locator('#screens-status')).toContainText('current window');
});

test('§4.3 a record card opens its detail in the drawer', async ({ page }) => {
  await openPatterns(page);
  await page.locator('#record-grid bch-card').first().click();
  await expect(page.locator('#record-drawer .drawer')).toBeVisible();
  await expect(page.locator('#record-detail')).toContainText('Invoice #4381');
});

test('§4.4 the mode badge follows the segmented control', async ({ page }) => {
  await openPatterns(page);
  await expect(page.locator('#mode-badge')).toContainText('Select');
  await page.getByRole('radio', { name: 'Edit' }).click();
  await expect(page.locator('#mode-badge')).toContainText('Edit');
  await expect(page.locator('#mode-surface')).toHaveAttribute('data-mode', 'edit');
});

test('§4.5 a macro records steps and replays them', async ({ page }) => {
  await openPatterns(page);
  await page.getByRole('button', { name: 'Record macro' }).click();
  await page.getByRole('button', { name: 'Add step' }).click();
  await page.getByRole('button', { name: 'Stop recording' }).click();
  await expect(page.locator('#macro-steps li')).toHaveCount(1);

  await page.getByRole('button', { name: 'Replay macro' }).click();
  await expect(page.locator('#macro-status')).toContainText('Replayed 1 step');
});

test('§4.5 the apply pattern separates snapshot, live edit and discard', async ({ page }) => {
  await openPatterns(page);
  await expect(page.locator('#apply-status')).toContainText('Applied');

  await page.locator('#apply-input input').fill('Globex');
  await expect(page.locator('#apply-status')).toContainText('Unsaved changes');

  await page.locator('#apply-discard button').click();
  await expect(page.locator('#apply-input input')).toHaveValue('AC Constructores');
  await expect(page.locator('#apply-status')).toContainText('Applied');
});

test('§4.5 the history panel undoes the last action', async ({ page }) => {
  await openPatterns(page);
  await page.getByRole('button', { name: 'Rename client' }).click();
  await expect(page.locator('#undo-list li')).toHaveCount(1);
  await expect(page.locator('#undo-size')).toContainText('1 action');

  await page.getByRole('button', { name: 'Undo: Rename client' }).click();
  await expect(page.locator('#undo-list li')).toHaveCount(0);
});

test('§4.5 a provisional template leaves the provisional area when confirmed', async ({ page }) => {
  await openPatterns(page);
  await expect(page.locator('#template-draft')).toContainText('Draft');
  await page.locator('#template-confirm button').click();
  await expect(page.locator('#template-draft')).toHaveCount(0);
  await expect(page.locator('#template-grid')).toContainText('Confirmed');
});

test('§4.6 the note is persisted from the worker and recovered', async ({ page }) => {
  await openPatterns(page);
  await page.locator('#persistence-note input').fill('Nota de prueba');
  await page.getByRole('button', { name: 'Save note' }).click();
  await expect(page.locator('#persistence-status')).toContainText('Note saved');

  await page.locator('#persistence-note input').fill('');
  await page.getByRole('button', { name: 'Recover note' }).click();
  await expect(page.locator('#persistence-note input')).toHaveValue('Nota de prueba');
});

test('§4.6 the organization selector states the active context', async ({ page }) => {
  await openPatterns(page);
  await expect(page.locator('#org-context')).toContainText('AC Constructores');
  await page.locator('#secure-org select').selectOption('globex');
  await expect(page.locator('#org-context')).toContainText('Globex');
});
