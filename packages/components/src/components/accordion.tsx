import { Component, Element, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-accordion', styleUrl: 'accordion.css', shadow: false, scoped: true })
export class BchAccordion {
  @Element() host!: HTMLElement;
  @Prop() multiple = false;
  @Event() bchChange!: EventEmitter<string[]>;
  private openItems: string[] = [];

  componentDidLoad() { this.refresh(); }
  private refresh = () => Array.from(this.host.querySelectorAll(':scope > bch-accordion-item')).forEach((item) => item.addEventListener('bchToggle', this.onToggle as EventListener));
  disconnectedCallback() { Array.from(this.host.querySelectorAll(':scope > bch-accordion-item')).forEach((item) => item.removeEventListener('bchToggle', this.onToggle as EventListener)); }
  private onToggle = (event: Event) => {
    const value = (event as CustomEvent<boolean>).detail;
    const item = event.target as HTMLElement;
    const key = item.getAttribute('value') || '';
    if (value) this.openItems = this.multiple ? [...new Set([...this.openItems, key])] : [key];
    else this.openItems = this.openItems.filter((v) => v !== key);
    this.bchChange.emit(this.openItems);
    this.sync();
  };
  private sync = () => Array.from(this.host.querySelectorAll(':scope > bch-accordion-item')).forEach((item) => item.setAttribute('open', String(this.openItems.includes(item.getAttribute('value') || ''))));
  render() { return <div class="accordion"><slot /></div>; }
}

