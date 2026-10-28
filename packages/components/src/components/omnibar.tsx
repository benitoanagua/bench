import {
  Component,
  Element,
  Event,
  type EventEmitter,
  Prop,
  State,
  h,
  Fragment,
} from '@stencil/core';
import { parseOmnibar, describeOmnibarQuery, type BchFunctionEntry } from '@bench/foundation';
import type { BchOmnibarResult } from './omnibar-model';

/**
 * The omnibar — the guaranteed path into every function of the system
 * (§4.1, herencia Oracle EBS / CLI-in-browser). Persistent input + dropdown
 * of results with hierarchical breadcrumb (`Facturación › Ventas › Nueva
 * factura`), arrow navigation with `Enter` to run.
 *
 *   <bch-omnibar
 *     placeholder="Search functions or filter (field:value)"
 *     entries={[{ id: 'nf', nombre: 'Nueva factura', path: [...], tipo: 'pantalla' }]}
 *   />
 *
 * Data flow: the app owns the function index (the `bench.functions.json`
 * manifest, ADR-009 tier b/c ranking helpers included) and passes it via the
 * `entries` prop. Ranking implemented here: (1) alias exact, (2) nombre
 * exact, (3) substring match across nombre + sinonimos + path tie-broken by
 * `frecuenciaUso` (§4.1 ranking, with a plain substring match instead of a
 * fuzzy library in v1).
 *
 * The input's live interpretation line (`.omnibar-hint`) shows how the query
 * will be interpreted before `Enter`, using the pure parser from
 * @bench/foundation, including its explicit unknown-field error.
 *
 * All keystrokes live *inside an already-focused input* — no global
 * keyboard listeners; leader keys and the Ctrl+K palette are explicitly an
 * app-level concern (ADR-009 tier c). `Escape` clears and closes, like a
 * combobox.
 */
@Component({ tag: 'bch-omnibar', styleUrl: 'omnibar.css', shadow: false, scoped: true })
export class BchOmnibar {
  @Element() host!: HTMLElement;
  /** Function index owned by the app (§4.1). */
  @Prop() entries: BchFunctionEntry[] = [];
  @Prop() placeholder = 'Search functions or filter (field:value)';
  @Event() bchRun!: EventEmitter<BchOmnibarResult>;
  @Event() bchInput!: EventEmitter<string>;

  @State() private query = '';
  @State() private open = false;
  @State() private activeIndex = 0;

  private input?: HTMLInputElement;

  private isFunctionEntry(result: BchOmnibarResult): result is BchFunctionEntry {
    return (result as BchFunctionEntry).id !== undefined && 'path' in result;
  }

  private results(): Array<BchOmnibarResult> {
    const query = this.query.trim();
    if (query === '') return this.entries.slice(0, 8);
    const wanted = query.toLowerCase();
    const scored = this.entries
      .map((entry) => {
        if (entry.alias && entry.alias.toLowerCase() === wanted) {
          return { entry, score: 1000 }; // alias exact wins absolutely (§4.1)
        }
        if (entry.nombre.toLowerCase() === wanted) {
          return { entry, score: 900 };
        }
        const haystacks = [entry.nombre, ...(entry.sinonimos ?? []), ...entry.path].map((s) =>
          s.toLowerCase(),
        );
        const hit = haystacks.findIndex((s) => s.includes(wanted));
        if (hit >= 0) return { entry, score: 500 - hit };
        return null;
      })
      .filter(Boolean) as Array<{ entry: BchFunctionEntry; score: number }>;
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.entry.frecuenciaUso ?? 0) - (a.entry.frecuenciaUso ?? 0);
    });
    // The raw query itself is always a possible result (free-text search).
    return [...scored.slice(0, 10).map((s) => s.entry), { text: query }];
  }

  private onQueryInput = (event: InputEvent) => {
    const value = (event.target as HTMLInputElement).value;
    this.query = value;
    this.open = value.trim() !== '';
    this.activeIndex = 0;
    this.bchInput.emit(value);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.query = '';
      this.open = false;
      this.activeIndex = 0;
      if (this.input) this.input.value = '';
      return;
    }
    if (!this.open) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, this.results().length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const choice = this.results()[this.activeIndex];
      if (choice) {
        this.bchRun.emit(choice);
        this.open = false;
      }
    }
  };

  private hint(): { text: string; isError: boolean } {
    const ast = parseOmnibar(this.query);
    return { text: describeOmnibarQuery(ast), isError: ast.kind === 'error' };
  }

  render() {
    const results = this.results();
    const hint = this.hint();
    const listId = `${this.host?.id || 'bch-omnibar'}-results`;
    return (
      <div class={{ omnibar: true, 'is-open': this.open }}>
        <input
          class="omnibar-input"
          type="search"
          role="combobox"
          aria-expanded={String(this.open)}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={this.placeholder}
          value={this.query}
          onInput={(e: InputEvent) => this.onQueryInput(e)}
          onKeyDown={(e: KeyboardEvent) => this.onKeyDown(e)}
          ref={(el?: HTMLInputElement) => (this.input = el)}
        />
        <span class={{ 'omnibar-hint': true, 'is-error': hint.isError }} aria-hidden="true">
          {hint.text}
        </span>
        <ul class="omnibar-results" role="listbox" id={listId} hidden={!this.open}>
          {results.map((result, i) => {
            const active = i === this.activeIndex;
            const isFunction = this.isFunctionEntry(result);
            return (
              <li
                key={
                  isFunction ? (result as BchFunctionEntry).id : (result as { text: string }).text
                }
                class={{ 'omnibar-result': true, 'is-active': active }}
                role="option"
                aria-selected={String(active)}
                onMouseDown={(e: MouseEvent) => {
                  e.preventDefault(); // keep focus in the input
                  this.activeIndex = i;
                  this.bchRun.emit(result);
                  this.open = false;
                }}
              >
                {isFunction ? (
                  <>
                    <span class="omnibar-result__breadcrumb">
                      {(result as BchFunctionEntry).path.join(' › ')}
                    </span>
                    <span class="omnibar-result__name">{(result as BchFunctionEntry).nombre}</span>
                  </>
                ) : (
                  <>
                    <span class="omnibar-result__breadcrumb">Search</span>
                    <span class="omnibar-result__name">'{(result as { text: string }).text}'</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
