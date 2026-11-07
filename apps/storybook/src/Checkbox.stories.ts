import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchCheckbox } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Checkbox',
  component: BchCheckbox,
  args: {
    label: 'Accept terms',
    name: 'terms',
    value: 'on',
    checked: false,
    disabled: false,
    required: false,
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<BchCheckbox>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => h('bch-checkbox', args),
};
export const Checked: Story = {
  args: { checked: true },
  render: (args) => h('bch-checkbox', args),
};
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => h('bch-checkbox', args),
};
export const Required: Story = {
  args: { required: true },
  render: (args) => h('bch-checkbox', args),
};
