import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchButton } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Button',
  component: BchButton,
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    type: 'button',
    fullWidth: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'danger'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  tags: ['autodocs'],
} satisfies Meta<BchButton>;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: (args) => h('bch-button', args, 'Continue'),
};

export const Secondary: Story = {
  render: (args) => h('bch-button', { ...args, variant: 'secondary' }, 'Cancel'),
};

export const WithIcons: Story = {
  render: (args) => h('bch-button', args, h('bch-icon', { slot: 'start', name: 'plus' }), 'Create'),
};

export const Danger: Story = {
  render: (args) => h('bch-button', { ...args, variant: 'danger' }, 'Delete'),
};

export const WithLoading: Story = {
  render: (args) => h('bch-button', { ...args, loading: true }, 'Saving'),
};

export const Disabled: Story = {
  render: (args) => h('bch-button', { ...args, disabled: true }, 'Unavailable'),
};
