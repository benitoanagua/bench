import { Component, Element, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-tab-panel', styleUrl: 'tabs.css', shadow: false, scoped: true })
export class BchTabPanel {
  @Element() host!: HTMLElement;
  @Prop() value!: string;
  render() {
    const id = `${this.host.id || `bch-tab-panel-${this.value}`}`;
    return (
      <section
        id={id}
        class="tab-panel"
        role="tabpanel"
        aria-labelledby={`bch-tab-${this.value}`}
        tabIndex={0}
      >
        <slot />
      </section>
    );
  }
}
