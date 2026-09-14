import { stencilContent } from './story-helpers';

export default {
  title: 'BENCH/Components/Gallery',
};

export const Core = {
  render: () => stencilContent(`
      <div style="display:grid;gap:24px;padding:32px;max-width:900px;background:var(--bch-color-background);color:var(--bch-color-text)">
        <section style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <bch-button variant="primary"><bch-icon slot="start" name="plus"></bch-icon>Primary</bch-button>
          <bch-button variant="secondary">Secondary</bch-button>
          <bch-button variant="tertiary">Tertiary</bch-button>
          <bch-button variant="danger">Danger</bch-button>
          <bch-icon-button name="search" label="Search"></bch-icon-button><bch-spinner label="Loading"></bch-spinner>
        </section>
        <section style="display:grid;gap:16px;max-width:420px">
          <bch-input label="Email" placeholder="you@example.com" hint="Use your account email"></bch-input>
          <bch-textarea label="Message" placeholder="Write a message"></bch-textarea>
          <bch-checkbox label="Remember me"></bch-checkbox>
          <bch-radio name="choice" value="one" label="Option one"></bch-radio>
          <bch-switch label="Notifications"></bch-switch>
          <bch-select label="Country"><option value="bo">Bolivia</option><option value="ar">Argentina</option></bch-select>
        </section>
        <section style="display:grid;gap:12px">
          <bch-card>
            <span slot="header">Card header</span>
            Content area
            <span slot="footer"><bch-badge tone="success">Ready</bch-badge></span>
          </bch-card>
        </section>
      </div>
    `),
};
