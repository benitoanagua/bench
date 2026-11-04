import { Component, Element, Event, type EventEmitter, Prop, h } from '@stencil/core';
import { getDirectChildrenForBench } from '../util/direct-children';

@Component({ tag: 'bch-tab', styleUrl: 'tabs.css', shadow: false, scoped: true })
export class BchTab {
  @Element() host!: HTMLElement;
  @Prop() value!: string;
  @Prop() active = false;
  @Prop() disabled = false;
  @Event({ bubbles: true, composed: true }) bchPress!: EventEmitter<string>;

  /**
   * Id of the focusable button and id of the panel it controls.
   *
   * Both are derived from the owning group (`bch-tabs`) and the tab value, so
   * `bch-tab` and `bch-tab-panel` agree on them without any runtime
   * coordination: `aria-controls` and `aria-labelledby` always point at real
   * elements. A group with an `id` namespaces them (`my-tabs-tab-invoices`),
   * which is what keeps two groups with the same values apart; without a group
   * id the fallback is `bch-tab-<value>` / `bch-tab-panel-<value>`.
   */
  private get tabId(): string {
    const group = this.host.closest<HTMLElement>('bch-tabs');
    const value = this.value || 'tab';
    return group?.id ? `${group.id}-tab-${value}` : `bch-tab-${value}`;
  }

  private get panelId(): string {
    const group = this.host.closest<HTMLElement>('bch-tabs');
    const value = this.value || 'tab';
    return group?.id ? `${group.id}-panel-${value}` : `bch-tab-panel-${value}`;
  }

  private onClick = () => {
    if (this.disabled) return;
    this.bchPress.emit(this.value);
  };

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
    // The focusable element is the inner button, not the custom-element host.
    enabled[nextIndex]?.querySelector<HTMLButtonElement>('button')?.focus();
  };

  render() {
    return (
      <button
        id={this.tabId}
        class={{ tab: true, active: this.active }}
        role="tab"
        aria-selected={this.active ? 'true' : 'false'}
        aria-controls={this.panelId}
        tabIndex={this.active ? 0 : -1}
        disabled={this.disabled}
        onClick={this.onClick}
        onKeyDown={this.handleKeyDown}
      >
        <slot />
      </button>
    );
  }
}
