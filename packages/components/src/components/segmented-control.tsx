import { Component, Element, Event, type EventEmitter, Prop, h } from '@stencil/core';

/**
 *   <bch-segmented-control value="week" label="Range">
 *     <bch-segmented-item value="day">Day</bch-segmented-item>
 *     <bch-segmented-item value="week">Week</bch-segmented-item>
 *     <bch-segmented-item value="month">Month</bch-segmented-item>
 *   </bch-segmented-control>
 */
@Component({
  tag: 'bch-segmented-control',
  styleUrl: 'segmented-control.css',
  shadow: false,
  scoped: true,
})
export class BchSegmentedControl {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) value = '';
  @Prop() label = '';
  @Event() bchChange!: EventEmitter<string>;
  private list?: HTMLElement;

  componentDidLoad() {
    this.refresh();
    this.list?.addEventListener('bchSelect', this.onItemSelect as EventListener);
  }
  disconnectedCallback() {
    this.list?.removeEventListener('bchSelect', this.onItemSelect as EventListener);
  }

  private refresh = () => {
    const items = Array.from(
      this.host.querySelectorAll(':scope > bch-segmented-item'),
    ) as HTMLElement[];
    if (!this.value && items[0]) this.value = items[0].getAttribute('value') || '';
    this.syncChildren(items);
  };

  private syncChildren(items: HTMLElement[]) {
    items.forEach((item) =>
      item.toggleAttribute('selected', item.getAttribute('value') === this.value),
    );
  }

  private onItemSelect = (event: CustomEvent<string>) => {
    this.value = event.detail;
    this.syncChildren(
      Array.from(this.host.querySelectorAll(':scope > bch-segmented-item')) as HTMLElement[],
    );
    this.bchChange.emit(this.value);
  };

  render() {
    return (
      <div
        class="bch-segmented-control"
        role="radiogroup"
        aria-label={this.label || undefined}
        ref={(el) => (this.list = el as HTMLElement)}
      >
        <slot onSlotchange={this.refresh} />
      </div>
    );
  }
}
