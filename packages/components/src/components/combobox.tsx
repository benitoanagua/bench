import { Component, Element, Event, type EventEmitter, Prop, State, h } from '@stencil/core';
import { getDirectChildrenForBench } from '../util/direct-children';

/**
 * Type-ahead combobox following the WAI-ARIA 1.2 combobox pattern (input
 * with `role="combobox"` + a `role="listbox"` popup, `aria-activedescendant`
 * driving keyboard selection rather than moving real DOM focus).
 *
 *   <bch-combobox label="Country" name="country" value="us">
 *     <bch-combobox-option value="us">United States</bch-combobox-option>
 *     <bch-combobox-option value="ca">Canada</bch-combobox-option>
 *     <bch-combobox-option value="mx">Mexico</bch-combobox-option>
 *   </bch-combobox>
 *
 * Filtering is real (substring match against each option's text, live as
 * you type) — it operates on the actual slotted `<bch-combobox-option>`
 * elements (toggling `matched`/`active`/`selected` attributes on them, the
 * same light-DOM-child pattern used by `bch-breadcrumbs`/`bch-segmented-control`)
 * rather than re-rendering a parallel copy of the options.
 *
 * Set `allow-custom-value` to let the input's raw text become the value when
 * it doesn't match any option (e.g. a tags field); otherwise the input
 * reverts to the last matched option's label on blur/Escape.
 */
@Component({ tag: 'bch-combobox', styleUrl: 'combobox.css', shadow: false, scoped: true })
export class BchCombobox {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() name = '';
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder = '';
  @Prop() hint = '';
  @Prop() error = '';
  @Prop() required = false;
  @Prop() disabled = false;
  @Prop() allowCustomValue = false;
  @Prop() noResultsText = 'No results';
  @Event() bchChange!: EventEmitter<string>;
  @Event() bchInput!: EventEmitter<string>;

  @State() private open = false;
  @State() private query = '';
  @State() private activeIndex = 0;
  private input?: HTMLInputElement;
  private root?: HTMLElement;
  private listbox?: HTMLElement;
  private listboxId = '';

  private bindListbox = (el?: HTMLElement) => {
    if (el === this.listbox) return;
    this.listbox?.removeEventListener('bchSelect', this.onOptionSelect as EventListener);
    this.listbox = el;
    this.listbox?.addEventListener('bchSelect', this.onOptionSelect as EventListener);
  };

  componentWillLoad() {
    this.listboxId = `${this.host.id || 'bch-combobox'}-listbox`;
    this.syncQueryFromValue();
  }
  componentDidLoad() {
    this.applyFilter();
    document.addEventListener('click', this.onDocumentClick, true);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.onDocumentClick, true);
    this.listbox?.removeEventListener('bchSelect', this.onOptionSelect as EventListener);
  }

  private options(): HTMLElement[] {
    return Array.from(getDirectChildrenForBench(this.host, 'bch-combobox-option')) as HTMLElement[];
  }

  private syncQueryFromValue() {
    const match = this.options().find((o) => o.getAttribute('value') === this.value);
    this.query = match ? (match.textContent || '').trim() : this.allowCustomValue ? this.value : '';
  }

  /** Re-derives matched/active/selected on every real option element. */
  private applyFilter = () => {
    const needle = this.query.trim().toLowerCase();
    const options = this.options();
    let visibleIndex = 0;
    const visibleAt: number[] = [];
    options.forEach((option, index) => {
      if (!option.id) option.id = `${this.listboxId}-opt-${index}`;
      const text = (option.textContent || '').toLowerCase();
      const matches = !needle || text.includes(needle);
      // Explicit set/remove (not toggleAttribute): Stencil's mock-doc ignores
      // the `force` argument, which silently re-marks every option as matched.
      if (matches) option.setAttribute('matched', '');
      else option.removeAttribute('matched');
      if (option.getAttribute('value') === this.value) option.setAttribute('selected', '');
      else option.removeAttribute('selected');
      if (matches) {
        visibleAt.push(index);
        visibleIndex++;
      }
    });
    if (this.activeIndex >= visibleIndex) this.activeIndex = Math.max(visibleIndex - 1, 0);
    options.forEach((option, index) => {
      if (visibleAt[this.activeIndex] === index) option.setAttribute('active', '');
      else option.removeAttribute('active');
    });
  };

  private visibleOptions(): HTMLElement[] {
    return this.options().filter((o) => o.hasAttribute('matched'));
  }

  private onInput = (event: Event) => {
    this.query = (event.target as HTMLInputElement).value;
    this.open = true;
    this.activeIndex = 0;
    this.bchInput.emit(this.query);
    if (this.allowCustomValue) {
      this.value = this.query;
      this.bchChange.emit(this.value);
    }
    this.applyFilter();
  };

  private selectOption(option: HTMLElement) {
    const value = option.getAttribute('value') || '';
    this.value = value;
    this.query = (option.textContent || '').trim();
    this.open = false;
    this.bchChange.emit(value);
    this.applyFilter();
    this.input?.focus();
  }

  private onOptionSelect = (event: CustomEvent<string>) => {
    const match = this.options().find((o) => o.getAttribute('value') === event.detail);
    if (match) this.selectOption(match);
  };

  private moveActive(delta: number) {
    const visible = this.visibleOptions();
    if (visible.length === 0) return;
    this.activeIndex = (this.activeIndex + delta + visible.length) % visible.length;
    this.applyFilter();
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.open = true;
      this.moveActive(1);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveActive(-1);
      return;
    }
    if (event.key === 'Home' && this.open) {
      event.preventDefault();
      this.activeIndex = 0;
      this.applyFilter();
      return;
    }
    if (event.key === 'End' && this.open) {
      event.preventDefault();
      this.activeIndex = this.visibleOptions().length - 1;
      this.applyFilter();
      return;
    }
    if (event.key === 'Enter') {
      if (this.open) {
        const active = this.visibleOptions()[this.activeIndex];
        if (active) {
          event.preventDefault();
          this.selectOption(active);
        }
      }
      return;
    }
    if (event.key === 'Escape') {
      this.open = false;
      if (!this.allowCustomValue) this.syncQueryFromValue();
    }
  };

  private onDocumentClick = (event: MouseEvent) => {
    if (!this.open) return;
    if (!this.root?.contains(event.target as Node)) {
      this.open = false;
      if (!this.allowCustomValue) this.syncQueryFromValue();
    }
  };

  private clear = () => {
    this.value = '';
    this.query = '';
    this.bchChange.emit('');
    this.applyFilter();
    this.input?.focus();
  };

  render() {
    const id = this.host.id || `bch-combobox-${this.name || 'field'}`;
    const describedBy =
      [this.hint ? `${id}-hint` : '', this.error ? `${id}-error` : ''].filter(Boolean).join(' ') ||
      undefined;
    const visible = this.visibleOptions();
    const activeOption = visible[this.activeIndex];
    return (
      <div class="field bch-combobox" ref={(el) => (this.root = el as HTMLElement)}>
        {this.label ? (
          <label class="label" htmlFor={id}>
            {this.label}
            {this.required ? ' *' : ''}
          </label>
        ) : null}
        <div class="bch-combobox__control">
          <input
            ref={(el) => (this.input = el as HTMLInputElement)}
            id={id}
            role="combobox"
            aria-expanded={this.open ? 'true' : 'false'}
            aria-controls={this.listboxId}
            aria-autocomplete="list"
            aria-activedescendant={this.open && activeOption ? activeOption.id : undefined}
            aria-describedby={describedBy}
            autoComplete="off"
            placeholder={this.placeholder}
            disabled={this.disabled}
            required={this.required}
            value={this.query}
            onInput={this.onInput}
            onFocus={() => {
              this.open = true;
              this.applyFilter();
            }}
            onKeyDown={this.onKeyDown}
          />
          {this.value ? (
            <bch-icon-button
              name="x"
              label="Clear selection"
              size="small"
              onBchPress={this.clear}
            />
          ) : null}
        </div>
        <div
          id={this.listboxId}
          class="bch-combobox__listbox"
          role="listbox"
          hidden={!this.open}
          ref={(el) => this.bindListbox(el as HTMLElement | undefined)}
        >
          <slot onSlotchange={this.applyFilter} />
          {visible.length === 0 ? <p class="bch-combobox__empty">{this.noResultsText}</p> : null}
        </div>
        {this.hint ? (
          <span id={`${id}-hint`} class="message">
            {this.hint}
          </span>
        ) : null}
        {this.error ? (
          <span id={`${id}-error`} class="message error" role="alert">
            {this.error}
          </span>
        ) : null}
      </div>
    );
  }
}
