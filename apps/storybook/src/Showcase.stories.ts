import { stencilContent } from './story-helpers';

export default { title: 'BENCH/Showcase' };

export const ProductSurface = {
  render: () => stencilContent(`
      <div style="display:grid;gap:24px;padding:32px;max-width:1100px;background:var(--bch-color-background);color:var(--bch-color-text)">
        <div style="display:grid;gap:8px">
          <span style="font-size:.75rem;color:var(--bch-color-text-muted);text-transform:uppercase;letter-spacing:.08em">Composable UI</span>
          <h1 style="margin:0;font-size:clamp(2rem,5vw,3.5rem);letter-spacing:-.04em">BENCH in action</h1>
          <p style="margin:0;max-width:65ch;color:var(--bch-color-text-muted)">A small set of higher-level components demonstrates tokens, slots, native semantics, responsive behavior, states and Carbon iconography working together.</p>
        </div>

        <bch-alert tone="success" heading="Everything is composed from BENCH primitives.">No framework-specific UI logic is required.</bch-alert>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px">
          <bch-metric-card label="Components" value="20+" trend="Growing" tone="positive"><bch-icon slot="icon" name="settings"></bch-icon></bch-metric-card>
          <bch-metric-card label="A11y baseline" value="AA" trend="Built in"></bch-metric-card>
          <bch-metric-card label="Icon set" value="Carbon" trend="One source"></bch-metric-card>
        </div>

        <bch-toolbar>
          <span slot="start" style="font-weight:700">Recent items</span>
          <bch-input placeholder="Filter" aria-label="Filter items"></bch-input>
          <div slot="end"><bch-button variant="secondary"><bch-icon slot="start" name="arrow-down"></bch-icon>Export</bch-button><bch-button><bch-icon slot="start" name="plus"></bch-icon>Create</bch-button></div>
        </bch-toolbar>

        <bch-data-table caption="Recent items" columns='[{"key":"name","label":"Name"},{"key":"status","label":"Status"},{"key":"amount","label":"Amount","numeric":true}]' rows='[{"name":"Alpha","status":"Ready","amount":"$1,240"},{"name":"Beta","status":"Review","amount":"$860"},{"name":"Gamma","status":"Ready","amount":"$2,410"}]'></bch-data-table>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px">
          <bch-card><span slot="header">Composition</span><p style="margin:0;color:var(--bch-color-text-muted)">Cards, buttons, icons, fields and status elements compose without leaking implementation details.</p><span slot="footer"><bch-status tone="success">Ready</bch-status></span></bch-card>
          <bch-empty-state heading="No saved views" description="Create a view to keep your favorite filters close at hand."><bch-icon slot="icon" name="settings" aria-label=""></bch-icon><div slot="actions"><bch-button variant="secondary">Learn more</bch-button><bch-button>Create view</bch-button></div></bch-empty-state>
        </div>
      </div>
    `),
};

export const Responsive = {
  render: () => stencilContent(`<div style="padding:24px;max-width:720px"><bch-toolbar><span slot="start">Filters</span><bch-input placeholder="Search" aria-label="Search"></bch-input><div slot="end"><bch-button variant="secondary">Reset</bch-button><bch-button>Apply</bch-button></div></bch-toolbar></div>`),
};
