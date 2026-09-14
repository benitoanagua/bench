import { newSpecPage } from '@stencil/core/testing';
import { BchCombobox } from './combobox';
import { BchComboboxOption } from './combobox-option';

describe('bch-combobox', () => {
  it('filters options as the user types', async () => {
    const page = await newSpecPage({ components: [BchCombobox, BchComboboxOption] });
    const combobox = page.doc.createElement('bch-combobox') as HTMLElement & BchCombobox;
    combobox.name = 'country';
    page.body.appendChild(combobox);
    ['us', 'ca', 'mx'].forEach((value, i) => {
      const option = page.doc.createElement('bch-combobox-option');
      option.setAttribute('value', value);
      option.textContent = ['United States', 'Canada', 'Mexico'][i];
      combobox.appendChild(option);
    });
    await page.waitForChanges();

    const input = combobox.querySelector('input') as HTMLInputElement;
    input.value = 'can';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    const options = Array.from(combobox.querySelectorAll('bch-combobox-option'));
    const visible = options.filter((o) => o.hasAttribute('matched'));
    expect(visible.length).toBe(1);
    expect(visible[0].getAttribute('value')).toBe('ca');
  });

  it('emits bchChange when an option is selected', async () => {
    const page = await newSpecPage({ components: [BchCombobox, BchComboboxOption] });
    const combobox = page.doc.createElement('bch-combobox') as HTMLElement & BchCombobox;
    page.body.appendChild(combobox);
    const option = page.doc.createElement('bch-combobox-option');
    option.setAttribute('value', 'ca');
    option.textContent = 'Canada';
    combobox.appendChild(option);
    await page.waitForChanges();

    const spy = jest.fn();
    combobox.addEventListener('bchChange', (e: Event) => spy((e as CustomEvent<string>).detail));
    option.dispatchEvent(new CustomEvent('bchSelect', { detail: 'ca', bubbles: true }));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith('ca');
    expect(combobox.value).toBe('ca');
  });
});
