import { Component, Element, Event, type EventEmitter, Method, Prop, h } from '@stencil/core';

/**
 * Wraps the native `<input type="time">` rather than a hand-rolled
 * scroll-wheel widget: native time inputs already give consistent keyboard
 * support (arrow keys increment hour/minute/AM-PM segments) and a
 * platform-appropriate picker UI (spinner on desktop, wheel on mobile/iOS,
 * clock UI on Android) with better baseline accessibility than a custom
 * widget could realistically reach in this pass. `bch-date-picker` gets a
 * custom calendar because native `<input type="date">`'s UX/a11y is
 * inconsistent across browsers in ways that matter for a design system;
 * `<input type="time">` doesn't have the same problem, so this component
 * is a thin, consistently-styled wrapper instead of a reimplementation.
 */
@Component({ tag: 'bch-time-picker', styleUrl: 'field.css', shadow: false, scoped: true })
export class BchTimePicker {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() name = '';
  @Prop({ mutable: true }) value = ''; // HH:mm (24h), matches native <input type="time">
  @Prop() min?: string;
  @Prop() max?: string;
  @Prop() step?: number; // seconds
  @Prop() hint = '';
  @Prop() error = '';
  @Prop() required = false;
  @Prop() disabled = false;
  @Event() bchChange!: EventEmitter<string>;
  @Event() bchInput!: EventEmitter<string>;
  private input?: HTMLInputElement;

  @Method() async focusControl() { this.input?.focus(); }

  private onInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.bchInput.emit(this.value);
  };
  private onChange = () => this.bchChange.emit(this.value);

  render() {
    const id = this.host.id || `bch-time-picker-${this.name || 'field'}`;
    const describedBy = [this.hint ? `${id}-hint` : '', this.error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;
    return (
      <div class="field">
        {this.label ? <label class="label" htmlFor={id}>{this.label}{this.required ? ' *' : ''}</label> : null}
        <input
          ref={(el) => (this.input = el as HTMLInputElement)}
          id={id}
          type="time"
          value={this.value}
          min={this.min}
          max={this.max}
          step={this.step}
          required={this.required}
          disabled={this.disabled}
          aria-invalid={this.error ? 'true' : undefined}
          aria-describedby={describedBy}
          onInput={this.onInput}
          onChange={this.onChange}
        />
        {this.hint ? <span id={`${id}-hint`} class="message">{this.hint}</span> : null}
        {this.error ? <span id={`${id}-error`} class="message error" role="alert">{this.error}</span> : null}
      </div>
    );
  }
}
