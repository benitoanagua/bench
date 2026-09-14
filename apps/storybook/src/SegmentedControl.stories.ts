import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSegmentedControl } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/SegmentedControl',
  component: BchSegmentedControl,
} satisfies Meta<BchSegmentedControl>;

export default meta;

export const Default = {
  render: () => h('bch-segmented-control', { label: 'View', value: 'list' },
    h('bch-segmented-item', { value: 'list', selected: true }, 'List'),
    h('bch-segmented-item', { value: 'grid' }, 'Grid'),
    h('bch-segmented-item', { value: 'map' }, 'Map'),
  ),
};
export const WithDisabledOption = {
  render: () => h('bch-segmented-control', { label: 'View', value: 'list' },
    h('bch-segmented-item', { value: 'list', selected: true }, 'List'),
    h('bch-segmented-item', { value: 'grid' }, 'Grid'),
    h('bch-segmented-item', { value: 'map', disabled: true }, 'Map'),
  ),
};
