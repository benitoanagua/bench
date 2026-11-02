import { newSpecPage } from '@stencil/core/testing';
import { BchSlider } from './slider';

async function setup(attributes = '') {
  const page = await newSpecPage({
    components: [BchSlider],
    html: `<bch-slider label="Volume" value="40" ${attributes}></bch-slider>`,
  });
  const slider = page.root as HTMLElement & BchSlider;
  return { page, slider };
}

describe('bch-slider', () => {
  it('renderiza label, valor visible y el rango nativo', async () => {
    const { slider } = await setup('show-value="true"');
    const input = slider.querySelector('input[type="range"]') as HTMLInputElement;
    expect(slider.querySelector('label')?.textContent).toBe('Volume');
    expect(slider.querySelector('.bch-slider__value')?.textContent).toBe('40');
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
    expect(input.value).toBe('40');
  });

  it('input emite bchInput y actualiza value', async () => {
    const { page, slider } = await setup();
    const spy = jest.fn();
    slider.addEventListener('bchInput', (event: Event) => spy((event as CustomEvent).detail));
    const input = slider.querySelector('input') as HTMLInputElement;

    input.value = '72';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(72);
    expect(slider.value).toBe(72);
  });

  it('change emite bchChange (confirmación, no por keystroke)', async () => {
    const { page, slider } = await setup();
    const spy = jest.fn();
    slider.addEventListener('bchChange', (event: Event) => spy((event as CustomEvent).detail));
    const input = slider.querySelector('input') as HTMLInputElement;

    input.value = '55';
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(55);
    expect(slider.value).toBe(55);
  });

  it('respeta disabled', async () => {
    const { slider } = await setup('disabled="true"');
    expect((slider.querySelector('input') as HTMLInputElement).disabled).toBe(true);
  });
});
