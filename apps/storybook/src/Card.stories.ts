import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchCard } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Surface/Card',
  component: BchCard,
} satisfies Meta<BchCard>;

export default meta;

export const Default = {
  render: () => h('bch-card', null,
    h('span', { slot: 'header' }, 'Account'),
    h('p', null, 'Reusable content surface.'),
  ),
};
export const WithFooter = {
  render: () => h('bch-card', null,
    h('span', { slot: 'header' }, 'Account'),
    h('p', null, 'Reusable content surface.'),
    h('span', { slot: 'footer' }, h('bch-badge', { tone: 'success' }, 'Active')),
  ),
};
export const Interactive = {
  render: () => h('bch-card', { interactive: true, onBchPress: () => console.log('card pressed') },
    h('span', { slot: 'header' }, 'Clickable card'),
    h('p', null, 'This card responds to click and keyboard activation.'),
  ),
};
