import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSelect } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Select',
  component: BchSelect,
} satisfies Meta<BchSelect>;

export default meta;

export const Default = {
  render: () =>
    h(
      'bch-select',
      { label: 'Country', name: 'country' },
      h('option', { value: 'bo' }, 'Bolivia'),
      h('option', { value: 'ar' }, 'Argentina'),
      h('option', { value: 'pe' }, 'Peru'),
    ),
};
export const WithHint = {
  render: () =>
    h(
      'bch-select',
      { label: 'Country', name: 'country', hint: 'Used for shipping estimates' },
      h('option', { value: 'bo' }, 'Bolivia'),
      h('option', { value: 'ar' }, 'Argentina'),
    ),
};
export const WithError = {
  render: () =>
    h(
      'bch-select',
      { label: 'Country', name: 'country', error: 'Please select a country' },
      h('option', { value: '' }, 'Choose...'),
      h('option', { value: 'bo' }, 'Bolivia'),
    ),
};
export const Disabled = {
  render: () =>
    h(
      'bch-select',
      { label: 'Country', name: 'country', disabled: true },
      h('option', { value: 'bo' }, 'Bolivia'),
    ),
};
