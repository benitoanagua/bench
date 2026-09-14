import { h } from '@stencil/core';

/** Render static story markup through Stencil's VDOM. */
export const stencilContent = (markup: string) =>
  h('div', { innerHTML: markup });
