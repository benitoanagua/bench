import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-menu-item', styleUrl: 'menu.css', shadow: false, scoped: true })
export class BchMenuItem {
  @Prop() value = '';
  @Prop() disabled = false;
  @Prop() tone: 'default' | 'danger' = 'default';
  @Event() bchSelect!: EventEmitter<string>;

  private onClick = () => {
    if (this.disabled) return;
    this.bchSelect.emit(this.value);
  };

  render() {
    return (
      <button
        type="button"
        role="menuitem"
        class={{ 'bch-menu-item': true, [`is-${this.tone}`]: true }}
        disabled={this.disabled}
        onClick={this.onClick}
      >
        <span class="start">
          <slot name="start" />
        </span>
        <span class="label">
          <slot />
        </span>
        <span class="end">
          <slot name="end" />
        </span>
      </button>
    );
  }
}
