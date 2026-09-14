import { stencilContent } from './story-helpers';

export default { title: 'BENCH/Visual/State Matrix' };

export const Controls = {
  render: () => stencilContent(`
      <div style="display:grid;gap:32px;padding:32px;max-width:960px;background:var(--bch-color-background);color:var(--bch-color-text)">
        <section style="display:grid;gap:12px">
          <h2>Buttons</h2>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <bch-button>Default</bch-button>
            <bch-button disabled>Disabled</bch-button>
            <bch-button loading>Loading</bch-button>
            <bch-button variant="secondary">Secondary</bch-button>
            <bch-button variant="danger">Danger</bch-button>
          </div>
        </section>
        <section style="display:grid;gap:12px;max-width:420px">
          <h2>Fields</h2>
          <bch-input label="Default" placeholder="Value"></bch-input>
          <bch-input label="Error" error="This value is invalid" value="invalid"></bch-input>
          <bch-input label="Disabled" disabled value="Disabled"></bch-input>
          <bch-textarea label="Textarea" hint="Supporting text"></bch-textarea>
        </section>
        <section style="display:flex;gap:16px;align-items:center">
          <bch-badge tone="neutral">Neutral</bch-badge>
          <bch-badge tone="info">Info</bch-badge>
          <bch-badge tone="success">Success</bch-badge>
          <bch-badge tone="warning">Warning</bch-badge>
          <bch-badge tone="danger">Danger</bch-badge>
        </section>
      </div>
    `),
};
