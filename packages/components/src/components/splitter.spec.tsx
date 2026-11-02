import { newSpecPage } from '@stencil/core/testing';
import { BchSplitter } from './splitter';
import { BCH_SPLITTER_KEY_STEP } from './splitter-bounds';

async function setup(orientation: 'horizontal' | 'vertical' = 'horizontal') {
  const page = await newSpecPage({
    components: [BchSplitter],
    html: `<bch-splitter orientation="${orientation}"></bch-splitter>`,
  });
  const splitter = page.root as HTMLElement & BchSplitter;
  const spy = jest.fn();
  splitter.addEventListener('bchDrag', (event: Event) =>
    spy((event as CustomEvent<{ deltaPx: number }>).detail.deltaPx),
  );
  return { page, splitter, spy };
}

describe('bch-splitter', () => {
  it('expone role separator y describe la línea visual', async () => {
    const { splitter } = await setup('horizontal');
    const separator = splitter.querySelector('[role="separator"]')!;
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
    expect(separator.classList.contains('is-horizontal')).toBe(true);
  });

  it('en horizontal, ArrowLeft/ArrowRight emiten el delta de teclado', async () => {
    const { page, splitter, spy } = await setup('horizontal');
    const separator = splitter.querySelector('[role="separator"]')!;

    separator.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    separator.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenNthCalledWith(1, -BCH_SPLITTER_KEY_STEP);
    expect(spy).toHaveBeenNthCalledWith(2, BCH_SPLITTER_KEY_STEP);
  });

  it('en vertical, ArrowUp/ArrowDown emiten el delta y cambia aria-orientation', async () => {
    const { page, splitter, spy } = await setup('vertical');
    const separator = splitter.querySelector('[role="separator"]')!;
    expect(separator.getAttribute('aria-orientation')).toBe('horizontal');

    separator.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    separator.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenNthCalledWith(1, -BCH_SPLITTER_KEY_STEP);
    expect(spy).toHaveBeenNthCalledWith(2, BCH_SPLITTER_KEY_STEP);
  });

  it('ignora teclas no relacionadas', async () => {
    const { page, splitter, spy } = await setup();
    splitter
      .querySelector('[role="separator"]')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });
});
