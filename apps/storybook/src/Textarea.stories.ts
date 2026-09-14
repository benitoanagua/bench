import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchTextarea } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Textarea',
  component: BchTextarea,
} satisfies Meta<BchTextarea>;

export default meta;

export const Default = { render: () => h('bch-textarea', { label: 'Message' }) };
export const WithHint = { render: () => h('bch-textarea', { label: 'Message', hint: 'Max 500 characters' }) };
export const WithError = { render: () => h('bch-textarea', { label: 'Message', error: 'Message is required' }) };
export const Disabled = { render: () => h('bch-textarea', { label: 'Message', disabled: true, value: 'Locked content' }) };
export const Rows = { render: () => h('bch-textarea', { label: 'Long message', rows: 8 }) };
