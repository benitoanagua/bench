import { Component, Prop, h } from '@stencil/core';
@Component({ tag: 'bch-badge', styleUrl: 'badge.css', shadow: false, scoped: true })
export class BchBadge {
  @Prop() tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger' = 'neutral';
  render() { return <span class={`badge is-${this.tone}`}><slot /></span>; }
}
