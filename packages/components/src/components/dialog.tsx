import { Component, Element, Event, type EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-dialog', styleUrl: 'dialog.css', shadow: false, scoped: true })
export class BchDialog {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) open = false;
  @Prop() label = '';
  @Prop() closeOnEscape = true;
  @Event() bchOpen!: EventEmitter<void>;
  @Event() bchClose!: EventEmitter<void>;
  private dialog?: HTMLDialogElement;
  private previousFocus?: HTMLElement;

  @Method() async show() { this.open = true; }
  @Method() async close() { this.open = false; }

  componentDidRender() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) {
      this.previousFocus = document.activeElement as HTMLElement;
      this.dialog.showModal();
      this.bchOpen.emit();
    } else if (!this.open && this.dialog.open) {
      this.dialog.close();
      this.previousFocus?.focus();
      this.bchClose.emit();
    }
  }

  private onCancel = (event: Event) => {
    if (!this.closeOnEscape) event.preventDefault();
    else { this.open = false; }
  };
  private onClose = () => { if (this.open) this.open = false; };

  render() {
    const titleId = `${this.host.id || 'bch-dialog'}-title`;
    return (
      <dialog ref={(el) => this.dialog = el as HTMLDialogElement} class="dialog" aria-labelledby={this.label ? titleId : undefined} onCancel={this.onCancel} onClose={this.onClose}>
        <div class="dialog-panel">
          <header class="dialog-header">
            {this.label ? <h2 id={titleId}>{this.label}</h2> : null}
            <button type="button" class="close" aria-label="Close" onClick={() => { this.open = false; }}><bch-icon name="x" /></button>
          </header>
          <div class="dialog-body"><slot /></div>
          <footer class="dialog-footer"><slot name="footer" /></footer>
        </div>
      </dialog>
    );
  }
}
