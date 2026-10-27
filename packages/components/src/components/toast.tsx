import { Component, Element, Method, Prop, State, h } from '@stencil/core';

export type BchToastTone = 'info' | 'success' | 'warning' | 'danger';

export interface BchToastOptions {
  /** Auto-generated if omitted. Pass your own to dedupe/replace a toast. */
  id?: string;
  tone?: BchToastTone;
  heading?: string;
  message: string;
  /** ms before auto-dismiss. 0 = persistent (user must dismiss). Default 5000. */
  duration?: number;
}

interface ActiveToast extends Required<Omit<BchToastOptions, 'id'>> {
  id: string;
}

let idCounter = 0;

/**
 * A single region that owns a real dismiss queue (not just a visual list) —
 * new toasts queue behind `maxVisible` active ones and promote automatically
 * as older toasts are dismissed or time out. Mount one `<bch-toast-region>`
 * per app (or per surface that needs its own notification area) and call
 * `.show()` on it via a ref, e.g.:
 *
 *   const region = document.querySelector('bch-toast-region');
 *   await region.show({ tone: 'success', message: 'Saved.' });
 */
@Component({ tag: 'bch-toast-region', styleUrl: 'toast.css', shadow: false, scoped: true })
export class BchToastRegion {
  @Element() host!: HTMLElement;
  @Prop() placement: 'top' | 'bottom' = 'bottom';
  @Prop() maxVisible = 3;

  @State() private active: ActiveToast[] = [];
  @State() private queue: ActiveToast[] = [];
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  @Method()
  async show(options: BchToastOptions): Promise<string> {
    const id = options.id ?? `bch-toast-${++idCounter}`;
    const toast: ActiveToast = {
      id,
      tone: options.tone ?? 'info',
      heading: options.heading ?? '',
      message: options.message,
      duration: options.duration ?? 5000,
    };
    // Replace an existing toast with the same id instead of duplicating it.
    this.dismiss(id, { silent: true });
    if (this.active.length < this.maxVisible) {
      this.activate(toast);
    } else {
      this.queue = [...this.queue, toast];
    }
    return id;
  }

  @Method()
  async dismiss(id: string, opts: { silent?: boolean } = {}) {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    const wasActive = this.active.some((t) => t.id === id);
    this.active = this.active.filter((t) => t.id !== id);
    this.queue = this.queue.filter((t) => t.id !== id);
    if (wasActive && !opts.silent) this.promoteNext();
  }

  @Method()
  async clear() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.active = [];
    this.queue = [];
  }

  disconnectedCallback() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  private activate(toast: ActiveToast) {
    this.active = [...this.active, toast];
    if (toast.duration > 0) {
      const timer = setTimeout(() => this.dismiss(toast.id), toast.duration);
      this.timers.set(toast.id, timer);
    }
  }

  private promoteNext() {
    const [next, ...rest] = this.queue;
    if (!next) return;
    this.queue = rest;
    this.activate(next);
  }

  render() {
    return (
      <div class={`bch-toast-region is-${this.placement}`} role="region" aria-label="Notifications">
        {this.active.map((t) => (
          <div
            key={t.id}
            class={`bch-toast bch-toast--${t.tone}`}
            role={t.tone === 'danger' ? 'alert' : 'status'}
            aria-live={t.tone === 'danger' ? 'assertive' : 'polite'}
          >
            <div class="bch-toast__content">
              {t.heading ? <strong>{t.heading}</strong> : null}
              <div>{t.message}</div>
            </div>
            <bch-icon-button
              name="x"
              label="Dismiss"
              size="small"
              onBchPress={() => this.dismiss(t.id)}
            />
          </div>
        ))}
      </div>
    );
  }
}
