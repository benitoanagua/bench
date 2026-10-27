import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchDatePicker } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/DatePicker',
  component: BchDatePicker,
} satisfies Meta<BchDatePicker>;

export default meta;

export const Default = { render: () => h('bch-date-picker', { label: 'Start date' }) };
export const WithValue = {
  render: () => h('bch-date-picker', { label: 'Start date', value: '2026-08-31' }),
};
export const WithRange = {
  render: () =>
    h('bch-date-picker', { label: 'Appointment date', min: '2026-09-01', max: '2026-12-31' }),
};
export const WithError = {
  render: () => h('bch-date-picker', { label: 'Start date', error: 'Choose a date after today' }),
};
export const Disabled = {
  render: () => h('bch-date-picker', { label: 'Start date', disabled: true, value: '2026-08-31' }),
};
