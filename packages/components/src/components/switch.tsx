import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-switch', styleUrl: 'choice.css', shadow: false, scoped: true })
export class BchSwitch {
  @Prop() label = '';
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() name = '';
  @Event() bchChange!: EventEmitter<boolean>;
  render() { return <label class="choice"><input type="checkbox" role="switch" name={this.name || undefined} checked={this.checked} disabled={this.disabled} onChange={(event) => { this.checked = (event.target as HTMLInputElement).checked; this.bchChange.emit(this.checked); }} /><span>{this.label}<slot /></span></label>; }
}
