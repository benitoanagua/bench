import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchBreadcrumbs } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Breadcrumbs',
  component: BchBreadcrumbs,
} satisfies Meta<BchBreadcrumbs>;

export default meta;

export const Default = {
  render: () => h('bch-breadcrumbs', null,
    h('bch-breadcrumb-item', { href: '#' }, 'Home'),
    h('bch-breadcrumb-item', { href: '#' }, 'Settings'),
    h('bch-breadcrumb-item', { current: true }, 'Profile'),
  ),
};
export const Collapsed = {
  render: () => h('bch-breadcrumbs', { maxItems: 3 },
    h('bch-breadcrumb-item', { href: '#' }, 'Home'),
    h('bch-breadcrumb-item', { href: '#' }, 'Products'),
    h('bch-breadcrumb-item', { href: '#' }, 'Category'),
    h('bch-breadcrumb-item', { href: '#' }, 'Subcategory'),
    h('bch-breadcrumb-item', { current: true }, 'Item'),
  ),
};
