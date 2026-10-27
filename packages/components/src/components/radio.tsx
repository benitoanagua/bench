import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-radio', styleUrl: 'choice.css', shadow: false, scoped: true })
export class BchRadio {
  @Prop() label = '';
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() name = '';
  @Prop() value = '';
  @Prop() required = false;
  @Event() bchChange!: EventEmitter<string>;
  render() {
    return (
      <label class="choice">
        <input
          type="radio"
          name={this.name || undefined}
          value={this.value}
          checked={this.checked}
          disabled={this.disabled}
          required={this.required}
          onChange={(event) => {
            this.checked = true;
            this.bchChange.emit((event.target as HTMLInputElement).value);
          }}
        />
        <span>
          {this.label}
          <slot />
        </span>
      </label>
    );
  }
}
