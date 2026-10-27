import { Component, Element, Event, type EventEmitter, Prop, h } from '@stencil/core';
import { getDirectChildrenForBench } from '../util/direct-children';

@Component({ tag: 'bch-tab', styleUrl: 'tabs.css', shadow: false, scoped: true })
export class BchTab {
  @Element() host!: HTMLElement;
  @Prop() value!: string;
  @Prop() active = false;
  @Prop() disabled = false;
  @Event({ bubbles: true, composed: true }) bchPress!: EventEmitter<string>;
  private id = `bch-tab-${Math.random().toString(36).slice(2)}`;

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = Array.from(
      this.host.parentElement ? getDirectChildrenForBench(this.host.parentElement, 'bch-tab') : [],
    ) as HTMLElement[];
    const enabled = tabs.filter((tab) => !tab.hasAttribute('disabled'));
    const current = enabled.indexOf(this.host);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? enabled.length - 1
          : (current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length;
    event.preventDefault();
    enabled[nextIndex]?.focus();
  };

  render() {
    const panelId = `${this.id}-panel`;
    return (
      <button
        id={this.id}
        class={{ tab: true, active: this.active }}
        role="tab"
        aria-selected={this.active ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={this.active ? 0 : -1}
        disabled={this.disabled}
        onClick={() => this.bchPress.emit(this.value)}
        onKeyDown={this.handleKeyDown}
      >
        <slot />
      </button>
    );
  }
}
