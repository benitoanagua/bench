import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-stack', styleUrl: 'bch-stack.css', shadow: false, scoped: true })
export class BchStack {
  @Prop() direction: 'row' | 'column' = 'column';
  @Prop() gap = 'var(--bch-space-4)';
  @Prop() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  render() {
    return <div class="bch-stack" style={{ '--bch-stack-direction': this.direction, '--bch-stack-gap': this.gap, '--bch-stack-align': this.align }}><slot /></div>;
  }
}
