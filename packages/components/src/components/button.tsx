import { Component, Element, Event, type EventEmitter, Method, Prop, h } from '@stencil/core';
import type { BchButtonVariant, BchSize } from '../types';

export type BchButtonSize = BchSize;

@Component({ tag: 'bch-button', styleUrl: 'button.css', shadow: false, scoped: true })
export class BchButton {
  @Element() host!: HTMLElement;
  @Prop() variant: BchButtonVariant = 'primary';
  @Prop() size: BchButtonSize = 'medium';
  @Prop() disabled = false;
  @Prop() loading = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop({ attribute: 'full-width' }) fullWidth = false;
  @Event() bchPress!: EventEmitter<MouseEvent>;
  private control?: HTMLButtonElement;

  @Method()
  async focusControl() {
    this.control?.focus();
  }

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled && !this.loading) this.bchPress.emit(event);
  };

  render() {
    const classes = {
      'bch-button': true,
      [`is-${this.variant}`]: true,
      [`is-${this.size}`]: true,
      'is-loading': this.loading,
      'is-full': this.fullWidth,
    };

    return (
      <button
        ref={(el) => (this.control = el as HTMLButtonElement)}
        class={classes}
        disabled={this.disabled || this.loading}
        type={this.type}
        aria-busy={this.loading ? 'true' : undefined}
        onClick={this.handleClick}
      >
        <span class="start">
          {this.loading ? <bch-spinner label="Loading" /> : <slot name="start" />}
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
