import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchIconButton } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Actions/IconButton',
  component: BchIconButton,
} satisfies Meta<BchIconButton>;

export default meta;

export const Default = { render: () => h('bch-icon-button', { name: 'plus', label: 'Add item' }) };
export const Loading = {
  render: () => h('bch-icon-button', { name: 'plus', label: 'Add item', loading: true }),
};
export const Disabled = {
  render: () => h('bch-icon-button', { name: 'trash', label: 'Delete item', disabled: true }),
};
export const Sizes = {
  render: () =>
    h(
      'div',
      { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
      h('bch-icon-button', { name: 'plus', label: 'Small', size: 'small' }),
      h('bch-icon-button', { name: 'plus', label: 'Medium', size: 'medium' }),
      h('bch-icon-button', { name: 'plus', label: 'Large', size: 'large' }),
    ),
};
