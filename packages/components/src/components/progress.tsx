import { Component, Prop, h } from '@stencil/core';

/** Linear progress bar. Pairs with `<bch-spinner>` (circular, indeterminate-only). */
@Component({ tag: 'bch-progress', styleUrl: 'progress.css', shadow: false, scoped: true })
export class BchProgress {
  @Prop() value = 0; // 0-100, ignored when indeterminate
  @Prop() indeterminate = false;
  @Prop() label = '';
  @Prop() tone: 'action' | 'success' | 'danger' | 'warning' = 'action';

  render() {
    const clamped = Math.min(Math.max(this.value, 0), 100);
    return (
      <div class="bch-progress">
        {this.label ? <span class="bch-progress__label">{this.label}</span> : null}
        <div
          class={{
            'bch-progress__track': true,
            [`is-${this.tone}`]: true,
            'is-indeterminate': this.indeterminate,
          }}
          role="progressbar"
          aria-label={this.label || undefined}
          aria-valuemin={this.indeterminate ? undefined : 0}
          aria-valuemax={this.indeterminate ? undefined : 100}
          aria-valuenow={this.indeterminate ? undefined : clamped}
        >
          <div
            class="bch-progress__fill"
            style={this.indeterminate ? undefined : { width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  }
}
