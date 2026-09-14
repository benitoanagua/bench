import { stencilContent } from './story-helpers';

export default {
  title: 'BENCH/Quality/Production Matrix',
};

const controls = `
  <div style="display:grid;gap:24px;max-width:720px">
    <section><h3>Actions</h3><div style="display:flex;gap:12px;flex-wrap:wrap">
      <bch-button variant="primary">Primary</bch-button>
      <bch-button variant="secondary">Secondary</bch-button>
      <bch-button variant="danger">Delete</bch-button>
      <bch-button loading>Saving</bch-button>
      <bch-icon-button name="search" label="Search"></bch-icon-button>
    </div></section>
    <section style="display:grid;gap:12px"><h3>Forms</h3>
      <bch-input label="Email" value="person@example.com" hint="We'll never share your email"></bch-input>
      <bch-input label="Invalid" error="Enter a valid value" value="bad"></bch-input>
      <bch-textarea label="Message" rows="4"></bch-textarea>
      <bch-checkbox label="Remember me"></bch-checkbox>
      <bch-radio name="matrix" value="one" label="Option one"></bch-radio>
      <bch-radio name="matrix" value="two" label="Option two"></bch-radio>
      <bch-switch label="Notifications"></bch-switch>
      <bch-select label="Country"><option value="bo">Bolivia</option><option value="ar">Argentina</option></bch-select>
    </section>
    <section><h3>Composition</h3><bch-card interactive><span slot="header">Interactive card</span>Keyboard accessible content.<span slot="footer"><bch-badge tone="success">Ready</bch-badge></span></bch-card></section>
    <section><h3>Navigation & disclosure</h3>
      <bch-tabs value="one"><bch-tab value="one">Overview</bch-tab><bch-tab value="two">Details</bch-tab><bch-tab-panel slot="panel" value="one">Overview content</bch-tab-panel><bch-tab-panel slot="panel" value="two">Details content</bch-tab-panel></bch-tabs>
      <br/><bch-accordion><bch-accordion-item value="a" label="First section">First content.</bch-accordion-item><bch-accordion-item value="b" label="Second section">Second content.</bch-accordion-item></bch-accordion>
      <br/><bch-nav><bch-nav-item active href="#overview">Overview</bch-nav-item><bch-nav-item href="#settings">Settings</bch-nav-item></bch-nav>
    </section>
  </div>`;

export const Production = { render: () => stencilContent(controls) };
