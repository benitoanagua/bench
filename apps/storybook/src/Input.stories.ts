import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchInput } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Input',
  component: BchInput,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: '',
    hint: '',
    error: '',
    disabled: false,
    readonly: false,
    required: false,
    type: 'text',
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'number', 'search'],
    },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    autocomplete: { control: 'text' },
  },
} satisfies Meta<BchInput>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => h('bch-input', args),
};
export const WithHint: Story = {
  args: { hint: "We'll never share your email." },
  render: (args) => h('bch-input', args),
};
export const WithError: Story = {
  args: { error: 'Enter a valid email address', value: 'not-an-email' },
  render: (args) => h('bch-input', args),
};
export const Password: Story = {
  args: { label: 'Password', type: 'password' },
  render: (args) => h('bch-input', args),
};
export const Disabled: Story = {
  args: { disabled: true, value: 'locked@example.com' },
  render: (args) => h('bch-input', args),
};
export const Readonly: Story = {
  args: { label: 'Reference code', readonly: true, value: 'REF-2026-0831' },
  render: (args) => h('bch-input', args),
};
