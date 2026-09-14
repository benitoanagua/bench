import { Component, Element, Event, type EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-input', styleUrl: 'field.css', shadow: false, scoped: true })
export class BchInput {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() name = '';
  @Prop() type = 'text';
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder = '';
  @Prop() hint = '';
  @Prop() error = '';
  @Prop() required = false;
  @Prop() disabled = false;
  @Prop() readonly = false;
  @Prop() autocomplete?: string;
  @Prop() inputmode?: HTMLInputElement['inputMode'];
  @Event() bchInput!: EventEmitter<string>;
  @Event() bchChange!: EventEmitter<string>;
  private input?: HTMLInputElement;

  @Method()
  async focusControl() { this.input?.focus(); }

  @Method()
  async select() { this.input?.select(); }

  private id() { return this.host.id || `bch-input-${this.name || 'field'}`; }
  private onInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.bchInput.emit(this.value);
  };
  private onChange = () => this.bchChange.emit(this.value);

  render() {
    const id = this.id();
    const describedBy = [this.hint ? `${id}-hint` : '', this.error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;
    return <div class="field">
      {this.label ? <label class="label" htmlFor={id}>{this.label}{this.required ? ' *' : ''}</label> : null}
      <input ref={(el) => this.input = el as HTMLInputElement} id={id} name={this.name || undefined} type={this.type} value={this.value} placeholder={this.placeholder} required={this.required} disabled={this.disabled} readOnly={this.readonly} autoComplete={this.autocomplete} inputMode={this.inputmode} aria-invalid={this.error ? 'true' : undefined} aria-describedby={describedBy} onInput={this.onInput} onChange={this.onChange} />
      {this.hint ? <span id={`${id}-hint`} class="message">{this.hint}</span> : null}
      {this.error ? <span id={`${id}-error`} class="message error" role="alert">{this.error}</span> : null}
    </div>;
  }
}
