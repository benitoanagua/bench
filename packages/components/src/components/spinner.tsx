import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-spinner', styleUrl: 'spinner.css', shadow: false, scoped: true })
export class BchSpinner {
  @Prop() label = 'Loading';
  render() {
    return <span class="bch-spinner" role="status" aria-label={this.label} />;
  }
}
