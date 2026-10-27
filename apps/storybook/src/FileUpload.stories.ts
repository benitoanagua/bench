import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchFileUpload } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Forms/FileUpload',
  component: BchFileUpload,
} satisfies Meta<BchFileUpload>;

export default meta;

export const Default = { render: () => h('bch-file-upload', { label: 'Attachments' }) };
export const ImagesOnly = {
  render: () =>
    h('bch-file-upload', {
      label: 'Profile photo',
      accept: 'image/*',
      dropzoneText: 'Drag an image here or ',
    }),
};
export const Multiple = {
  render: () => h('bch-file-upload', { label: 'Documents', multiple: true }),
};
export const WithError = {
  render: () =>
    h('bch-file-upload', { label: 'Attachments', error: 'File exceeds the size limit' }),
};
export const Disabled = {
  render: () => h('bch-file-upload', { label: 'Attachments', disabled: true }),
};
