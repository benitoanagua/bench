import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchDrawer } from '@bench/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'BENCH/Components/Overlays/Drawer',
  component: BchDrawer,
} satisfies Meta<BchDrawer>;

export default meta;

export const Default = {
  render: () =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-drawer').show()">Open drawer</bch-button>
    <bch-drawer label="Navigation">
      <bch-nav>
        <bch-nav-item active href="#home">Home</bch-nav-item>
        <bch-nav-item href="#settings">Settings</bch-nav-item>
      </bch-nav>
    </bch-drawer>`),
};
export const LeftSide = {
  render: () =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-drawer').show()">Open drawer</bch-button>
    <bch-drawer label="Navigation" side="left">
      <bch-nav>
        <bch-nav-item active href="#home">Home</bch-nav-item>
        <bch-nav-item href="#settings">Settings</bch-nav-item>
      </bch-nav>
    </bch-drawer>`),
};
