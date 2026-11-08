import { Component, Element, Event, type EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { getDirectChildrenForBench } from '../util/direct-children';

/**
 * Valor de un hijo (`bch-tab` / `bch-tab-panel`).
 *
 * La propiedad manda sobre el atributo. En HTML el valor llega como atributo,
 * pero desde JSX (Stencil) o React 19 se escribe como propiedad
 * del elemento: leer solo `getAttribute` devolvía `null` y el grupo se
 * quedaba sin pestaña activa y con todos los paneles ocultos.
 */
function valueOf(element: HTMLElement): string {
  const value = (element as HTMLElement & { value?: unknown }).value;
  if (typeof value === 'string') return value;
  return element.getAttribute('value') ?? '';
}

@Component({ tag: 'bch-tabs', styleUrl: 'tabs.css', shadow: false, scoped: true })
export class BchTabs {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) value = '';
  @Event() bchChange!: EventEmitter<string>;
  @State() private items: HTMLElement[] = [];
  private tabList?: HTMLElement;

  componentDidLoad() {
    this.refresh();
    this.tabList?.addEventListener('bchPress', this.onTabPress as EventListener);
  }
  disconnectedCallback() {
    this.tabList?.removeEventListener('bchPress', this.onTabPress as EventListener);
  }
  /**
   * Cambiar el valor desde fuera (la aplicación, un router, un binding) tiene
   * que reordenar el grupo igual que lo hace un clic en una pestaña.
   */
  @Watch('value')
  onValueChange() {
    this.syncChildren();
  }
  private refresh = () => {
    this.items = Array.from(getDirectChildrenForBench(this.host, 'bch-tab')) as HTMLElement[];
    if (!this.value && this.items[0]) this.value = valueOf(this.items[0]);
    this.syncChildren();
  };
  private syncChildren = () => {
    this.items.forEach((tab) => tab.setAttribute('active', String(valueOf(tab) === this.value)));
    Array.from(getDirectChildrenForBench(this.host, 'bch-tab-panel')).forEach((panel) => {
      const el = panel as HTMLElement;
      el.hidden = valueOf(el) !== this.value;
    });
  };
  private onTabPress = (event: CustomEvent<string>) => {
    const next = event.detail;
    if (!next) return;
    this.value = next;
    this.syncChildren();
    this.bchChange.emit(this.value);
  };

  render() {
    return (
      <div class="tabs">
        <div class="tab-list" role="tablist" aria-label="Tabs" ref={(el) => (this.tabList = el)}>
          <slot onSlotchange={this.refresh} />
        </div>
        <slot name="panel" />
      </div>
    );
  }
}
