import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-surface', styleUrl: 'bch-surface.css', shadow: false, scoped: true })
export class BchSurface {
  @Prop() elevated = false;
  render() {
    return (
      <div class={{ surface: true, elevated: this.elevated }}>
        <slot />
      </div>
    );
  }
}
