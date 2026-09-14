import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchPagination } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Pagination',
  component: BchPagination,
} satisfies Meta<BchPagination>;

export default meta;

export const Default = { render: () => h('bch-pagination', { page: 1, pageCount: 10 }) };
export const MiddlePage = { render: () => h('bch-pagination', { page: 5, pageCount: 10 }) };
export const WideSiblings = { render: () => h('bch-pagination', { page: 5, pageCount: 20, siblingCount: 2 }) };
