import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSwitch } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Switch',
  component: BchSwitch,
} satisfies Meta<BchSwitch>;

export default meta;

export const Default = { render: () => h('bch-switch', { label: 'Enable notifications', name: 'notifications' }) };
export const Checked = { render: () => h('bch-switch', { label: 'Enable notifications', name: 'notifications', checked: true }) };
export const Disabled = { render: () => h('bch-switch', { label: 'Enable notifications', name: 'notifications', disabled: true }) };
