import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchBadge } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Surface/Badge',
  component: BchBadge,
  args: { tone: 'neutral' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger', 'risk', 'security'],
      description:
        "'risk' / 'security' pertenecen a la extensión FINANCIAL (opt-in, §2.10): solo para módulos calificados",
    },
  },
} satisfies Meta<BchBadge>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => h('bch-badge', args, 'Neutral'),
};
export const Tones: Story = {
  render: (args) =>
    h(
      'div',
      { style: { display: 'flex', gap: '8px' } },
      h('bch-badge', { tone: 'neutral' }, 'Neutral'),
      h('bch-badge', { tone: 'info' }, 'Info'),
      h('bch-badge', { tone: 'success' }, 'Active'),
      h('bch-badge', { tone: 'warning' }, 'Pending'),
      h('bch-badge', { tone: 'danger' }, 'Failed'),
    ),
};
