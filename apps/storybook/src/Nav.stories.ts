import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchNav } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Nav',
  component: BchNav,
} satisfies Meta<BchNav>;

export default meta;

export const Vertical = {
  render: () => h('bch-nav', { orientation: 'vertical' },
    h('bch-nav-item', { href: '#home', active: true }, 'Home'),
    h('bch-nav-item', { href: '#settings' }, 'Settings'),
    h('bch-nav-item', { href: '#billing', disabled: true }, 'Billing'),
  ),
};
export const Horizontal = {
  render: () => h('bch-nav', { orientation: 'horizontal' },
    h('bch-nav-item', { href: '#home', active: true }, 'Home'),
    h('bch-nav-item', { href: '#settings' }, 'Settings'),
  ),
};
