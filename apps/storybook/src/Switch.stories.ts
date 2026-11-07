import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSwitch } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Switch',
  component: BchSwitch,
  args: {
    label: 'Enable notifications',
    name: 'notifications',
    checked: false,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<BchSwitch>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => h('bch-switch', args),
};
export const Checked: Story = {
  args: { checked: true },
  render: (args) => h('bch-switch', args),
};
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => h('bch-switch', args),
};
