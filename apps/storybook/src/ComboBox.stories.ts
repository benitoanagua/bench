import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchCombobox } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/ComboBox',
  component: BchCombobox,
} satisfies Meta<BchCombobox>;

export default meta;

const options = () => [
  h('bch-combobox-option', { value: 'bolivia' }, 'Bolivia'),
  h('bch-combobox-option', { value: 'argentina' }, 'Argentina'),
  h('bch-combobox-option', { value: 'peru' }, 'Peru'),
  h('bch-combobox-option', { value: 'chile' }, 'Chile'),
];

export const Default = { render: () => h('bch-combobox', { label: 'Country' }, ...options()) };
export const WithHint = {
  render: () =>
    h('bch-combobox', { label: 'Country', hint: 'Start typing to filter' }, ...options()),
};
export const AllowCustomValue = {
  render: () =>
    h(
      'bch-combobox',
      { label: 'Tag', allowCustomValue: true, noResultsText: 'Press Enter to add' },
      ...options(),
    ),
};
export const Disabled = {
  render: () => h('bch-combobox', { label: 'Country', disabled: true }, ...options()),
};
