import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchSlider } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/Slider',
  component: BchSlider,
} satisfies Meta<BchSlider>;

export default meta;

export const Default = { render: () => h('bch-slider', { label: 'Volume', value: 40 }) };
export const WithValueLabel = {
  render: () => h('bch-slider', { label: 'Volume', value: 65, showValue: true }),
};
export const Range = {
  render: () =>
    h('bch-slider', {
      label: 'Brightness',
      min: 0,
      max: 200,
      step: 5,
      value: 100,
      showValue: true,
    }),
};
export const Disabled = {
  render: () => h('bch-slider', { label: 'Volume', value: 40, disabled: true }),
};
