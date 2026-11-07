import { newSpecPage } from '@stencil/core/testing';
import { BchSelect } from './select';

async function setup(html = '<bch-select label="Region" name="region"></bch-select>') {
  const page = await newSpecPage({
    components: [BchSelect],
    html,
  });
  return { page, select: page.root as HTMLElement & BchSelect };
}

describe('bch-select', () => {
  it('renderiza el label vinculado al select nativo', async () => {
    const { select } = await setup();
    const label = select.querySelector('label');
    const native = select.querySelector('select') as HTMLSelectElement;
    expect(label?.htmlFor).toBe(native.id);
    expect(native.hasAttribute('disabled')).toBe(false);
  });

  it('change emite bchChange con el valor del option elegido', async () => {
    const { page, select } = await setup(
      '<bch-select label="Region" name="region"><option value="">—</option><option value="us-east">US East</option></bch-select>',
    );
    // newSpecPage serializes slot children into light DOM; the select slot
    // carries them, but the native <select> needs them inside: move them.
    const native = select.querySelector('select') as HTMLSelectElement;
    for (const option of Array.from(select.querySelectorAll('option'))) {
      native.appendChild(option);
    }
    await page.waitForChanges();

    const spy = jest.fn();
    select.addEventListener('bchChange', (e) => spy((e as CustomEvent).detail));

    native.value = 'us-east';
    native.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith('us-east');
    expect(select.value).toBe('us-east');
  });

  it('error expone role de alerta y aria-invalid en el select', async () => {
    const { select } = await setup(
      '<bch-select label="Region" name="region" error="Choose one"></bch-select>',
    );
    expect(select.querySelector('select')?.getAttribute('aria-invalid')).toBe('true');
    expect(select.querySelector('[role="alert"]')?.textContent).toContain('Choose one');
  });

  it('disabled queda deshabilitado en el select nativo', async () => {
    const { select } = await setup(
      '<bch-select label="Region" name="region" disabled="true"></bch-select>',
    );
    const native = select.querySelector('select') as HTMLSelectElement;
    expect(native.hasAttribute('disabled')).toBe(true);
    expect(native.hasAttribute('required')).toBe(false);
  });
});
