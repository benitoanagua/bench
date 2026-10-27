import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchToastRegion } from '@bench/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'BENCH/Components/Overlays/Toast',
  component: BchToastRegion,
} satisfies Meta<BchToastRegion>;

export default meta;

export const Default = {
  render: () =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-toast-region').show({ heading: 'Saved', message: 'Your changes were saved.', tone: 'success' })">Show toast</bch-button>
    <bch-toast-region placement="bottom"></bch-toast-region>`),
};
export const TopPlacement = {
  render: () =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-toast-region').show({ heading: 'Heads up', message: 'A new update is available.', tone: 'info' })">Show toast</bch-button>
    <bch-toast-region placement="top"></bch-toast-region>`),
};
export const Persistent = {
  render: () =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-toast-region').show({ heading: 'Action required', message: 'Confirm your email address.', tone: 'warning', duration: 0 })">Show persistent toast</bch-button>
    <bch-toast-region placement="bottom"></bch-toast-region>`),
};
