import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-metric-card', styleUrl: 'metric-card.css', shadow: false, scoped: true })
export class BchMetricCard {
  @Prop() label = '';
  @Prop() value = '';
  @Prop() trend = '';
  @Prop() tone: 'neutral' | 'positive' | 'negative' = 'neutral';

  render() {
    return (
      <article class={`bch-metric-card bch-metric-card--${this.tone}`}>
        <div class="bch-metric-card__top">
          <span class="bch-metric-card__label">{this.label}</span>
          <slot name="icon" />
        </div>
        <strong class="bch-metric-card__value">{this.value}</strong>
        {this.trend ? <span class="bch-metric-card__trend">{this.trend}</span> : null}
        <slot />
      </article>
    );
  }
}
