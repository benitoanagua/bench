import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchCheckbox } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Checkbox',
  component: BchCheckbox,
} satisfies Meta<BchCheckbox>;

export default meta;

export const Default = {
  render: () => h('bch-checkbox', { label: 'Accept terms', name: 'terms' }),
};
export const Checked = {
  render: () => h('bch-checkbox', { label: 'Accept terms', name: 'terms', checked: true }),
};
export const Disabled = {
  render: () => h('bch-checkbox', { label: 'Accept terms', name: 'terms', disabled: true }),
};
export const Required = {
  render: () => h('bch-checkbox', { label: 'Accept terms', name: 'terms', required: true }),
};
