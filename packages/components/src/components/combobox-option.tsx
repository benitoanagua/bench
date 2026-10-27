import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-combobox-option', styleUrl: 'combobox.css', shadow: false, scoped: true })
export class BchComboboxOption {
  @Prop() value = '';
  /** All three are set by the parent <bch-combobox> — presence-based (toggleAttribute), not string values. */
  @Prop({ reflect: true, mutable: true }) matched = true;
  @Prop({ reflect: true, mutable: true }) active = false;
  @Prop({ reflect: true, mutable: true }) selected = false;
  @Event() bchSelect!: EventEmitter<string>;

  render() {
    return (
      <div
        role="option"
        aria-selected={this.selected ? 'true' : 'false'}
        class={{ 'bch-combobox__option': true, 'is-active': this.active }}
        onMouseDown={(event) => {
          event.preventDefault();
          this.bchSelect.emit(this.value);
        }}
      >
        <slot />
      </div>
    );
  }
}
