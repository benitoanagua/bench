import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchStatusBar, BchModeBadge } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Layout/StatusBar',
  component: BchStatusBar,
} satisfies Meta<BchStatusBar>;

export default meta;

/**
 * The bottom strip (§4.4 "barra de estado + telemetría"): page, zoom, mode
 * and language texts always visible; the app injects every text through the
 * slots. The bottom-left corner stays free — it is the region the browser
 * renders link previews into.
 */
export const Default = {
  render: () =>
    h(
      'bch-status-bar',
      {},
      h('span', { slot: 'start' }, 'Page 3 of 42'),
      h('span', { slot: 'telemetry' }, '1.24 ms · 132 pages/min · 2 warnings'),
      h('span', { slot: 'end' }, 'USD · es-MX · 100%'),
    ),
};

export const WithModeBadge = {
  render: () =>
    h(
      'bch-status-bar',
      {},
      h('bch-mode-badge', { slot: 'mode', mode: 'edit' }),
      h('span', { slot: 'start' }, 'Invoice #4381'),
      h('span', { slot: 'telemetry' }, 'autosaved 2s ago'),
      h('span', { slot: 'end' }, 'Zoom 100%'),
    ),
};

export const NormalMode = {
  // mode === 'normal' renders no badge at all — nothing to announce (Regla 2).
  render: () =>
    h(
      'bch-status-bar',
      {},
      h('bch-mode-badge', { slot: 'mode', mode: 'normal' }),
      h('span', { slot: 'start' }, 'Ready'),
    ),
};
