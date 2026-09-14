import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchInput } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Input',
  component: BchInput,
} satisfies Meta<BchInput>;

export default meta;

export const Default = { render: () => h('bch-input', { label: 'Email', placeholder: 'you@example.com' }) };
export const WithHint = { render: () => h('bch-input', { label: 'Email', hint: "We'll never share your email." }) };
export const WithError = { render: () => h('bch-input', { label: 'Email', error: 'Enter a valid email address', value: 'not-an-email' }) };
export const Password = { render: () => h('bch-input', { label: 'Password', type: 'password' }) };
export const Disabled = { render: () => h('bch-input', { label: 'Email', disabled: true, value: 'locked@example.com' }) };
export const Readonly = { render: () => h('bch-input', { label: 'Reference code', readonly: true, value: 'REF-2026-0831' }) };
