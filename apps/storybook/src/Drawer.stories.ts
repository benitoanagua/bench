import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchDrawer } from '@bench/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'BENCH/Components/Overlays/Drawer',
  component: BchDrawer,
  args: {
    label: 'Navigation',
    side: 'end',
    closeOnEscape: true,
    open: false,
  },
  argTypes: {
    label: { control: 'text' },
    side: { control: 'select', options: ['left', 'right', 'start', 'end'] },
    closeOnEscape: { control: 'boolean' },
    open: { control: 'boolean', description: 'Controlado: el drawer se abre al montar' },
  },
} satisfies Meta<BchDrawer>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { open: false },
  render: (args) =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-drawer').show()">Open drawer</bch-button>
    <bch-drawer label="${args.label}" side="${args.side}" ${
      args.closeOnEscape ? '' : 'close-on-escape'
    }>
      <bch-nav>
        <bch-nav-item active href="#home">Home</bch-nav-item>
        <bch-nav-item href="#settings">Settings</bch-nav-item>
      </bch-nav>
    </bch-drawer>`),
};

export const LeftSide: Story = {
  args: { side: 'left', open: false },
  render: (args) =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-drawer').show()">Open drawer</bch-button>
    <bch-drawer label="${args.label}" side="${args.side}">
      <bch-nav>
        <bch-nav-item active href="#home">Home</bch-nav-item>
        <bch-nav-item href="#settings">Settings</bch-nav-item>
      </bch-nav>
    </bch-drawer>`),
};

/** Playground: los Controls giran los props reales, incl. `open` (live). */
export const Playground: Story = {
  args: { open: true },
  render: (args) =>
    h(
      'bch-drawer',
      args,
      h(
        'bch-nav',
        null,
        h('bch-nav-item', { active: true, href: '#home' }, 'Home'),
        h('bch-nav-item', { href: '#settings' }, 'Settings'),
      ),
    ),
};
