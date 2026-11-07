import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSelect } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Select',
  component: BchSelect,
  args: {
    label: 'Country',
    name: 'country',
    value: '',
    hint: '',
    error: '',
    disabled: false,
    required: false,
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'select', options: ['', 'bo', 'ar', 'pe'] },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<BchSelect>;

export default meta;
type Story = StoryObj;

const options = (values: string) =>
  ({
    '': h('option', { value: '' }, 'Choose...'),
    bo: h('option', { value: 'bo' }, 'Bolivia'),
    ar: h('option', { value: 'ar' }, 'Argentina'),
    pe: h('option', { value: 'pe' }, 'Peru'),
  })[values];

export const Default: Story = {
  render: (args) =>
    h(
      'bch-select',
      args,
      h('option', { value: 'bo' }, 'Bolivia'),
      h('option', { value: 'ar' }, 'Argentina'),
      h('option', { value: 'pe' }, 'Peru'),
    ),
};
export const WithHint: Story = {
  args: { hint: 'Used for shipping estimates' },
  render: (args) =>
    h(
      'bch-select',
      args,
      h('option', { value: 'bo' }, 'Bolivia'),
      h('option', { value: 'ar' }, 'Argentina'),
    ),
};
export const WithError: Story = {
  args: { error: 'Please select a country', value: '' },
  render: (args) => h('bch-select', args, options('')),
};
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => h('bch-select', args, h('option', { value: 'bo' }, 'Bolivia')),
};
