import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-nav-item', styleUrl: 'nav.css', shadow: false, scoped: true })
export class BchNavItem {
  @Prop() href = '';
  @Prop() active = false;
  @Prop() disabled = false;
  @Event() bchNavigate!: EventEmitter<string>;
  render() {
    return this.href && !this.disabled ? (
      <a
        class={{ nav: true, active: this.active }}
        href={this.href}
        aria-current={this.active ? 'page' : undefined}
        onClick={() => this.bchNavigate.emit(this.href)}
      >
        <slot />
      </a>
    ) : (
      <button
        class={{ nav: true, active: this.active }}
        type="button"
        disabled={this.disabled}
        aria-current={this.active ? 'page' : undefined}
        onClick={() => this.bchNavigate.emit(this.href)}
      >
        <slot />
      </button>
    );
  }
}
