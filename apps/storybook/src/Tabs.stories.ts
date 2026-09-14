import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchTabs } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Tabs',
  component: BchTabs,
} satisfies Meta<BchTabs>;

export default meta;

export const Default = {
  render: () => h('bch-tabs', { value: 'overview' },
    h('div', { slot: 'tablist', style: { display: 'flex', gap: '4px' } },
      h('bch-tab', { value: 'overview', active: true }, 'Overview'),
      h('bch-tab', { value: 'activity' }, 'Activity'),
      h('bch-tab', { value: 'settings', disabled: true }, 'Settings'),
    ),
    h('bch-tab-panel', { value: 'overview' }, 'Overview content.'),
    h('bch-tab-panel', { value: 'activity' }, 'Activity content.'),
    h('bch-tab-panel', { value: 'settings' }, 'Settings content.'),
  ),
};
