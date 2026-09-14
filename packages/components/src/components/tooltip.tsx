import { Component, Element, Prop, State, h } from '@stencil/core';

@Component({ tag: 'bch-tooltip', styleUrl: 'tooltip.css', shadow: false, scoped: true })
export class BchTooltip {
  @Element() host!: HTMLElement;
  @Prop() text = '';
  @Prop() placement: 'top' | 'bottom' = 'top';
  @State() open = false;

  private show = () => { this.open = true; };
  private hide = () => { this.open = false; };

  render() {
    const id = `${this.host.id || 'bch-tooltip'}-content`;
    return (
      <span class="tooltip-root" onMouseEnter={this.show} onMouseLeave={this.hide} onFocusin={this.show} onFocusout={this.hide}>
        <span aria-describedby={this.open ? id : undefined}><slot /></span>
        {this.open && this.text ? <span id={id} class={`tooltip is-${this.placement}`} role="tooltip">{this.text}</span> : null}
      </span>
    );
  }
}
