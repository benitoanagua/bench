import { newSpecPage } from '@stencil/core/testing';
import { BchDrawer } from './drawer';

async function setup(side = 'end') {
  const page = await newSpecPage({
    components: [BchDrawer],
    html: `<bch-drawer label="Navigation" side="${side}"><p>Body</p></bch-drawer>`,
  });
  const drawer = page.root as HTMLElement & BchDrawer;
  return { page, drawer };
}

describe('bch-drawer', () => {
  it('abre y cierra emitiendo bchOpen/bchClose y gestionando el body', async () => {
    const { page, drawer } = await setup();
    const open = jest.fn();
    const close = jest.fn();
    drawer.addEventListener('bchOpen', open);
    drawer.addEventListener('bchClose', close);

    drawer.open = true;
    await page.waitForChanges();
    expect(open).toHaveBeenCalledTimes(1);
    expect(document.body.classList.contains('bch-drawer-open')).toBe(true);
    expect(drawer.querySelector('.drawer-root')?.hasAttribute('hidden')).toBe(false);

    drawer.open = false;
    await page.waitForChanges();
    expect(close).toHaveBeenCalledTimes(1);
    expect(document.body.classList.contains('bch-drawer-open')).toBe(false);
    expect(drawer.querySelector('.drawer-root')?.hasAttribute('hidden')).toBe(true);
  });

  it('es un offcanvas no modal: no declara role dialog ni aria-modal', async () => {
    const { page, drawer } = await setup('start');
    drawer.open = true;
    await page.waitForChanges();

    const aside = drawer.querySelector('aside.drawer')!;
    expect(aside.classList.contains('is-start')).toBe(true);
    expect(aside.getAttribute('role')).toBeNull();
    expect(aside.getAttribute('aria-modal')).toBeNull();
  });

  it('Escape cierra y closeOnEscape=false lo impide', async () => {
    const { page, drawer } = await setup();
    drawer.open = true;
    await page.waitForChanges();

    drawer
      .querySelector('.drawer-root')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();
    expect(drawer.open).toBe(false);

    drawer.closeOnEscape = false;
    drawer.open = true;
    await page.waitForChanges();
    drawer
      .querySelector('.drawer-root')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();
    expect(drawer.open).toBe(true);
  });

  it('el botón de cierre cierra el panel', async () => {
    const { page, drawer } = await setup();
    drawer.open = true;
    await page.waitForChanges();

    (drawer.querySelector('.drawer .close') as HTMLButtonElement).click();
    await page.waitForChanges();
    expect(drawer.open).toBe(false);
  });
});
