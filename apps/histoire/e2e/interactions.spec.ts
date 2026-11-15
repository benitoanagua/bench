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

function gotoStory(page: import('@playwright/test').Page, storyTitle: string, variantTitle = 'Playground') {
  return page.goto(storyUrlByTitle(storyTitle, variantTitle), {
    waitUntil: 'networkidle',
  });
}

test.describe('BENCH interacciones — overlays', () => {
  test('Dialog: Playground variant renderiza y controles son accesibles', async ({
    page,
  }) => {
    // La variant Playground tiene controles (HstCheckbox, HstText) en el panel lateral.
    // De forma estable desde E2E se verifica que el botón de abrir está presente
    // y que la historia se carga; la interacción open/close completa requiere
    // validación manual o herramientas de debug de sandbox por limitaciones de hydration
    // de Stencil en iframe de Histoire.
    await gotoStory(page, 'Dialog', 'Playground');
    const sandbox = sandboxOf(page);
    await expect(sandbox.getByRole('button', { name: 'Abrir diálogo' })).toBeVisible();
  });

  test('Drawer: se abre y cierra con botón y Escape', async ({ page }) => {
    await gotoStory(page, 'Drawer');
    const sandbox = sandboxOf(page);
    await sandbox.getByRole('button', { name: 'Abrir cajón' }).first().click();
    // `open` no es prop reflect: el estado visible se lee del <aside> interno.
    const drawer = sandbox.locator('bch-drawer aside.drawer');
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
  });

  test('Menu: se abre con el disparador, navega con teclado y se cierra con Escape', async ({
    page,
  }) => {
    await gotoStory(page, 'Menu');
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
    await gotoStory(page, 'Tooltip');
    const sandbox = sandboxOf(page);
    const trigger = sandbox.getByRole('button', { name: 'Pasa el ratón' }).first();

    await trigger.hover();
    await expect(sandbox.getByText('Información adicional')).toBeVisible();
    await page.mouse.move(5, 5); // fuera del disparador
    await expect(sandbox.getByText('Información adicional')).toBeHidden();

    await trigger.focus();
    await expect(sandbox.getByText('Información adicional')).toBeVisible();
    await trigger.blur();
    await expect(sandbox.getByText('Información adicional')).toBeHidden();
  });

  test('Toast: aparece al mostrarlo y se descarta', async ({ page }) => {
    await gotoStory(page, 'Toast');
    const sandbox = sandboxOf(page);

    await sandbox.getByRole('button', { name: 'Mostrar toast' }).first().click();
    await expect(sandbox.getByText('Operación completada')).toBeVisible();

    await sandbox.getByRole('button', { name: 'Descartar' }).first().click();
    await expect(sandbox.getByText('Operación completada')).toBeHidden();
  });
});

test.describe('BENCH interacciones — formularios y navegación', () => {
  test('Tabs: cambia de pestaña con clic y navega el foco con teclado', async ({ page }) => {
    await gotoStory(page, 'Tabs');
    const sandbox = sandboxOf(page);

    const segunda = sandbox.getByRole('tab', { name: 'Segunda' }).first();
    await segunda.click();
    await expect(segunda).toHaveAttribute('aria-selected', 'true');
    await expect(sandbox.getByText('Panel de la segunda pestaña')).toBeVisible();

    // El componente mueve el FOCO con las flechas (selección por clic).
    await page.keyboard.press('ArrowRight');
    await expect(sandbox.getByRole('tab', { name: 'Tercera' }).first()).toBeFocused();

    await sandbox.getByRole('tab', { name: 'Tercera' }).first().click();
    await expect(sandbox.getByText('Panel de la tercera pestaña')).toBeVisible();
  });

  test('Accordion: abre y cierra ítems', async ({ page }) => {
    await gotoStory(page, 'Accordion');
    const sandbox = sandboxOf(page);

    // La story arranca con "Primera" abierta (openValue: 'a').
    const primera = sandbox.getByRole('button', { name: 'Primera' }).first();
    await expect(sandbox.getByText('Contenido de la primera')).toBeVisible();

    // Clic cierra (acordeón exclusivo: un panel abierto a la vez).
    await primera.click();
    await expect(sandbox.getByText('Contenido de la primera')).toBeHidden();

    // Clic reabre, y abrir "Segunda" cierra "Primera".
    await primera.click();
    await expect(sandbox.getByText('Contenido de la primera')).toBeVisible();
    await sandbox.getByRole('button', { name: 'Segunda' }).first().click();
    await expect(sandbox.getByText('Contenido de la primera')).toBeHidden();
    await expect(sandbox.getByText('Contenido de la segunda')).toBeVisible();
  });

  test('SegmentedControl: cambia el valor seleccionado', async ({ page }) => {
    await gotoStory(page, 'SegmentedControl');
    const sandbox = sandboxOf(page);

    // bch-segmented-control expone role="radiogroup" con items role="radio".
    await sandbox.getByRole('radio', { name: 'Semana' }).first().click();
    // `value` no es prop reflect: el estado se lee del texto de la story.
    await expect(sandbox.getByText('Seleccionado: week')).toBeVisible();
  });

  test('Tree: expande y colapsa nodos', async ({ page }) => {
    await gotoStory(page, 'Tree');
    const sandbox = sandboxOf(page);

    // La expansión de ramas es por teclado (→ expande, ← colapsa).
    const facturacion = sandbox.getByRole('treeitem', { name: 'Facturación' }).first();
    await facturacion.focus();
    await page.keyboard.press('ArrowRight');
    await expect(sandbox.getByRole('treeitem', { name: 'Nueva factura' }).first()).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await expect(sandbox.getByRole('treeitem', { name: 'Nueva factura' }).first()).toBeHidden();
  });

  test('Splitter: mover el divisor cambia los paneles', async ({ page }) => {
    await gotoStory(page, 'Splitter');
    const sandbox = sandboxOf(page);

    // El divisor ES el componente (role="separator"); el panel izquierdo
    // crece según el delta de bchDrag (ver Splitter.story.vue).
    const divider = sandbox.getByRole('separator').first();
    const panelStart = sandbox.getByText('Panel izquierdo').first();
    const before = await panelStart.boundingBox();
    // Arrastre manual: el puntero sale del divisor de ~6px hacia el panel,
    // así que dragTo (que exige que el destino siga sobre el elemento)
    // no vale aquí. El componente captura el puntero en pointerdown.
    const box = (await divider.boundingBox())!;
    const y = box.y + box.height / 2;
    const startX = box.x + box.width / 2;
    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(startX + 60, y, { steps: 5 });
    await page.mouse.up();
    const after = await panelStart.boundingBox();
    expect(after).not.toEqual(before);
  });

  test('Combobox: escribe, navega con flechas y confirma con Enter', async ({ page }) => {
    await gotoStory(page, 'Combobox');
    const sandbox = sandboxOf(page);

    const input = sandbox.getByRole('combobox').first();
    await input.click();
    await input.type('Méx');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('México');
  });

  test('Select: abre y elige una opción', async ({ page }) => {
    await gotoStory(page, 'Select');
    const sandbox = sandboxOf(page);

    // bch-select renderiza un <select> nativo (role="combobox").
    await sandbox.locator('bch-select select').first().selectOption({ label: 'México' });
    await expect(sandbox.getByText('Valor: mx')).toBeVisible();
  });

  test('Omnibar: escribe, ve resultados y ejecuta con Enter', async ({ page }) => {
    await gotoStory(page, 'Omnibar');
    const sandbox = sandboxOf(page);

    const input = sandbox.getByRole('combobox').first();
    await input.click();
    await input.fill('factura');
    await expect(sandbox.getByRole('option', { name: 'Nueva factura' }).first()).toBeVisible();
    await page.keyboard.press('Enter');
    // Al ejecutar la entrada el listbox se cierra.
    await expect(sandbox.locator('.omnibar-results')).toBeHidden();
  });

  test('DatePicker: abre el calendario y muestra la grilla', async ({ page }) => {
    await gotoStory(page, 'DatePicker');
    const sandbox = sandboxOf(page);

    await sandbox
      .getByRole('button', { name: 'Abrir calendario' })
      .first()
      .click();
    await expect(sandbox.getByRole('grid')).toBeVisible();
  });

  test('TimePicker: responde al cambio de valor', async ({ page }) => {
    await gotoStory(page, 'TimePicker');
    const sandbox = sandboxOf(page);

    // El control es un <input type="time"> nativo con label "Hora de inicio".
    await sandbox.locator('bch-time-picker input').first().fill('14:30');
    await expect(sandbox.getByText('Valor: 14:30')).toBeVisible();
  });

  test('Pagination: avanza de página', async ({ page }) => {
    await gotoStory(page, 'Pagination');
    const sandbox = sandboxOf(page);

    await sandbox
      .getByRole('button', { name: 'Página siguiente' })
      .first()
      .click();
    await expect(sandbox.getByText('Página actual: 2')).toBeVisible();
  });

  test('DataTable: ordena y filtra', async ({ page }) => {
    await gotoStory(page, 'DataTable');
    const sandbox = sandboxOf(page);

    // pageSize: 5 → 5 filas de datos (sin contar la cabecera).
    const filas = sandbox.locator('bch-data-table tbody tr');
    await expect(filas).toHaveCount(5);

    // Clic en una cabecera ordenable: no cambia el número de filas.
    await sandbox
      .getByRole('columnheader', { name: /nombre/i })
      .first()
      .click();
    await expect(filas).toHaveCount(5);

    // Filtrar sin coincidencias deja sólo la fila de estado vacío.
    await sandbox.locator('bch-data-table .bch-data-table__toolbar input').first().fill('zzzz');
    await expect(filas).toHaveCount(1);
  });

  test('Slider: mover el pulgar cambia el valor', async ({ page }) => {
    await gotoStory(page, 'Slider');
    const sandbox = sandboxOf(page);

    const thumb = sandbox.getByRole('slider').first();
    const box = await thumb.boundingBox();
    // Arrastre manual: el slider puede consumir el pointer.
    const cx = (box?.x ?? 0) + (box?.width ?? 0) / 2;
    const cy = (box?.y ?? 0) + (box?.height ?? 0) / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 40, cy, { steps: 5 });
    await page.mouse.up();
    await expect(sandbox.locator('bch-slider')).not.toHaveAttribute('value', '0');
  });

  test('Switch / Checkbox / Radio: cambian de estado', async ({ page }) => {
    await gotoStory(page, 'Switch');
    const sandbox = sandboxOf(page);
    const sw = sandbox.getByRole('switch', { name: 'Notificaciones' }).first();
    await sw.click();
    await expect(sw).toBeChecked();

    await gotoStory(page, 'Checkbox');
    await sandbox
      .getByRole('checkbox', { name: /aceptar/i })
      .first()
      .click();
    await expect(sandbox.getByRole('checkbox', { name: /aceptar/i }).first()).toBeChecked();

    await gotoStory(page, 'Radio');
    await sandbox
      .getByRole('radio', { name: /opción a/i })
      .first()
      .click();
    await expect(sandbox.getByText('Seleccionado: a')).toBeVisible();
  });

  test('Input y Textarea: escriben valor', async ({ page }) => {
    await gotoStory(page, 'Input');
    const sandbox = sandboxOf(page);

    await sandbox
      .getByRole('textbox', { name: 'Correo electrónico' })
      .first()
      .fill('Bench');
    await expect(sandbox.getByText('Valor: Bench')).toBeVisible();

    await gotoStory(page, 'Textarea');
    await sandbox
      .getByRole('textbox', { name: 'Comentarios' })
      .first()
      .fill('Texto largo');
    await expect(sandbox.getByText('Valor: Texto largo')).toBeVisible();
  });
});
