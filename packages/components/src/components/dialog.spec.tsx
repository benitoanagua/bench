import { newSpecPage } from '@stencil/core/testing';
import { BchDialog } from './dialog';

async function setup(attributes = '') {
  const page = await newSpecPage({
    components: [BchDialog],
    html: `<bch-dialog label="Confirm" ${attributes}><p>Body</p></bch-dialog>`,
  });
  const dialog = page.root as HTMLElement & BchDialog;
  // mock-doc has no native <dialog> behaviour, so patch the actual element
  // instance that the component holds via its ref.
  const native = dialog.querySelector('dialog') as HTMLDialogElement;
  Object.defineProperty(native, 'open', {
    configurable: true,
    get: () => native.hasAttribute('open'),
  });
  (native as unknown as { showModal: () => void }).showModal = jest.fn(() => {
    native.setAttribute('open', '');
  });
  (native as unknown as { close: () => void }).close = jest.fn(() => {
    native.removeAttribute('open');
  });
  return { page, dialog };
}

describe('bch-dialog', () => {
  it('abre y cierra con la prop open, emitiendo bchOpen/bchClose', async () => {
    const { page, dialog } = await setup();
    const open = jest.fn();
    const close = jest.fn();
    dialog.addEventListener('bchOpen', open);
    dialog.addEventListener('bchClose', close);

    dialog.open = true;
    await page.waitForChanges();
    expect(open).toHaveBeenCalledTimes(1);
    expect(dialog.querySelector('dialog')?.hasAttribute('open')).toBe(true);

    dialog.open = false;
    await page.waitForChanges();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('show() y close() son la API imperativa equivalente', async () => {
    const { page, dialog } = await setup();
    await dialog.show();
    await page.waitForChanges();
    expect(dialog.open).toBe(true);

    await dialog.close();
    await page.waitForChanges();
    expect(dialog.open).toBe(false);
  });

  it('usa el label como nombre accesible', async () => {
    const { dialog } = await setup();
    const native = dialog.querySelector('dialog')!;
    expect(native.getAttribute('aria-labelledby')).toBe(`${dialog.id || 'bch-dialog'}-title`);
    expect(dialog.querySelector('h2')?.textContent).toBe('Confirm');
  });

  it('Escape cierra solo cuando closeOnEscape no está desactivado', async () => {
    const { page, dialog } = await setup();
    dialog.open = true;
    await page.waitForChanges();
    const native = dialog.querySelector('dialog')!;

    const cancel = new Event('cancel', { cancelable: true });
    native.dispatchEvent(cancel);
    await page.waitForChanges();
    expect(dialog.open).toBe(false);

    const strict = await setup();
    strict.dialog.closeOnEscape = false;
    strict.dialog.open = true;
    await strict.page.waitForChanges();
    const strictNative = strict.dialog.querySelector('dialog')!;
    const prevented = new Event('cancel', { cancelable: true });
    strictNative.dispatchEvent(prevented);
    await strict.page.waitForChanges();
    expect(prevented.defaultPrevented).toBe(true);
    expect(strict.dialog.open).toBe(true);
  });
});
