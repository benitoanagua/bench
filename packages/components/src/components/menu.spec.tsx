import { newSpecPage } from '@stencil/core/testing';
import { BchMenu } from './menu';
import { BchMenuItem } from './menu-item';

const html = `
  <bch-menu label="Actions">
    <bch-button slot="trigger">Open menu</bch-button>
    <bch-menu-item value="edit">Edit</bch-menu-item>
    <bch-menu-item value="delete" tone="danger">Delete</bch-menu-item>
    <bch-menu-item value="disabled" disabled="true">Disabled</bch-menu-item>
  </bch-menu>
`;

async function setup() {
  const page = await newSpecPage({ components: [BchMenu, BchMenuItem], html });
  const menu = page.root as HTMLElement & BchMenu;
  return { page, menu };
}

describe('bch-menu', () => {
  it('show/close cambian open y emiten bchOpenChange', async () => {
    const { page, menu } = await setup();
    const spy = jest.fn();
    menu.addEventListener('bchOpenChange', (event: Event) =>
      spy((event as CustomEvent<boolean>).detail),
    );

    await menu.show();
    await page.waitForChanges();
    expect(menu.open).toBe(true);
    expect(spy).toHaveBeenLastCalledWith(true);

    await menu.close();
    await page.waitForChanges();
    expect(menu.open).toBe(false);
    expect(spy).toHaveBeenLastCalledWith(false);
  });

  it('seleccionar un item emite bchSelect y cierra el menú', async () => {
    const { page, menu } = await setup();
    const spy = jest.fn();
    menu.addEventListener('bchSelect', (event: Event) => spy((event as CustomEvent).detail));
    await menu.show();
    await page.waitForChanges();

    (menu.querySelector('bch-menu-item[value="edit"] button') as HTMLButtonElement).click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith('edit');
    expect(menu.open).toBe(false);
  });

  it('un item disabled no emite bchSelect', async () => {
    const { page, menu } = await setup();
    const spy = jest.fn();
    menu.addEventListener('bchSelect', (event: Event) => spy((event as CustomEvent).detail));
    await menu.show();
    await page.waitForChanges();

    const button = menu.querySelector(
      'bch-menu-item[value="disabled"] button',
    ) as HTMLButtonElement;
    expect(button.hasAttribute('disabled')).toBe(true);
    button.click();
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('Escape cierra el menú', async () => {
    const { page, menu } = await setup();
    await menu.show();
    await page.waitForChanges();

    menu
      .querySelector('.bch-menu')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();

    expect(menu.open).toBe(false);
  });
});
