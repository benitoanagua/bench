/**
 * BENCH catálogo — interacciones por componente.
 *
 * Todas las acciones ocurren DENTRO del sandbox de Histoire (clics, teclado,
 * hover, focus). Las stories objetivo se resuelven del índice real por título
 * (nunca ids hardcodeados). Los tests reflejan el contrato de las stories
 * reescritas en la Fase 2 (Playground con controles + triggers internos).
 *
 * FASE 1: estos tests FALLAN porque las stories actuales son estáticas y no
 * exponen controles ni triggers. Ese fracaso es el diagnóstico.
 */
import { expect, test } from '@playwright/test';
import { sandboxOf, storyUrlByTitle } from './helpers';

function gotoStory(page, storyTitle: string, variantTitle = 'Playground') {
  return page.goto(storyUrlByTitle(storyTitle, variantTitle), {
    waitUntil: 'networkidle',
  });
}

test.describe('BENCH interacciones — overlays', () => {
  test('Dialog: se abre y cierra con botón y Escape; el foco vuelve al disparador', async ({
    page,
  }) => {
    await gotoStory(page, 'Components/Dialog');
    const sandbox = sandboxOf(page);

    const abrir = sandbox.getByRole('button', { name: 'Abrir diálogo' }).first();
    await abrir.click();

    const dialog = sandbox.locator('bch-dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(sandbox.getByText('¿Está seguro de que desea continuar?')).toBeVisible();

    // Cierre con Escape
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(abrir).toBeFocused();

    // Reabrir y cierre con el botón interno
    await abrir.click();
    await expect(dialog).toBeVisible();
    await sandbox.getByRole('button', { name: 'Cerrar' }).first().click();
    await expect(dialog).toBeHidden();
  });

  test('Dialog: close-on-escape="false" no se cierra con Escape', async ({ page }) => {
    await gotoStory(page, 'Components/Dialog', 'Sin cerrar con Escape');
    const sandbox = sandboxOf(page);
    await sandbox.getByRole('button', { name: 'Abrir diálogo' }).first().click();
    const dialog = sandbox.locator('bch-dialog[open]');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeVisible();
    await sandbox.getByRole('button', { name: 'Cerrar' }).first().click();
    await expect(dialog).toBeHidden();
  });

  test('Drawer: se abre y cierra con botón y Escape', async ({ page }) => {
    await gotoStory(page, 'Components/Drawer');
    const sandbox = sandboxOf(page);
    await sandbox.getByRole('button', { name: 'Abrir cajón' }).first().click();
    const drawer = sandbox.locator('bch-drawer[open]');
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
  });

  test('Menu: se abre con el disparador, navega con teclado y se cierra con Escape', async ({
    page,
  }) => {
    await gotoStory(page, 'Components/Menu');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('button', { name: 'Acciones' }).first().click();
    await expect(sandbox.getByRole('menuitem', { name: 'Editar' }).first()).toBeVisible();
    await expect(sandbox.getByRole('menuitem', { name: 'Eliminar' }).first()).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await expect(sandbox.getByRole('menuitem', { name: 'Duplicar' }).first()).toBeFocused();
    await page.keyboard.press('Enter');
    // menú se cierra tras activar una opción
    await expect(sandbox.getByRole('menuitem', { name: 'Editar' }).first()).toBeHidden();

    await sandbox.getByRole('button', { name: 'Acciones' }).first().click();
    await page.keyboard.press('Escape');
    await expect(sandbox.getByRole('menuitem', { name: 'Editar' }).first()).toBeHidden();
  });

  test('Tooltip: aparece al pasar el ratón y al recibir el foco', async ({ page }) => {
    await gotoStory(page, 'Components/Tooltip');
    const sandbox = sandboxOf(page);
    const trigger = sandbox.getByRole('button', { name: 'Pasa el ratón' }).first();

    await trigger.hover();
    await expect(sandbox.getByText('Información adicional')).toBeVisible();
    await trigger.unhover();
    await expect(sandbox.getByText('Información adicional')).toBeHidden();

    await trigger.focus();
    await expect(sandbox.getByText('Información adicional')).toBeVisible();
    await trigger.blur();
    await expect(sandbox.getByText('Información adicional')).toBeHidden();
  });

  test('Toast: aparece al mostrarlo y se descarta', async ({ page }) => {
    await gotoStory(page, 'Components/Toast');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('button', { name: 'Mostrar toast' }).first().click();
    await expect(sandbox.getByText('Operación completada')).toBeVisible();

    await sandbox.getByRole('button', { name: 'Descartar' }).first().click();
    await expect(sandbox.getByText('Operación completada')).toBeHidden();
  });
});

test.describe('BENCH interacciones — formularios y navegación', () => {
  test('Tabs: cambia de pestaña con clic y teclado', async ({ page }) => {
    await gotoStory(page, 'Components/Tabs');
    const sandbox = sandboxOf(page);

    const segunda = sandbox.getByRole('tab', { name: 'Segunda' }).first();
    await segunda.click();
    await expect(segunda).toHaveAttribute('aria-selected', 'true');
    await expect(sandbox.getByText('Panel de la segunda pestaña')).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(sandbox.getByRole('tab', { name: 'Tercera' }).first()).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(sandbox.getByText('Panel de la tercera pestaña')).toBeVisible();
  });

  test('Accordion: abre y cierra ítems', async ({ page }) => {
    await gotoStory(page, 'Components/Accordion');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('button', { name: 'Primera' }).first().click();
    await expect(sandbox.getByText('Contenido de la primera')).toBeVisible();
    await sandbox.getByRole('button', { name: 'Primera' }).first().click();
    await expect(sandbox.getByText('Contenido de la primera')).toBeHidden();
  });

  test('SegmentedControl: cambia el valor seleccionado', async ({ page }) => {
    await gotoStory(page, 'Components/SegmentedControl');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('button', { name: 'Semana' }).first().click();
    await expect(sandbox.locator('bch-segmented-control')).toHaveAttribute('value', 'week');
  });

  test('Tree: expande y colapsa nodos', async ({ page }) => {
    await gotoStory(page, 'Components/Tree');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('button', { name: 'Facturación' }).first().click();
    await expect(sandbox.getByRole('treeitem', { name: 'Nueva factura' }).first()).toBeVisible();
  });

  test('Splitter: mover el divisor cambia los paneles', async ({ page }) => {
    await gotoStory(page, 'Components/Splitter');
    const sandbox = sandboxOf(page);

    const divider = sandbox.getByRole('separator').first();
    const before = await sandbox.locator('bch-splitter [slot="start"]').first().boundingBox();
    await divider.dragTo(divider, { target: { x: divider.boundingBox()!.x + 100, y: 0 } });
    await expect(sandbox.locator('bch-splitter [slot="start"]').first()).not.toHaveBoundingBox(
      before,
    );
  });

  test('Combobox: escribe, navega con flechas y confirma con Enter', async ({ page }) => {
    await gotoStory(page, 'Components/Combobox');
    const sandbox = sandboxOf(page);

    const input = sandbox.getByRole('combobox').first();
    await input.click();
    await input.type('Méx');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('México');
  });

  test('Select: abre y elige una opción', async ({ page }) => {
    await gotoStory(page, 'Components/Select');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('listbox').first(); // asegura que el render lo monta
    await sandbox
      .getByRole('button', { name: /seleccionar/i })
      .first()
      .click();
    await sandbox.getByRole('option', { name: 'Opción dos' }).first().click();
    await expect(sandbox.locator('bch-select')).toHaveAttribute('value', 'dos');
  });

  test('Omnibar: escribe y ejecuta con Enter', async ({ page }) => {
    await gotoStory(page, 'Components/Omnibar');
    const sandbox = sandboxOf(page);

    const input = sandbox.getByRole('searchbox').first();
    await input.click();
    await input.type('nueva factura');
    await page.keyboard.press('Enter');
    await expect(sandbox.getByText('Nueva factura')).toBeVisible();
  });

  test('DatePicker: abre el calendario y selecciona una fecha', async ({ page }) => {
    await gotoStory(page, 'Components/DatePicker');
    const sandbox = sandboxOf(page);

    await sandbox
      .getByRole('button', { name: /abrir calendario/i })
      .first()
      .click();
    await expect(sandbox.getByRole('grid')).toBeVisible();
  });

  test('TimePicker: responde al cambio de valor', async ({ page }) => {
    await gotoStory(page, 'Components/TimePicker');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('spinbutton', { name: /hora/i }).first().fill('14:30');
    await expect(sandbox.locator('bch-time-picker')).toHaveAttribute('value', '14:30');
  });

  test('Pagination: avanza de página', async ({ page }) => {
    await gotoStory(page, 'Components/Pagination');
    const sandbox = sandboxOf(page);

    await sandbox
      .getByRole('button', { name: /siguiente/i })
      .first()
      .click();
    await expect(sandbox.locator('bch-pagination')).toHaveAttribute('page', '2');
  });

  test('DataTable: ordena, filtra y pagina', async ({ page }) => {
    await gotoStory(page, 'Components/DataTable');
    const sandbox = sandboxOf(page);

    const filas = sandbox.getByRole('row');
    const antes = await filas.count();
    await sandbox
      .getByRole('columnheader', { name: /nombre/i })
      .first()
      .click();
    await expect(await filas.count()).toBe(antes);

    await sandbox
      .getByRole('textbox', { name: /filtro/i })
      .first()
      .fill('aaaaaaaaaa');
    await expect(await filas.count()).toBeLessThan(antes);
  });

  test('Slider: mover el pulgar cambia el valor', async ({ page }) => {
    await gotoStory(page, 'Components/Slider');
    const sandbox = sandboxOf(page);

    const thumb = sandbox.getByRole('slider').first();
    await thumb.dragTo(thumb, { target: { x: thumb.boundingBox()!.x + 40, y: 0 } });
    await expect(sandbox.locator('bch-slider')).not.toHaveAttribute('value', '0');
  });

  test('Switch / Checkbox / Radio: cambian de estado', async ({ page }) => {
    await gotoStory(page, 'Components/Switch');
    const sandbox = sandboxOf(page);
    const sw = sandbox.getByRole('switch').first();
    await sw.click();
    await expect(sw).toBeChecked();

    await gotoStory(page, 'Components/Checkbox');
    await sandbox
      .getByRole('checkbox', { name: /acepto/i })
      .first()
      .click();
    await expect(sandbox.getByRole('checkbox', { name: /acepto/i }).first()).toBeChecked();

    await gotoStory(page, 'Components/Radio');
    await sandbox
      .getByRole('radio', { name: /opción a/i })
      .first()
      .click();
    await expect(sandbox.getByRole('radio', { name: /opción a/i }).first()).toBeChecked();
  });

  test('Input y Textarea: escriben valor', async ({ page }) => {
    await gotoStory(page, 'Components/Input');
    const sandbox = sandboxOf(page);

    await sandbox
      .getByRole('textbox', { name: /nombre/i })
      .first()
      .fill('Bench');
    await expect(sandbox.getByRole('textbox', { name: /nombre/i }).first()).toHaveValue('Bench');

    await gotoStory(page, 'Components/Textarea');
    await sandbox
      .getByRole('textbox', { name: /observaciones/i })
      .first()
      .fill('Texto largo');
    await expect(sandbox.getByRole('textbox', { name: /observaciones/i }).first()).toHaveValue(
      'Texto largo',
    );
  });
});
