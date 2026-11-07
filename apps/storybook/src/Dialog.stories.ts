import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchDialog } from '@bench/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'BENCH/Components/Overlays/Dialog',
  component: BchDialog,
  args: {
    label: 'Confirm action',
    tone: 'standard',
    closeOnEscape: true,
    open: false,
  },
  argTypes: {
    label: { control: 'text' },
    tone: { control: 'select', options: ['standard', 'critical'] },
    closeOnEscape: { control: 'boolean' },
    open: { control: 'boolean', description: 'Controlado: el diálogo modal se abre al montar' },
  },
} satisfies Meta<BchDialog>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { open: false },
  render: (args) =>
    stencilContent(`
    <bch-button onclick="document.querySelector('bch-dialog').show()">Open dialog</bch-button>
    <bch-dialog label="${args.label}" tone="${args.tone}" ${
      args.closeOnEscape ? '' : 'close-on-escape'
    }>
      <p>This dialog uses the native dialog element and restores focus on close.</p>
      <span slot="footer">
        <bch-button variant="secondary" onclick="document.querySelector('bch-dialog').close()">Cancel</bch-button>
        <bch-button onclick="document.querySelector('bch-dialog').close()">Confirm</bch-button>
      </span>
    </bch-dialog>`),
};

export const Critical: Story = {
  args: { tone: 'critical', label: 'Delete permanently', open: false },
  render: (args) =>
    stencilContent(`
    <bch-button variant="danger" onclick="document.querySelector('#critical-dialog').show()">Delete permanently</bch-button>
    <bch-dialog id="critical-dialog" label="${args.label}" tone="${args.tone}">
      <p>This will delete the record and its full history. <strong>This action cannot be undone.</strong></p>
      <span slot="footer">
        <bch-button variant="secondary" onclick="document.querySelector('#critical-dialog').close()">Cancel</bch-button>
        <bch-button variant="danger" onclick="document.querySelector('#critical-dialog').close()">Delete permanently</bch-button>
      </span>
    </bch-dialog>`),
};

/** Playground: los Controls giran los props reales, incl. `open` (live). */
export const Playground: Story = {
  args: { open: true },
  render: (args) =>
    h(
      'bch-dialog',
      args,
      h(
        'div',
        { slot: 'default' },
        h('p', null, 'The dialog keeps its state in the component and restores focus on close.'),
      ),
      h(
        'span',
        { slot: 'footer' },
        h('bch-button', { variant: 'secondary' }, 'Cancel'),
        h('bch-button', null, 'Confirm'),
      ),
    ),
};
