import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSkeleton } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Feedback/Skeleton',
  component: BchSkeleton,
} satisfies Meta<BchSkeleton>;

export default meta;

export const Text = { render: () => h('bch-skeleton', { variant: 'text', width: '220px' }) };
export const Circle = { render: () => h('bch-skeleton', { variant: 'circle', width: '48px', height: '48px' }) };
export const Rect = { render: () => h('bch-skeleton', { variant: 'rect', width: '280px', height: '140px' }) };
export const CardPlaceholder = {
  render: () => h('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
    h('bch-skeleton', { variant: 'circle', width: '40px', height: '40px' }),
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
      h('bch-skeleton', { variant: 'text', width: '160px' }),
      h('bch-skeleton', { variant: 'text', width: '100px' }),
    ),
  ),
};
