import type { App, Plugin } from 'vue';
import '@bench/components';

/**
 * Coverage: every component in packages/components/src/components/*.tsx now
 * has an entry below (accordion/accordion-item, dialog, drawer, form-field,
 * nav/nav-item, spinner, tab/tab-panel/tabs, tooltip were the last 12 added
 * — `toast.tsx` implements `bch-toast-region`, already covered, so it was
 * never actually a 13th gap). @bench/vue intentionally stays untyped
 * per-prop (just `tag: HTMLElement`) — that's the existing, lighter-weight
 * convention for this package, not a shortcut taken only for these 12; see
 * @bench/react for the fully prop-typed equivalent.
 */
export const BenchVue: Plugin = {
  install(app: App) {
    app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('bch-');
  },
};

declare module 'vue' {
  interface GlobalComponents {
    'bch-button': HTMLElement;
    'bch-icon': HTMLElement;
    'bch-icon-button': HTMLElement;
    'bch-input': HTMLElement;
    'bch-textarea': HTMLElement;
    'bch-checkbox': HTMLElement;
    'bch-radio': HTMLElement;
    'bch-switch': HTMLElement;
    'bch-select': HTMLElement;
    'bch-card': HTMLElement;
    'bch-badge': HTMLElement;
    'bch-avatar': HTMLElement;
    'bch-progress': HTMLElement;
    'bch-skeleton': HTMLElement;
    'bch-slider': HTMLElement;
    'bch-pagination': HTMLElement;
    'bch-breadcrumbs': HTMLElement;
    'bch-breadcrumb-item': HTMLElement;
    'bch-menu': HTMLElement;
    'bch-menu-item': HTMLElement;
    'bch-segmented-control': HTMLElement;
    'bch-segmented-item': HTMLElement;
    'bch-toast-region': HTMLElement;
    'bch-combobox': HTMLElement;
    'bch-combobox-option': HTMLElement;
    'bch-date-picker': HTMLElement;
    'bch-time-picker': HTMLElement;
    'bch-file-upload': HTMLElement;
    'bch-accordion': HTMLElement;
    'bch-accordion-item': HTMLElement;
    'bch-dialog': HTMLElement;
    'bch-drawer': HTMLElement;
    'bch-form-field': HTMLElement;
    'bch-nav': HTMLElement;
    'bch-nav-item': HTMLElement;
    'bch-spinner': HTMLElement;
    'bch-tab': HTMLElement;
    'bch-tab-panel': HTMLElement;
    'bch-tabs': HTMLElement;
    'bch-tooltip': HTMLElement;
  }
}
