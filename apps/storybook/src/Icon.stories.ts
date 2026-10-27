import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchIcon } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Actions/Icon',
  component: BchIcon,
} satisfies Meta<BchIcon>;

export default meta;

export const Default = { render: () => h('bch-icon', { name: 'star' }) };
export const WithAriaLabel = {
  render: () => h('bch-icon', { name: 'info-circle', 'aria-label': 'Information' }),
};
export const Gallery = {
  render: () =>
    h(
      'div',
      { style: { display: 'flex', gap: '12px' } },
      ['home', 'search', 'settings', 'bell', 'user', 'calendar'].map((n) =>
        h('bch-icon', { name: n }),
      ),
    ),
};
