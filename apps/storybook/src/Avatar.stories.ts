import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchAvatar } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Surface/Avatar',
  component: BchAvatar,
} satisfies Meta<BchAvatar>;

export default meta;

export const Initials = { render: () => h('bch-avatar', { name: 'Ada Lovelace' }) };
export const WithImage = {
  render: () => h('bch-avatar', { name: 'Ada Lovelace', src: 'https://i.pravatar.cc/64?img=5' }),
};
export const Sizes = {
  render: () =>
    h(
      'div',
      { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
      h('bch-avatar', { name: 'Ada Lovelace', size: 'small' }),
      h('bch-avatar', { name: 'Ada Lovelace', size: 'medium' }),
      h('bch-avatar', { name: 'Ada Lovelace', size: 'large' }),
    ),
};
export const Status = {
  render: () =>
    h(
      'div',
      { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
      h('bch-avatar', { name: 'Ada Lovelace', status: 'online' }),
      h('bch-avatar', { name: 'Ada Lovelace', status: 'busy' }),
      h('bch-avatar', { name: 'Ada Lovelace', status: 'away' }),
      h('bch-avatar', { name: 'Ada Lovelace', status: 'offline' }),
    ),
};
export const Square = { render: () => h('bch-avatar', { name: 'Ada Lovelace', shape: 'square' }) };
