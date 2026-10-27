import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchRadio } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Radio',
  component: BchRadio,
} satisfies Meta<BchRadio>;

export default meta;

export const Group = {
  render: () =>
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
      h('bch-radio', { name: 'plan', value: 'basic', label: 'Basic', checked: true }),
      h('bch-radio', { name: 'plan', value: 'pro', label: 'Pro' }),
      h('bch-radio', { name: 'plan', value: 'enterprise', label: 'Enterprise' }),
    ),
};
export const Disabled = {
  render: () => h('bch-radio', { name: 'plan', value: 'basic', label: 'Basic', disabled: true }),
};
