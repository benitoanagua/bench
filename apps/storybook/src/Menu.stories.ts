import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchMenu } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Menu',
  component: BchMenu,
} satisfies Meta<BchMenu>;

export default meta;

export const Default = {
  render: () =>
    h(
      'bch-menu',
      { label: 'Actions' },
      h('bch-button', { slot: 'trigger' }, 'Open menu'),
      h('bch-menu-item', { value: 'edit' }, 'Edit'),
      h('bch-menu-item', { value: 'duplicate' }, 'Duplicate'),
      h('bch-menu-item', { value: 'delete', tone: 'danger' }, 'Delete'),
    ),
};
