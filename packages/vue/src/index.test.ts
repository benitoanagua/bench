import { describe, expect, it } from 'vitest';
import { createApp, defineComponent, h } from 'vue';
import { BenchVue } from './index';

describe('@bench/vue', () => {
  it('registra los bch-* al instalar el plugin', () => {
    const app = createApp(defineComponent({ render: () => h('div') }));
    app.use(BenchVue);

    expect(customElements.get('bch-button')).toBeDefined();
    expect(customElements.get('bch-input')).toBeDefined();
    expect(customElements.get('bch-dialog')).toBeDefined();
  });

  it('marca bch-* como nativos para el compilador de Vue', () => {
    const app = createApp(defineComponent({ render: () => h('div') }));
    app.use(BenchVue);

    const isCustomElement = app.config.compilerOptions.isCustomElement;
    if (typeof isCustomElement !== 'function') throw new Error('isCustomElement not configured');
    expect(isCustomElement('bch-button')).toBe(true);
    expect(isCustomElement('button')).toBe(false);
  });
});
