import { Component, Element, Event, type EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-select', styleUrl: 'field.css', shadow: false, scoped: true })
export class BchSelect {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() name = '';
  @Prop({ mutable: true }) value = '';
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() hint = '';
  @Prop() error = '';
  @Event() bchChange!: EventEmitter<string>;
  private select?: HTMLSelectElement;

  @Method()
  async focusControl() {
    this.select?.focus();
  }

  componentDidRender() {
    if (this.select) this.select.value = this.value;
  }

  render() {
    const id = this.host.id || `bch-select-${this.name || 'field'}`;
    const describedBy =
      [this.hint ? `${id}-hint` : '', this.error ? `${id}-error` : ''].filter(Boolean).join(' ') ||
      undefined;
    return (
      <div class="field">
        {this.label ? (
          <label class="label" htmlFor={id}>
            {this.label}
            {this.required ? ' *' : ''}
          </label>
        ) : null}
        <select
          ref={(el) => (this.select = el as HTMLSelectElement)}
          id={id}
          name={this.name || undefined}
          disabled={this.disabled}
          required={this.required}
          aria-invalid={this.error ? 'true' : undefined}
          aria-describedby={describedBy}
          onChange={(e) => {
            this.value = (e.target as HTMLSelectElement).value;
            this.bchChange.emit(this.value);
          }}
        >
          <slot />
        </select>
        {this.hint ? (
          <span id={`${id}-hint`} class="message">
            {this.hint}
          </span>
        ) : null}
        {this.error ? (
          <span id={`${id}-error`} class="message error" role="alert">
            {this.error}
          </span>
        ) : null}
      </div>
    );
  }
}
