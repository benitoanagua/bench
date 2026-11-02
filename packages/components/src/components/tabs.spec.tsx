import { newSpecPage } from '@stencil/core/testing';
import { BchTab } from './tab';
import { BchTabPanel } from './tab-panel';
import { BchTabs } from './tabs';

const html = `
  <bch-tabs value="a">
    <bch-tab value="a" active="true">Overview</bch-tab>
    <bch-tab value="b">Activity</bch-tab>
    <bch-tab value="c" disabled="true">Settings</bch-tab>
    <bch-tab-panel value="a">Overview content</bch-tab-panel>
    <bch-tab-panel value="b">Activity content</bch-tab-panel>
    <bch-tab-panel value="c">Settings content</bch-tab-panel>
  </bch-tabs>
`;

async function setup() {
  const page = await newSpecPage({ components: [BchTabs, BchTab, BchTabPanel], html });
  const tabs = page.root as HTMLElement & BchTabs;
  return { page, tabs };
}

describe('bch-tabs', () => {
  it('sincroniza active y hidden con el value inicial', async () => {
    const { tabs } = await setup();
    const tab = (value: string) => tabs.querySelector(`bch-tab[value="${value}"]`)!;
    const panel = (value: string) => tabs.querySelector(`bch-tab-panel[value="${value}"]`)!;

    expect(tab('a').getAttribute('active')).toBe('true');
    expect(tab('b').getAttribute('active')).toBe('false');
    expect((panel('a') as HTMLElement).hidden).toBe(false);
    expect((panel('b') as HTMLElement).hidden).toBe(true);
  });

  it('click en un tab emite bchPress y bchChange, y cambia el panel visible', async () => {
    const { page, tabs } = await setup();
    const press = jest.fn();
    const change = jest.fn();
    tabs.addEventListener('bchPress', (event: Event) => press((event as CustomEvent).detail));
    tabs.addEventListener('bchChange', (event: Event) => change((event as CustomEvent).detail));

    const button = tabs.querySelector('bch-tab[value="b"] button') as HTMLButtonElement;
    button.click();
    await page.waitForChanges();

    expect(press).toHaveBeenCalledWith('b');
    expect(change).toHaveBeenCalledWith('b');
    expect(tabs.value).toBe('b');
    expect((tabs.querySelector('bch-tab-panel[value="b"]') as HTMLElement).hidden).toBe(false);
    expect((tabs.querySelector('bch-tab-panel[value="a"]') as HTMLElement).hidden).toBe(true);
  });

  it('un tab disabled no emite ni cambia el value', async () => {
    const { page, tabs } = await setup();
    const change = jest.fn();
    tabs.addEventListener('bchChange', (event: Event) => change((event as CustomEvent).detail));

    const button = tabs.querySelector('bch-tab[value="c"] button') as HTMLButtonElement;
    button.click();
    await page.waitForChanges();

    expect(change).not.toHaveBeenCalled();
    expect(tabs.value).toBe('a');
  });

  it('ArrowRight/ArrowLeft mueven el foco entre tabs habilitados', async () => {
    const { page, tabs } = await setup();
    const first = tabs.querySelector('bch-tab[value="a"] button') as HTMLButtonElement;
    const second = tabs.querySelector('bch-tab[value="b"] button') as HTMLButtonElement;
    // mock-doc does not implement document.activeElement, so assert the
    // focus intent instead of the resulting active node.
    const firstFocus = jest.spyOn(first, 'focus').mockImplementation(() => undefined);
    const secondFocus = jest.spyOn(second, 'focus').mockImplementation(() => undefined);

    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await page.waitForChanges();
    expect(secondFocus).toHaveBeenCalled();

    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await page.waitForChanges();
    expect(firstFocus).toHaveBeenCalled();
  });
});
