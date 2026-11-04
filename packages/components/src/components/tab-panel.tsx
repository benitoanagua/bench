import { Component, Element, Prop, h } from '@stencil/core';

/**
 * The panel controlled by a `bch-tab`.
 *
 * The panel owns the `role="tabpanel"` section and points back at its tab
 * with `aria-labelledby`. Both ids are derived from the owning group
 * (`bch-tabs`) and the panel value — the same rule `bch-tab` applies to its
 * button — so the reference always resolves to a real element.
 */
@Component({ tag: 'bch-tab-panel', styleUrl: 'tabs.css', shadow: false, scoped: true })
export class BchTabPanel {
  @Element() host!: HTMLElement;
  @Prop() value!: string;

  private get panelId(): string {
    const group = this.host.closest<HTMLElement>('bch-tabs');
    const value = this.value || 'tab';
    return group?.id ? `${group.id}-panel-${value}` : `bch-tab-panel-${value}`;
  }

  private get labelledBy(): string {
    const group = this.host.closest<HTMLElement>('bch-tabs');
    const value = this.value || 'tab';
    return group?.id ? `${group.id}-tab-${value}` : `bch-tab-${value}`;
  }

  render() {
    return (
      <section id={this.panelId} role="tabpanel" aria-labelledby={this.labelledBy} tabIndex={0}>
        <slot />
      </section>
    );
  }
}
