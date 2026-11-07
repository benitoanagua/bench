import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchTooltip } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Overlays/Tooltip',
  component: BchTooltip,
  args: { text: 'Helpful context', placement: 'top' },
  argTypes: {
    text: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom'] },
  },
} satisfies Meta<BchTooltip>;

export default meta;
type Story = StoryObj;

export const Top: Story = {
  args: { placement: 'top' },
  render: (args) =>
    h('bch-tooltip', args, h('bch-icon', { name: 'info-circle', 'aria-label': 'Information' })),
};
export const Bottom: Story = {
  args: { placement: 'bottom' },
  render: (args) =>
    h('bch-tooltip', args, h('bch-icon', { name: 'info-circle', 'aria-label': 'Information' })),
};
