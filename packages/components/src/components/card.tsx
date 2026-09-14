import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-card', styleUrl: 'card.css', shadow: false, scoped: true })
export class BchCard {
  @Prop() interactive = false;
  @Event() bchPress!: EventEmitter<MouseEvent | KeyboardEvent>;

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.interactive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.bchPress.emit(event);
    }
  };

  render() {
    return (
      <article
        class={{ card: true, interactive: this.interactive }}
        tabindex={this.interactive ? 0 : undefined}
        role={this.interactive ? 'button' : undefined}
        onClick={(event) => this.interactive && this.bchPress.emit(event)}
        onKeyDown={this.handleKeyDown}
      >
        <header><slot name="header" /></header>
        <div class="body"><slot /></div>
        <footer><slot name="footer" /></footer>
      </article>
    );
  }
}
