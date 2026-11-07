import { newSpecPage } from '@stencil/core/testing';
import { BchInput } from './input';

async function setup(html = '<bch-input label="Account" name="account"></bch-input>') {
  const page = await newSpecPage({
    components: [BchInput],
    html,
  });
  const input = page.root as HTMLElement & BchInput;
  return { page, input };
}

describe('bch-input', () => {
  it('renderiza el label vinculado y el input nativo', async () => {
    const { input } = await setup();
    const label = input.querySelector('label');
    const native = input.querySelector('input') as HTMLInputElement;

    expect(label?.htmlFor).toBe(native.id);
    expect(native.value).toBe('');
    expect(native.disabled).toBe(false);
  });

  it('input emite bchInput y change emite bchChange con el nuevo valor', async () => {
    const { page, input } = await setup();
    const onInput = jest.fn();
    const onChange = jest.fn();
    input.addEventListener('bchInput', (e) => onInput((e as CustomEvent).detail));
    input.addEventListener('bchChange', (e) => onChange((e as CustomEvent).detail));

    const native = input.querySelector('input') as HTMLInputElement;
    native.value = 'ada@bench.dev';
    native.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    native.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(onInput).toHaveBeenCalledWith('ada@bench.dev');
    expect(onChange).toHaveBeenCalledWith('ada@bench.dev');
    expect(input.value).toBe('ada@bench.dev');
  });

  it('error asigna aria-invalid y aria-describedby al mensaje de error', async () => {
    const { input } = await setup(
      '<bch-input label="Account" name="account" error="Required"></bch-input>',
    );
    expect(input.querySelector('input')?.getAttribute('aria-invalid')).toBe('true');
    const message = input.querySelector('[role="alert"]');
    expect(message?.textContent).toContain('Required');
    expect(input.querySelector('input')?.getAttribute('aria-describedby')).toContain(
      message?.id ?? '',
    );
  });

  it('disabled y readonly se propagan al input nativo', async () => {
    const { input } = await setup(
      '<bch-input label="Account" name="account" disabled="true" readonly="true"></bch-input>',
    );
    const native = input.querySelector('input') as HTMLInputElement;
    expect(native.disabled).toBe(true);
    expect(native.readOnly).toBe(true);
  });
});
