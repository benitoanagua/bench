import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchModeBadge } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Feedback/ModeBadge',
  component: BchModeBadge,
} satisfies Meta<BchModeBadge>;

export default meta;

/**
 * Persistent mode indicator (§4.4 / Regla 2): visible whenever
 * mode !== 'normal', invisible otherwise, `aria-live="polite"` so screen
 * readers announce mode changes (§3). The transitory "armed" state of
 * leader-key sequences is NOT part of this component (§4.1, ADR-009 tier c).
 */
export const SelectMode = {
  render: () => h('bch-mode-badge', { mode: 'select' }),
};

export const EditMode = {
  // The edit mode escalates to the warning token pair.
  render: () => h('bch-mode-badge', { mode: 'edit' }),
};

export const CustomLabel = {
  render: () => h('bch-mode-badge', { mode: 'custom', label: 'TILING' }),
};

export const NormalMode = {
  render: () =>
    h(
      'div',
      {},
      h('bch-mode-badge', { mode: 'normal' }),
      'Nothing above: normal mode renders no badge.',
    ),
};
