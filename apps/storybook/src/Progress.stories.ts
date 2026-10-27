import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchProgress } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Feedback/Progress',
  component: BchProgress,
} satisfies Meta<BchProgress>;

export default meta;

export const Default = { render: () => h('bch-progress', { value: 60, label: 'Uploading' }) };
export const Indeterminate = {
  render: () => h('bch-progress', { indeterminate: true, label: 'Loading' }),
};
export const Tones = {
  render: () =>
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px' } },
      h('bch-progress', { value: 80, tone: 'success', label: 'Success' }),
      h('bch-progress', { value: 40, tone: 'warning', label: 'Warning' }),
      h('bch-progress', { value: 20, tone: 'danger', label: 'Danger' }),
    ),
};
