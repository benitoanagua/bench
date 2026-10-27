import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchButton } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Button',
  component: BchButton,
} satisfies Meta<BchButton>;

export default meta;

export const Primary = {
  render: () => h('bch-button', null, 'Continue'),
};

export const Secondary = {
  render: () => h('bch-button', { variant: 'secondary' }, 'Cancel'),
};

export const WithIcons = {
  render: () => h('bch-button', null, h('bch-icon', { slot: 'start', name: 'plus' }), 'Create'),
};
