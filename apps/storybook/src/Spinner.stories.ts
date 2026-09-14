import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSpinner } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Feedback/Spinner',
  component: BchSpinner,
} satisfies Meta<BchSpinner>;

export default meta;

export const Default = { render: () => h('bch-spinner') };
export const CustomLabel = { render: () => h('bch-spinner', { label: 'Fetching results' }) };
