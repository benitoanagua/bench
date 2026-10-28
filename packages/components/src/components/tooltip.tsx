import { Component, Element, Prop, State, h } from '@stencil/core';

@Component({ tag: 'bch-tooltip', styleUrl: 'tooltip.css', shadow: false, scoped: true })
export class BchTooltip {
  @Element() host!: HTMLElement;
  @Prop() text = '';
  @Prop() placement: 'top' | 'bottom' = 'top';
  @State() open = false;

  /* §4.4 — "delay adaptativo": el primer show es ~450ms (banda convencional
     documentada, no un valor inventado); tras el primer show el modo
     exploración usa delay 0 mientras el tooltip siga activo en la sesión.
     Un reset (salir del trigger/host y quedarse sin foco) reactiva el delay. */
  private static readonly TOOLTIP_FIRST_DELAY_MS = 450;

  /** true una vez ocurrió el primer show: se entra en modo exploración (delay 0). */
  private explored = false;
  private pendingTimer?: number; // ReturnType<typeof setTimeout> no serializa; number en DOM
  private sessionActive = false;

  private readonly show = () => {
    this.sessionActive = true;
    this.schedule(this.explored ? 0 : BchTooltip.TOOLTIP_FIRST_DELAY_MS);
  };

  private schedule(delay: number) {
    this.cancel();
    if (delay === 0) {
      this.doShow();
      return;
    }
    this.pendingTimer = window.setTimeout(() => this.doShow(), delay);
  }
  private doShow() {
    this.pendingTimer = undefined;
    if (this.sessionActive) {
      this.open = true;
      this.explored = true;
    }
  }
  private cancel() {
    if (this.pendingTimer !== undefined) {
      window.clearTimeout(this.pendingTimer);
      this.pendingTimer = undefined;
    }
  }

  private readonly onLeave = () => {
    this.sessionActive = false;
    this.cancel();
    if (this.explored || this.open) {
      this.open = false;
    }
    // Al perder el hover definitivamente (sin foco en el host) reactiva el delay.
    if (!this.host.matches(':focus-within')) {
      this.explored = false;
    }
  };

  render() {
    const id = `${this.host.id || 'bch-tooltip'}-content`;
    return (
      <span
        class="tooltip-root"
        onMouseEnter={this.show}
        onMouseLeave={this.onLeave}
        onFocusin={this.show}
        onFocusout={this.onLeave}
      >
        <span aria-describedby={this.open ? id : undefined}>
          <slot />
        </span>
        {this.open && this.text ? (
          <span id={id} class={`tooltip is-${this.placement}`} role="tooltip">
            {this.text}
          </span>
        ) : null}
      </span>
    );
  }
}
