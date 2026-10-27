import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchFormField } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/FormField',
  component: BchFormField,
} satisfies Meta<BchFormField>;

export default meta;

export const WrappingCustomControl = {
  render: () =>
    h(
      'bch-form-field',
      { label: 'Search radius', hint: 'Distance in kilometers' },
      h('bch-slider', { min: 0, max: 50, value: 10 }),
    ),
};
export const WithError = {
  render: () =>
    h(
      'bch-form-field',
      { label: 'API key', error: 'This field is required', required: true },
      h('input', { type: 'text', style: { width: '100%' } }),
    ),
};
