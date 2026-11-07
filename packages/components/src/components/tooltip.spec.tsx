import { newSpecPage } from '@stencil/core/testing';
import { BchTooltip } from './tooltip';

async function setup(attributes = '') {
  const page = await newSpecPage({
    components: [BchTooltip],
    html: `<bch-tooltip text="Copied to clipboard" ${attributes}><span>Copy</span></bch-tooltip>`,
  });
  return { page, tooltip: page.root as HTMLElement & BchTooltip };
}

describe('bch-tooltip', () => {
  it('no renderiza contenido del tooltip cerrado', async () => {
    const { tooltip } = await setup();
    expect(tooltip.querySelector('.tooltip')).toBeNull();
    expect(tooltip.textContent).toContain('Copy');
  });

  it('cerrado no expone aria-describedby en el trigger', async () => {
    const { tooltip } = await setup();
    expect(tooltip.querySelector('span')?.getAttribute('aria-describedby')).toBeNull();
  });

  it('mouseenter abre el bubble con el placement elegido y vincula aria-describedby', async () => {
    const { page, tooltip } = await setup('placement="bottom"');

    // The adaptive delay (§4.4) schedules the open with `window.setTimeout`;
    // the mock DOM has no real timers worth waiting 450ms for, so collapse the
    // scheduling to synchronous. What the spec locks is the rendering
    // contract the delay logic exists to trigger.
    const timers = jest
      .spyOn(window, 'setTimeout')
      .mockImplementation(((fn: () => void) => (fn(), 0)) as unknown as typeof setTimeout);
    try {
      const root = tooltip.querySelector('.tooltip-root') ?? tooltip;
      root.dispatchEvent(new Event('mouseenter'));
      await page.waitForChanges();

      const bubble = tooltip.querySelector('.tooltip');
      expect(bubble).not.toBeNull();
      expect(bubble?.classList.contains('is-bottom')).toBe(true);
      expect(bubble?.getAttribute('role')).toBe('tooltip');
      expect(bubble?.textContent).toContain('Copied to clipboard');
      expect(bubble?.id).toMatch(/-content$/);
      expect(tooltip.querySelector('.tooltip-root > span')?.getAttribute('aria-describedby')).toBe(
        bubble?.id,
      );

      root.dispatchEvent(new Event('mouseleave'));
      await page.waitForChanges();
      expect(tooltip.querySelector('.tooltip')).toBeNull();
      expect(tooltip.querySelector('span')?.getAttribute('aria-describedby')).toBeNull();
    } finally {
      timers.mockRestore();
    }
  });
});
