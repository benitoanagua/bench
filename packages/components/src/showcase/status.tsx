import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-status', styleUrl: 'status.css', shadow: false, scoped: true })
export class BchStatus {
  /**
   * 'risk' / 'security' belong to the FINANCIAL EXTENSION (§2.10, opt-in) —
   * only modules passing the §2.10 qualification criteria may use them.
   */
  @Prop() tone: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'risk' | 'security' =
    'neutral';
  @Prop() label = '';

  render() {
    return (
      <span class={`bch-status bch-status--${this.tone}`} role="status">
        <span class="bch-status__dot" aria-hidden="true" />
        {this.label || <slot />}
      </span>
    );
  }
}
