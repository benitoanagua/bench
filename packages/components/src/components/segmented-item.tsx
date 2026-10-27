import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'bch-segmented-item',
  styleUrl: 'segmented-control.css',
  shadow: false,
  scoped: true,
})
export class BchSegmentedItem {
  @Prop() value = '';
  @Prop() disabled = false;
  /** Set by the parent <bch-segmented-control>. */
  @Prop({ reflect: true, mutable: true }) selected = false;
  @Event() bchSelect!: EventEmitter<string>;

  render() {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={this.selected ? 'true' : 'false'}
        class={{ 'bch-segmented-item': true, 'is-selected': this.selected }}
        disabled={this.disabled}
        onClick={() => this.bchSelect.emit(this.value)}
      >
        <slot />
      </button>
    );
  }
}
