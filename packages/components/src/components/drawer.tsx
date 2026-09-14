import { Component, Element, Event, type EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-drawer', styleUrl: 'drawer.css', shadow: false, scoped: true })
export class BchDrawer {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) open = false;
  @Prop() label = '';
  /**
   * 'start'/'end' are logical and flip with document direction (recommended
   * for RTL support). 'left'/'right' are kept for backwards compatibility
   * and always render on that literal physical side regardless of `dir`.
   */
  @Prop() side: 'left' | 'right' | 'start' | 'end' = 'end';
  @Prop() closeOnEscape = true;
  @Event() bchOpen!: EventEmitter<void>;
  @Event() bchClose!: EventEmitter<void>;
  private previousFocus?: HTMLElement;
  private wasOpen = false;

  @Method() async show() { this.open = true; }
  @Method() async close() { this.open = false; }

  componentDidRender() {
    if (this.open && !this.wasOpen) {
      this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
      document.body.classList.add('bch-drawer-open');
      this.bchOpen.emit();
      requestAnimationFrame(() => this.host.querySelector<HTMLElement>('.drawer .close')?.focus());
    }
    if (!this.open && this.wasOpen) {
      document.body.classList.remove('bch-drawer-open');
      const target = this.previousFocus;
      this.previousFocus = undefined;
      this.bchClose.emit();
      requestAnimationFrame(() => target?.focus());
    }
    this.wasOpen = this.open;
  }

  disconnectedCallback() {
    document.body.classList.remove('bch-drawer-open');
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.open && event.key === 'Escape' && this.closeOnEscape) {
      event.preventDefault();
      this.open = false;
    }
  };

  render() {
    const titleId = `${this.host.id || 'bch-drawer'}-title`;
    return (
      <div class="drawer-root" hidden={!this.open} onKeyDown={this.onKeyDown}>
        <button class="scrim" type="button" aria-label="Close navigation" onClick={() => { this.open = false; }}></button>
        <aside class={`drawer is-${this.side}`} role="dialog" aria-modal="true" aria-labelledby={this.label ? titleId : undefined}>
          <header>
            {this.label ? <h2 id={titleId}>{this.label}</h2> : null}
            <button class="close" type="button" aria-label="Close" onClick={() => { this.open = false; }}><bch-icon name="x" /></button>
          </header>
          <div class="body"><slot /></div>
          <footer><slot name="footer" /></footer>
        </aside>
      </div>
    );
  }
}
