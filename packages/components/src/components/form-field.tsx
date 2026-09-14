import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-form-field', styleUrl: 'field.css', shadow: false, scoped: true })
export class BchFormField {
  @Prop() label = '';
  @Prop() hint = '';
  @Prop() error = '';
  @Prop() required = false;

  render() {
    return (
      <div class="field">
        {this.label ? <div class="label">{this.label}{this.required ? ' *' : ''}</div> : null}
        <slot />
        {this.error ? <div class="message error" role="alert">{this.error}</div> : this.hint ? <div class="message">{this.hint}</div> : null}
      </div>
    );
  }
}
