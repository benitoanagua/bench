import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchTree } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Tree',
  component: BchTree,
} satisfies Meta<BchTree>;

export default meta;

const items = [
  {
    id: 'billing',
    label: 'Billing',
    children: [
      { id: 'invoices', label: 'Invoices', children: [{ id: 'nf', label: 'New invoice' }] },
      { id: 'credit-notes', label: 'Credit notes' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    children: [{ id: 'sales', label: 'Sales report' }],
  },
  { id: 'settings', label: 'Settings' },
];

export const Default = {
  render: () =>
    h('bch-tree', {
      items,
      // spec §4.7: ↓/↑ move focus between visible nodes, → expands or enters
      // the first child, ← collapses or climbs to the parent, Enter selects.
      onKeyDown: (e: KeyboardEvent) => e.stopPropagation(),
    }),
};

export const Slotted = {
  render: () =>
    h(
      'bch-tree',
      {},
      h(
        'bch-tree-item',
        { value: 'customers', label: 'Customers', expanded: true },
        h('bch-tree-item', { slot: 'children', value: 'new-customer', label: 'New customer' }),
        h('bch-tree-item', { slot: 'children', value: 'search-customers', label: 'Search customers' }),
      ),
      h('bch-tree-item', { value: 'suppliers', label: 'Suppliers' }),
    ),
};

export const SelectionAffordance = {
  render: () => h('bch-tree', { items: items.slice(0, 2) }),
};
