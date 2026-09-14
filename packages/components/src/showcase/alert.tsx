import { Component, Event, type EventEmitter, Prop, State, h } from '@stencil/core';

@Component({ tag: 'bch-alert', styleUrl: 'alert.css', shadow: false, scoped: true })
export class BchAlert {
  @State() visible = true;
  @Event() bchDismiss!: EventEmitter<void>;

  @Prop() tone: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Prop() heading = '';
  @Prop() dismissible = false;

  private dismiss = () => { this.visible = false; this.bchDismiss.emit(); };

  render() {
    if (!this.visible) return null;
    return (
      <section class={`bch-alert bch-alert--${this.tone}`} role={this.tone === 'danger' ? 'alert' : 'status'}>
        <div class="bch-alert__content">
          {this.heading ? <strong>{this.heading}</strong> : null}
          <div><slot /></div>
        </div>
        {this.dismissible ? <bch-icon-button name="x" label="Dismiss" size="small" onBchPress={this.dismiss} /> : null}
      </section>
    );
  }
}
