import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchBadge } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Surface/Badge',
  component: BchBadge,
} satisfies Meta<BchBadge>;

export default meta;

export const Default = { render: () => h('bch-badge', null, 'Neutral') };
export const Tones = {
  render: () =>
    h(
      'div',
      { style: { display: 'flex', gap: '8px' } },
      h('bch-badge', { tone: 'neutral' }, 'Neutral'),
      h('bch-badge', { tone: 'info' }, 'Info'),
      h('bch-badge', { tone: 'success' }, 'Active'),
      h('bch-badge', { tone: 'warning' }, 'Pending'),
      h('bch-badge', { tone: 'danger' }, 'Failed'),
    ),
};
