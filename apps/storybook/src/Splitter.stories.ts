import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSplitter, BCH_MIN_PANE_WIDTH, BCH_MIN_PANE_HEIGHT } from '@bench/components';


const meta = {
  title: 'BENCH/Components/Layout/Splitter',
  component: BchSplitter,
} satisfies Meta<BchSplitter>;

export default meta;

/** Tiling demo: the app owns the layout (flex-basis), the splitter only reports deltas (§4.3). */
export const Horizontal = {
  render: () =>
    h(
      'div',
      {
        style: {
          display: 'flex',
          maxWidth: '400px',
          height: '120px',
          border: '1px solid var(--bch-color-border)',
        },
      },
      h('div', { style: { flexBasis: '60%', background: 'var(--bch-color-surface)' } }, 'Panel A'),
      h('bch-splitter', { orientation: 'horizontal' }),
      h('div', { style: { flexBasis: '40%', background: 'var(--bch-color-surface-raised)' } }, 'Panel B'),
    ),
};

export const Vertical = {
  render: () =>
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          height: '200px',
          border: '1px solid var(--bch-color-border)',
        },
      },
      h('div', { style: { flexBasis: '50%', background: 'var(--bch-color-surface)' } }, 'Row A'),
      h('bch-splitter', { orientation: 'vertical' }),
      h('div', { style: { flexBasis: '50%', background: 'var(--bch-color-surface-raised)' } }, 'Row B'),
    ),
};

export const KeyboardOnly = {
  render: () => {
    // The app listens to bchDrag and clamps against the spec §4.3 hard
    // minimums (BCH_MIN_PANE_WIDTH = 160 horizontal, BCH_MIN_PANE_HEIGHT = 80
    // vertical); keyboard arrows adjust ±16px per step.
    const bounds = { width: BCH_MIN_PANE_WIDTH, height: BCH_MIN_PANE_HEIGHT };
    return h(
      'div',
      { style: { padding: '8px', border: '1px solid var(--bch-color-border)' } },
      h('bch-splitter', { orientation: 'horizontal' }),
      h(
        'p',
        {},
        `Clamp bounds encoded by the constants: ${bounds.width}px (horizontal) / ${bounds.height}px (vertical). Drag or focus + Left/Right arrows.`,
      ),
    );
  },
};
