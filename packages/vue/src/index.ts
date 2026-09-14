import type { App, Plugin } from 'vue';
import '@bench/components';

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
  }
}
