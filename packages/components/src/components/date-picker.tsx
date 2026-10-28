import { Component, Element, Event, type EventEmitter, Prop, State, h } from '@stencil/core';
import { parseISODate } from '../util/iso-date';

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Calendar-grid date picker (WAI-ARIA date picker dialog pattern: a text
 * input + a `role="dialog"` popup containing a `role="grid"` of real day
 * `<button>`s with roving tabindex — arrow keys move actual DOM focus
 * between days, not just `aria-activedescendant`).
 *
 * The stored/emitted `value` is always ISO `yyyy-mm-dd`, matching native
 * `<input type="date">` semantics, regardless of the `locale` used to
 * render weekday/month labels in the calendar UI itself — so a Spanish or
 * French `locale` prop changes what the calendar *looks like* without
 * changing what other code needs to parse.
 *
 *   <bch-date-picker label="Fecha de viaje" locale="es-BO" first-day-of-week="1" />
 */
@Component({ tag: 'bch-date-picker', styleUrl: 'date-picker.css', shadow: false, scoped: true })
export class BchDatePicker {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() name = '';
  @Prop({ mutable: true }) value = ''; // ISO yyyy-mm-dd
  @Prop() min?: string;
  @Prop() max?: string;
  @Prop() locale?: string;
  @Prop() firstDayOfWeek: 0 | 1 = 0;
  @Prop() hint = '';
  @Prop() error = '';
  @Prop() required = false;
  @Prop() disabled = false;
  @Prop() placeholder = 'YYYY-MM-DD';
  @Event() bchChange!: EventEmitter<string>;
  @Event() bchInput!: EventEmitter<string>;

  @State() private open = false;
  @State() private text = '';
  @State() private viewYear = new Date().getFullYear();
  @State() private viewMonth = new Date().getMonth();
  @State() private focusedDay = new Date().getDate();

  private input?: HTMLInputElement;
  private root?: HTMLElement;
  private gridRef?: HTMLElement;

  componentWillLoad() {
    this.syncFromValue();
  }
  componentDidLoad() {
    document.addEventListener('click', this.onDocumentClick, true);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  private syncFromValue() {
    const date = parseISODate(this.value);
    this.text = this.value || '';
    const base = date ?? new Date();
    this.viewYear = base.getFullYear();
    this.viewMonth = base.getMonth();
    this.focusedDay = base.getDate();
  }

  private onDocumentClick = (event: MouseEvent) => {
    if (this.open && !this.root?.contains(event.target as Node)) this.open = false;
  };

  private onTextInput = (event: Event) => {
    this.text = (event.target as HTMLInputElement).value;
    this.bchInput.emit(this.text);
    const parsed = parseISODate(this.text);
    if (parsed) {
      this.value = this.text;
      this.viewYear = parsed.getFullYear();
      this.viewMonth = parsed.getMonth();
      this.bchChange.emit(this.value);
    }
  };

  private toggleCalendar = () => {
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) requestAnimationFrame(() => this.focusActiveCell());
  };

  private isDisabled(date: Date): boolean {
    if (this.min) {
      const min = parseISODate(this.min);
      if (min && date < min) return true;
    }
    if (this.max) {
      const max = parseISODate(this.max);
      if (max && date > max) return true;
    }
    return false;
  }

  private selectDay(day: number) {
    const date = new Date(this.viewYear, this.viewMonth, day);
    if (this.isDisabled(date)) return;
    this.value = toISODate(date);
    this.text = this.value;
    this.focusedDay = day;
    this.open = false;
    this.bchChange.emit(this.value);
    this.input?.focus();
  }

  private changeMonth(delta: number) {
    let month = this.viewMonth + delta;
    let year = this.viewYear;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    if (month > 11) {
      month = 0;
      year += 1;
    }
    this.viewYear = year;
    this.viewMonth = month;
    this.focusedDay = Math.min(this.focusedDay, daysInMonth(year, month));
    requestAnimationFrame(() => this.focusActiveCell());
  }

  private focusActiveCell() {
    this.gridRef?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
  }

  private onGridKeyDown = (event: KeyboardEvent) => {
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in deltas) {
      event.preventDefault();
      const base = new Date(this.viewYear, this.viewMonth, this.focusedDay);
      base.setDate(base.getDate() + deltas[event.key]);
      this.viewYear = base.getFullYear();
      this.viewMonth = base.getMonth();
      this.focusedDay = base.getDate();
      requestAnimationFrame(() => this.focusActiveCell());
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      this.focusedDay = 1;
      requestAnimationFrame(() => this.focusActiveCell());
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      this.focusedDay = daysInMonth(this.viewYear, this.viewMonth);
      requestAnimationFrame(() => this.focusActiveCell());
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectDay(this.focusedDay);
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open = false;
      this.input?.focus();
      return;
    }
    if (event.key === 'PageUp') {
      event.preventDefault();
      this.changeMonth(-1);
      return;
    }
    if (event.key === 'PageDown') {
      event.preventDefault();
      this.changeMonth(1);
      return;
    }
  };

  private weekdayLabels(): string[] {
    const formatter = new Intl.DateTimeFormat(this.locale, { weekday: 'short' });
    // 2023-01-01..07 spans Sun..Sat once — a stable base week independent of `today`.
    const base = [1, 2, 3, 4, 5, 6, 7].map((d) => formatter.format(new Date(2023, 0, d)));
    return this.firstDayOfWeek === 1 ? [...base.slice(1), base[0]] : base;
  }

  private buildGrid(): (number | null)[] {
    const first = new Date(this.viewYear, this.viewMonth, 1);
    let leading = first.getDay() - this.firstDayOfWeek;
    if (leading < 0) leading += 7;
    const total = daysInMonth(this.viewYear, this.viewMonth);
    const cells: (number | null)[] = Array.from({ length: leading }, () => null);
    for (let d = 1; d <= total; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  render() {
    const id = this.host.id || `bch-date-picker-${this.name || 'field'}`;
    const monthLabel = new Intl.DateTimeFormat(this.locale, {
      month: 'long',
      year: 'numeric',
    }).format(new Date(this.viewYear, this.viewMonth, 1));
    const cells = this.buildGrid();
    const selected = parseISODate(this.value);
    const describedBy =
      [this.hint ? `${id}-hint` : '', this.error ? `${id}-error` : ''].filter(Boolean).join(' ') ||
      undefined;

    return (
      <div class="field bch-date-picker" ref={(el) => (this.root = el as HTMLElement)}>
        {this.label ? (
          <label class="label" htmlFor={id}>
            {this.label}
            {this.required ? ' *' : ''}
          </label>
        ) : null}
        <div class="bch-date-picker__control">
          <input
            ref={(el) => (this.input = el as HTMLInputElement)}
            id={id}
            type="text"
            inputMode="numeric"
            placeholder={this.placeholder}
            value={this.text}
            disabled={this.disabled}
            required={this.required}
            aria-describedby={describedBy}
            onInput={this.onTextInput}
            onFocus={() => {
              if (!this.disabled) this.open = true;
            }}
          />
          <bch-icon-button
            name="calendar"
            label="Open calendar"
            size="small"
            disabled={this.disabled}
            onBchPress={this.toggleCalendar}
          />
        </div>
        <div
          class="bch-date-picker__popup"
          hidden={!this.open}
          role="dialog"
          aria-label="Choose date"
          aria-modal="false"
        >
          <div class="bch-date-picker__nav">
            <bch-icon-button
              name="chevron-left"
              label="Previous month"
              size="small"
              onBchPress={() => this.changeMonth(-1)}
            />
            <span class="bch-date-picker__month" aria-live="polite">
              {monthLabel}
            </span>
            <bch-icon-button
              name="chevron-right"
              label="Next month"
              size="small"
              onBchPress={() => this.changeMonth(1)}
            />
          </div>
          <div
            class="bch-date-picker__grid"
            role="grid"
            aria-label={monthLabel}
            ref={(el) => (this.gridRef = el as HTMLElement)}
            onKeyDown={this.onGridKeyDown}
          >
            <div class="bch-date-picker__weekdays" role="row">
              {this.weekdayLabels().map((wd) => (
                <span role="columnheader" aria-hidden="true">
                  {wd}
                </span>
              ))}
            </div>
            {Array.from({ length: cells.length / 7 }, (_, row) => (
              <div role="row">
                {cells.slice(row * 7, row * 7 + 7).map((day) => {
                  if (day === null)
                    return (
                      <span
                        class="bch-date-picker__cell is-empty"
                        role="gridcell"
                        aria-hidden="true"
                      />
                    );
                  const date = new Date(this.viewYear, this.viewMonth, day);
                  const isSelected = Boolean(selected && isSameDay(selected, date));
                  const isFocusTarget = day === this.focusedDay;
                  const dayDisabled = this.isDisabled(date);
                  return (
                    <span role="gridcell">
                      <button
                        type="button"
                        class={{
                          'bch-date-picker__day': true,
                          'is-selected': isSelected,
                          'is-today': isSameDay(date, new Date()),
                        }}
                        tabIndex={isFocusTarget ? 0 : -1}
                        disabled={dayDisabled}
                        aria-selected={isSelected ? 'true' : undefined}
                        onClick={() => this.selectDay(day)}
                      >
                        {day}
                      </button>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
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
