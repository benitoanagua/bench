import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-empty-state', styleUrl: 'empty-state.css', shadow: false, scoped: true })
export class BchEmptyState {
  @Prop() heading = '';
  @Prop() description = '';

  render() {
    return (
      <section class="bch-empty-state">
        <div class="bch-empty-state__icon"><slot name="icon"><bch-icon name="inbox" aria-label=""></bch-icon></slot></div>
        <h3>{this.heading}</h3>
        {this.description ? <p>{this.description}</p> : null}
        <div class="bch-empty-state__actions"><slot name="actions" /></div>
      </section>
    );
  }
}
