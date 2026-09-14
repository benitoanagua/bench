import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchDialog } from '@bench/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'BENCH/Components/Overlays/Dialog',
  component: BchDialog,
} satisfies Meta<BchDialog>;

export default meta;

export const Default = {
  render: () => stencilContent(`
    <bch-button onclick="document.querySelector('bch-dialog').show()">Open dialog</bch-button>
    <bch-dialog label="Confirm action">
      <p>This dialog uses the native dialog element and restores focus on close.</p>
      <span slot="footer">
        <bch-button variant="secondary" onclick="document.querySelector('bch-dialog').close()">Cancel</bch-button>
        <bch-button onclick="document.querySelector('bch-dialog').close()">Confirm</bch-button>
      </span>
    </bch-dialog>`),
};
