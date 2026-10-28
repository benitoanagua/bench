import { Component, Prop, h } from '@stencil/core';

/**
 * Persistent mode indicator (§4.4 / Regla 2): it renders as a constantly
 * visible badge whenever `mode !== 'normal'`, and only with `mode='normal'`
 * (or an empty pass-through) it renders nothing at all.
 *
 *   <bch-mode-badge mode="edit" />          → "Edit" badge, warning tone
 *   <bch-mode-badge mode="select" label="RECT" /> → custom label
 *
 * `aria-live="polite"` (§3, "El modo se anuncia a lectores de pantalla"):
 * mode changes are announced without interrupting the reader's current
 * narration.
 *
 * Colors: the badge always uses the action-soft/action token pair; the
 * `edit` mode deliberately escalates to the warning-soft/warning pair since
 * it is an editing session, not just navigation. The transitory "armed"
 * phase of leader-key sequences is deliberately NOT part of this component —
 * it belongs to the keyboard orchestration guide (§4.1, ADR-009 tier c).
 */
@Component({ tag: 'bch-mode-badge', styleUrl: 'mode-badge.css', shadow: false, scoped: true })
export class BchModeBadge {
  @Prop() mode: 'normal' | 'select' | 'edit' | 'custom' = 'normal';
  /** Optional label override; defaults to the capitalized mode (e.g. "Edit"). */
  @Prop() label = '';

  render() {
    if (this.mode === 'normal') return null;
    const text = this.label || this.mode.charAt(0).toUpperCase() + this.mode.slice(1);
    return (
      <span class={{ 'bch-mode-badge': true, [`is-${this.mode}`]: true }} aria-live="polite">
        {text}
      </span>
    );
  }
}
