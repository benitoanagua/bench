import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchAccordion } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Surface/Accordion',
  component: BchAccordion,
} satisfies Meta<BchAccordion>;

export default meta;

export const Default = {
  render: () => h('bch-accordion', null,
    h('bch-accordion-item', { value: 'a', label: 'What is Bench?', open: true }, 'A mobile-first component library.'),
    h('bch-accordion-item', { value: 'b', label: 'Is it accessible?' }, 'Yes, built with ARIA patterns in mind.'),
  ),
};
export const Multiple = {
  render: () => h('bch-accordion', { multiple: true },
    h('bch-accordion-item', { value: 'a', label: 'Section A', open: true }, 'Content A.'),
    h('bch-accordion-item', { value: 'b', label: 'Section B', open: true }, 'Content B.'),
  ),
};
