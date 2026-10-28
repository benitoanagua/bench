import { Component, Prop, h } from '@stencil/core';
@Component({ tag: 'bch-badge', styleUrl: 'badge.css', shadow: false, scoped: true })
export class BchBadge {
  /**
   * 'risk' / 'security' belong to the FINANCIAL EXTENSION (§2.10, opt-in).
   * Only a module that passes the §2.10 qualification criteria (persistent
   * balance that can change state, writes a real ledger/transaction record,
   * or two-step confirmation because a numeric mis-read has direct monetary
   * consequence) may use them — read-only screens stay on the standard tones
   * even if they show numbers. See bench-design-system.md §2.10.
   */
  @Prop() tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'risk' | 'security' =
    'neutral';
  render() {
    return (
      <span class={`badge is-${this.tone}`}>
        <slot />
      </span>
    );
  }
}
