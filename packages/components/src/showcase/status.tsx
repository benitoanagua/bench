import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-status', styleUrl: 'status.css', shadow: false, scoped: true })
export class BchStatus {
  @Prop() tone: 'neutral' | 'success' | 'warning' | 'danger' | 'info' = 'neutral';
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
