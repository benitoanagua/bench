import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchTabs } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Tabs',
  component: BchTabs,
  args: { value: 'overview' },
  argTypes: {
    value: { control: 'select', options: ['overview', 'activity', 'settings'] },
  },
} satisfies Meta<BchTabs>;

export default meta;
type Story = StoryObj;

/**
 * `bch-tab` va como hijo directo de `bch-tabs`: el componente proyecta los
 * hijos en su propia `tablist`. Envolverlos en un `div slot="tablist"` los
 * deja fuera de cualquier slot con ese nombre y desaparecen de la vista.
 * Los paneles, en cambio, van con `slot="panel"`.
 */
export const Default: Story = {
  render: (args) =>
    h(
      'bch-tabs',
      args,
      h('bch-tab', { value: 'overview' }, 'Overview'),
      h('bch-tab', { value: 'activity' }, 'Activity'),
      h('bch-tab', { value: 'settings', disabled: true }, 'Settings'),
      h('bch-tab-panel', { slot: 'panel', value: 'overview' }, 'Overview content.'),
      h('bch-tab-panel', { slot: 'panel', value: 'activity' }, 'Activity content.'),
      h('bch-tab-panel', { slot: 'panel', value: 'settings' }, 'Settings content.'),
    ),
};
