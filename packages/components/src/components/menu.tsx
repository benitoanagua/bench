import {
  Component,
  Element,
  Event,
  type EventEmitter,
  Method,
  Prop,
  State,
  h,
} from '@stencil/core';
import { getDirectChildrenForBench } from '../util/direct-children';

/**
 * A trigger + popover menu. The first slotted element (typically an
 * `<bch-button>` or `<bch-icon-button>` with `slot="trigger"`) opens the menu;
 * slotted `<bch-menu-item>` children make up the menu content.
 *
 *   <bch-menu label="Row actions">
 *     <bch-button slot="trigger">Actions</bch-button>
 *     <bch-menu-item value="edit">Edit</bch-menu-item>
 *     <bch-menu-item value="duplicate">Duplicate</bch-menu-item>
 *     <bch-menu-item value="delete" tone="danger">Delete</bch-menu-item>
 *   </bch-menu>
 */
@Component({ tag: 'bch-menu', styleUrl: 'menu.css', shadow: false, scoped: true })
export class BchMenu {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) open = false;
  @Prop() label = '';
  @Prop() placement: 'bottom-start' | 'bottom-end' = 'bottom-start';
  @Event() bchOpenChange!: EventEmitter<boolean>;
  @Event() bchSelect!: EventEmitter<string>;

  @State() private items: HTMLElement[] = [];
  private root?: HTMLElement;
  private trigger?: HTMLElement;
  private list?: HTMLElement;

  private bindList = (el?: HTMLElement) => {
    if (el === this.list) return;
    this.list?.removeEventListener('bchSelect', this.onItemSelect as EventListener);
    this.list = el;
    this.list?.addEventListener('bchSelect', this.onItemSelect as EventListener);
  };

  @Method() async show() {
    this.setOpen(true);
  }
  @Method() async close() {
    this.setOpen(false);
  }

  componentDidLoad() {
    this.refreshItems();
    document.addEventListener('click', this.onDocumentClick, true);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.onDocumentClick, true);
    this.list?.removeEventListener('bchSelect', this.onItemSelect as EventListener);
  }

  private refreshItems = () => {
    this.items = Array.from(getDirectChildrenForBench(this.host, 'bch-menu-item')) as HTMLElement[];
  };

  private setOpen(next: boolean) {
    if (this.open === next) return;
    this.open = next;
    this.bchOpenChange.emit(next);
    if (next)
      requestAnimationFrame(() =>
        (this.items[0]?.querySelector('button') as HTMLElement | null)?.focus(),
      );
    else (this.trigger?.querySelector('button, a') as HTMLElement | null)?.focus();
  }

  private onTriggerClick = () => this.setOpen(!this.open);

  private onDocumentClick = (event: MouseEvent) => {
    if (!this.open) return;
    if (!this.root?.contains(event.target as Node)) this.setOpen(false);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.open) return;
    const buttons = this.items
      .map((item) => item.querySelector('button'))
      .filter(Boolean) as HTMLButtonElement[];
    const currentIndex = buttons.findIndex((b) => b === document.activeElement);
    if (event.key === 'Escape') {
      event.preventDefault();
      this.setOpen(false);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      buttons[(currentIndex + 1 + buttons.length) % buttons.length]?.focus();
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      buttons[(currentIndex - 1 + buttons.length) % buttons.length]?.focus();
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      buttons[0]?.focus();
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      buttons[buttons.length - 1]?.focus();
      return;
    }
  };

  private onItemSelect = (event: CustomEvent<string>) => {
    this.bchSelect.emit(event.detail);
    this.setOpen(false);
  };

  render() {
    const menuId = `${this.host.id || 'bch-menu'}-list`;
    return (
      <div
        class="bch-menu"
        ref={(el) => (this.root = el as HTMLElement)}
        onKeyDown={this.onKeyDown}
      >
        <span
          class="bch-menu__trigger"
          ref={(el) => (this.trigger = el as HTMLElement)}
          onClick={this.onTriggerClick}
        >
          <slot name="trigger" />
        </span>
        <div
          id={menuId}
          class={{ 'bch-menu__list': true, [`is-${this.placement}`]: true, 'is-open': this.open }}
          role="menu"
          aria-label={this.label || undefined}
          hidden={!this.open}
          ref={(el) => this.bindList(el as HTMLElement | undefined)}
        >
          <slot onSlotchange={this.refreshItems} />
        </div>
      </div>
    );
  }
}
