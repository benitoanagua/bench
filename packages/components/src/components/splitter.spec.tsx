import { newSpecPage } from '@stencil/core/testing';
import { BchSplitter } from './splitter';
import { BCH_MIN_PANE_WIDTH, BCH_MIN_PANE_HEIGHT } from './splitter-bounds';

describe('bch-splitter', () => {
  it('renders a focusable separator with the visual-line aria-orientation', async () => {
    const page = await newSpecPage({
      components: [BchSplitter],
      html: '<bch-splitter></bch-splitter>',
    });
    const root = page.root?.querySelector('.bch-splitter') as HTMLElement;
    expect(root.getAttribute('role')).toBe('separator');
    expect(root.getAttribute('aria-orientation')).toBe('vertical'); // horizontal = vertical line
    expect(root.getAttribute('tabindex')).not.toBeNull();
  });

  it('flips aria-orientation for vertical (rows) splitters', async () => {
    const page = await newSpecPage({
      components: [BchSplitter],
      html: '<bch-splitter orientation="vertical"></bch-splitter>',
    });
    expect(page.root.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('ArrowLeft/ArrowRight emit bchDrag with a ±16px delta', async () => {
    const page = await newSpecPage({
      components: [BchSplitter],
      html: '<bch-splitter></bch-splitter>',
    });
    const splits: number[] = [];
    page.root?.addEventListener('bchDrag', ((e: CustomEvent<{ deltaPx: number }>) =>
      splits.push(e.detail.deltaPx)) as EventListener);
    const instance = page.rootInstance as BchSplitter;
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(splits).toEqual([16, -16]);
  });

  it('ArrowUp/ArrowDown emit bchDrag for vertical splitters', async () => {
    const page = await newSpecPage({
      components: [BchSplitter],
      html: '<bch-splitter orientation="vertical"></bch-splitter>',
    });
    const splits: number[] = [];
    page.root?.addEventListener('bchDrag', ((e: CustomEvent<{ deltaPx: number }>) =>
      splits.push(e.detail.deltaPx)) as EventListener);
    const instance = page.rootInstance as BchSplitter;
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(splits).toEqual([-16, 16]);
  });

  it('exports the spec §4.3 hard pane minimums', () => {
    expect(BCH_MIN_PANE_WIDTH).toBe(160);
    expect(BCH_MIN_PANE_HEIGHT).toBe(80);
  });
});
