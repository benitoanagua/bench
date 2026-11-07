import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchProgress } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Feedback/Progress',
  component: BchProgress,
  args: { value: 60, label: 'Uploading', indeterminate: false, tone: 'action' },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: '0-100, ignorado si indeterminate',
    },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    tone: {
      control: 'select',
      options: ['action', 'success', 'danger', 'warning'],
    },
  },
} satisfies Meta<BchProgress>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => h('bch-progress', args),
};
export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Loading' },
  render: (args) => h('bch-progress', args),
};
export const Tones: Story = {
  render: (args) =>
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px' } },
      h('bch-progress', { value: 80, tone: 'success', label: 'Success' }),
      h('bch-progress', { value: 40, tone: 'warning', label: 'Warning' }),
      h('bch-progress', { value: 20, tone: 'danger', label: 'Danger' }),
    ),
};
