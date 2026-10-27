import { stencilContent } from './story-helpers';

export default { title: 'BENCH/Quality/State Matrix' };

export const States = {
  render: () =>
    stencilContent(`
      <div style="display:grid;gap:32px;padding:32px;max-width:960px">
        <section style="display:grid;gap:12px"><h2>Buttons</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><bch-button>Default</bch-button><bch-button disabled>Disabled</bch-button><bch-button loading>Loading</bch-button><bch-button variant="danger">Danger</bch-button></div></section>
        <section style="display:grid;gap:12px"><h2>Forms</h2><bch-input label="Default" placeholder="Value"></bch-input><bch-input label="Error" error="This value is invalid" value="invalid"></bch-input><bch-checkbox label="Enabled"></bch-checkbox><bch-switch label="Enabled switch"></bch-switch></section>
        <section style="display:grid;gap:12px"><h2>Disclosure</h2><bch-accordion><bch-accordion-item value="one" label="Section one">Content one</bch-accordion-item><bch-accordion-item value="two" label="Section two">Content two</bch-accordion-item></bch-accordion></section>
      </div>`),
};
