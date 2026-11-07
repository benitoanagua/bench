import { newSpecPage } from '@stencil/core/testing';
import { BchCheckbox } from './checkbox';

async function setup(html = '<bch-checkbox label="Theory" name="theory"></bch-checkbox>') {
  const page = await newSpecPage({
    components: [BchCheckbox],
    html,
  });
  return { page, checkbox: page.root as HTMLElement & BchCheckbox };
}

describe('bch-checkbox', () => {
  it('renderiza el label con el input nativo dentro', async () => {
    const { checkbox } = await setup();
    const label = checkbox.querySelector('label');
    const native = checkbox.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(label?.contains(native)).toBe(true);
    expect(native.checked).toBe(false);
    expect(native.name).toBe('theory');
  });

  it('cambiar el input emite bchChange(bool) y refleja checked', async () => {
    const { page, checkbox } = await setup();
    const spy = jest.fn();
    checkbox.addEventListener('bchChange', (e) => spy((e as CustomEvent<boolean>).detail));

    const native = checkbox.querySelector('input') as HTMLInputElement;
    native.checked = true;
    native.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(true);
    expect(checkbox.checked).toBe(true);
  });

  it('disabled y required llegan al input nativo', async () => {
    const { checkbox } = await setup(
      '<bch-checkbox label="Theory" name="theory" disabled="true" required="true"></bch-checkbox>',
    );
    const native = checkbox.querySelector('input') as HTMLInputElement;
    expect(native.disabled).toBe(true);
    expect(checkbox.querySelector('input')?.required).toBe(true);
  });

  it('value del formulario es configurable', async () => {
    const { checkbox } = await setup(
      '<bch-checkbox label="Theory" name="theory" value="deep"></bch-checkbox>',
    );
    expect(checkbox.querySelector('input')?.value).toBe('deep');
  });
});
