import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchTimePicker } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/TimePicker',
  component: BchTimePicker,
} satisfies Meta<BchTimePicker>;

export default meta;

export const Default = { render: () => h('bch-time-picker', { label: 'Meeting time' }) };
export const WithValue = { render: () => h('bch-time-picker', { label: 'Meeting time', value: '14:30' }) };
export const WithStep = { render: () => h('bch-time-picker', { label: 'Meeting time', step: 900 }) };
export const Disabled = { render: () => h('bch-time-picker', { label: 'Meeting time', disabled: true, value: '09:00' }) };
