import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchTooltip } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Overlays/Tooltip',
  component: BchTooltip,
} satisfies Meta<BchTooltip>;

export default meta;

export const Top = {
  render: () => h('bch-tooltip', { text: 'Helpful context', placement: 'top' },
    h('bch-icon', { name: 'info-circle', 'aria-label': 'Information' }),
  ),
};
export const Bottom = {
  render: () => h('bch-tooltip', { text: 'Helpful context', placement: 'bottom' },
    h('bch-icon', { name: 'info-circle', 'aria-label': 'Information' }),
  ),
};
