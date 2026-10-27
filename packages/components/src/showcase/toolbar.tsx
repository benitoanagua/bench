import { Component, h } from '@stencil/core';

@Component({ tag: 'bch-toolbar', styleUrl: 'toolbar.css', shadow: false, scoped: true })
export class BchToolbar {
  render() {
    return (
      <div class="bch-toolbar">
        <div class="bch-toolbar__start">
          <slot name="start" />
        </div>
        <div class="bch-toolbar__main">
          <slot />
        </div>
        <div class="bch-toolbar__end">
          <slot name="end" />
        </div>
      </div>
    );
  }
}
