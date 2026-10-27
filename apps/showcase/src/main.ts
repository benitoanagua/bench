import '@bench/tokens/tokens.css';
import '@bench/components';
import './styles.css';

type View = 'overview' | 'activity' | 'forms' | 'settings';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="shell">
    <aside class="sidebar" aria-label="Primary navigation">
      <div class="brand">
        <div class="brand-mark">B</div>
        <div><strong>BENCH</strong><span>Showcase</span></div>
      </div>
      <nav class="sidebar-nav">
        <button type="button" class="nav-link is-active" data-view="overview"><bch-icon name="activity"></bch-icon><span>Overview</span></button>
        <button type="button" class="nav-link" data-view="activity"><bch-icon name="activity"></bch-icon><span>Activity</span></button>
        <button type="button" class="nav-link" data-view="forms"><bch-icon name="clipboard"></bch-icon><span>Forms</span></button>
        <button type="button" class="nav-link" data-view="settings"><bch-icon name="settings"></bch-icon><span>Settings</span></button>
      </nav>
      <div class="sidebar-bottom">
        <bch-status tone="success" label="System ready"></bch-status>
        <small>Stencil · Web Components</small>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div class="topbar-title"><span class="eyebrow">PRODUCT SURFACE</span><h1 id="page-title">Overview</h1></div>
        <div class="topbar-actions">
          <button class="icon-control" id="theme-toggle" aria-label="Toggle theme"><bch-icon name="settings"></bch-icon></button>
          <button class="icon-control" id="menu-toggle" aria-label="Open navigation"><bch-icon name="menu-2"></bch-icon></button>
          <bch-button id="create-button"><bch-icon slot="start" name="plus"></bch-icon>Create</bch-button>
        </div>
      </header>

      <div class="content">
        <section class="view" data-panel="overview">
          <bch-alert tone="info" heading="BENCH is running the whole surface" dismissible>
            Every element below is composed from BENCH Web Components, tokens and Carbon Icons.
          </bch-alert>

          <div class="hero-grid">
            <div class="hero-copy">
              <span class="eyebrow">DESIGN SYSTEM IN ACTION</span>
              <h2>One system, many surfaces.</h2>
              <p>Use this application as the reference surface for composition, responsive behavior, accessibility and visual consistency.</p>
              <div class="hero-actions">
                <bch-button id="hero-create"><bch-icon slot="start" name="plus"></bch-icon>Create item</bch-button>
                <bch-button variant="secondary" id="hero-learn"><bch-icon slot="start" name="info-circle"></bch-icon>Explore system</bch-button>
              </div>
            </div>
            <bch-card class="hero-card">
              <span slot="header" class="card-heading">System health</span>
              <div class="health"><bch-status tone="success">Healthy</bch-status><strong>99.9%</strong></div>
              <p class="muted">Components are rendering consistently across the supported viewport matrix.</p>
              <div slot="footer" class="card-footer"><span>Last check</span><strong>Just now</strong></div>
            </bch-card>
          </div>

          <div class="metrics-grid">
            <bch-metric-card label="Components" value="24" trend="+4 this release" tone="positive"><bch-icon slot="icon" name="settings"></bch-icon></bch-metric-card>
            <bch-metric-card label="Visual states" value="86" trend="All core states covered" tone="positive"><bch-icon slot="icon" name="activity"></bch-icon></bch-metric-card>
            <bch-metric-card label="A11y checks" value="100%" trend="Keyboard + semantics" tone="positive"><bch-icon slot="icon" name="check"></bch-icon></bch-metric-card>
            <bch-metric-card label="Icon set" value="1" trend="Carbon only"><bch-icon slot="icon" name="settings"></bch-icon></bch-metric-card>
          </div>

          <section class="surface-grid">
            <bch-card>
              <span slot="header" class="card-heading">Recent activity</span>
              <div class="activity-list">
                <div class="activity-row"><span class="activity-icon"><bch-icon name="plus"></bch-icon></span><div><strong>New component</strong><p>bch-empty-state added to the showcase.</p></div><time>2m</time></div>
                <div class="activity-row"><span class="activity-icon"><bch-icon name="activity"></bch-icon></span><div><strong>Theme updated</strong><p>Dark mode tokens verified across surfaces.</p></div><time>18m</time></div>
                <div class="activity-row"><span class="activity-icon"><bch-icon name="check"></bch-icon></span><div><strong>Accessibility passed</strong><p>Keyboard and focus checks completed.</p></div><time>42m</time></div>
              </div>
              <div slot="footer" class="card-footer"><span>Showing latest</span><bch-button variant="tertiary" size="small" id="activity-link">View all</bch-button></div>
            </bch-card>

            <bch-card>
              <span slot="header" class="card-heading">Composition</span>
              <div class="composition-demo">
                <bch-status tone="info">Reusable</bch-status>
                <h3>Slots keep components open for composition.</h3>
                <p class="muted">Icons, actions and content can be inserted without changing component logic.</p>
                <div class="mini-actions"><bch-button size="small" variant="secondary">Secondary</bch-button><bch-button size="small">Primary</bch-button></div>
              </div>
            </bch-card>
          </section>
        </section>

        <section class="view" data-panel="activity" hidden>
          <div class="section-intro"><div><span class="eyebrow">DATA DISPLAY</span><h2>Activity</h2><p>Responsive tables, semantic status and toolbar composition.</p></div><bch-button><bch-icon slot="start" name="arrow-down"></bch-icon>Export</bch-button></div>
          <bch-toolbar>
            <span slot="start" class="toolbar-label">Recent events</span>
            <bch-input id="activity-search" placeholder="Search events" aria-label="Search events"></bch-input>
            <div slot="end"><bch-button size="small" variant="secondary">Filters</bch-button></div>
          </bch-toolbar>
          <div id="table-mount"></div>
          <div class="two-col">
            <bch-empty-state heading="No saved filters" description="Create a saved view to keep your most useful activity filters close at hand."><bch-icon slot="icon" name="settings"></bch-icon><div slot="actions"><bch-button>Create filter</bch-button></div></bch-empty-state>
            <bch-card><span slot="header" class="card-heading">Statuses</span><div class="status-stack"><bch-status tone="success">Ready</bch-status><bch-status tone="warning">Review</bch-status><bch-status tone="danger">Blocked</bch-status><bch-status tone="info">Processing</bch-status></div></bch-card>
          </div>
        </section>

        <section class="view" data-panel="forms" hidden>
          <div class="section-intro"><div><span class="eyebrow">FORMS + ACCESSIBILITY</span><h2>Forms</h2><p>Native semantics, clear errors and predictable focus behavior.</p></div></div>
          <div class="form-layout">
            <bch-card>
              <span slot="header" class="card-heading">Create workspace</span>
              <form id="demo-form" class="demo-form">
                <bch-input id="workspace-name" label="Workspace name" name="workspace" required hint="Use a short, recognizable name."></bch-input>
                <bch-input id="workspace-email" label="Owner email" name="email" type="email" required></bch-input>
                <bch-select id="workspace-type" label="Workspace type" name="type" required><option value="">Select one</option><option value="product">Product</option><option value="design">Design system</option><option value="internal">Internal</option></bch-select>
                <bch-textarea id="workspace-notes" label="Notes" name="notes" hint="Optional context for your team."></bch-textarea>
                <div class="check-row"><bch-checkbox id="workspace-agree" label="I understand this is a demo surface."></bch-checkbox></div>
                <div class="form-actions"><bch-button type="reset" variant="secondary">Reset</bch-button><bch-button type="submit">Create workspace</bch-button></div>
                <div id="form-feedback" aria-live="polite"></div>
              </form>
            </bch-card>
            <div class="form-side">
              <bch-card><span slot="header" class="card-heading">Form contract</span><ul class="contract-list"><li><bch-icon name="check"></bch-icon>Native form semantics</li><li><bch-icon name="check"></bch-icon>Associated labels and descriptions</li><li><bch-icon name="check"></bch-icon>Visible keyboard focus</li><li><bch-icon name="check"></bch-icon>Consistent validation states</li></ul></bch-card>
              <bch-alert tone="success" heading="Accessible by default">The components expose the semantics; the application only owns the workflow.</bch-alert>
            </div>
          </div>
        </section>

        <section class="view" data-panel="settings" hidden>
          <div class="section-intro"><div><span class="eyebrow">SYSTEM CONFIGURATION</span><h2>Settings</h2><p>A small surface for demonstrating tabs, disclosure and drawer composition.</p></div></div>
          <bch-tabs id="settings-tabs">
            <bch-tab value="appearance">Appearance</bch-tab>
            <bch-tab value="behavior">Behavior</bch-tab>
            <bch-tab-panel slot="panel" value="appearance"><div class="settings-panel"><bch-switch label="Dark mode" id="settings-dark"></bch-switch><bch-switch label="Reduced motion" id="settings-motion"></bch-switch><bch-accordion multiple><bch-accordion-item value="tokens" label="Tokens"><p>Primitive and semantic tokens provide the visual foundation.</p></bch-accordion-item><bch-accordion-item value="icons" label="Icons"><p>BENCH exposes Carbon Icons through a minimal bch-icon API.</p></bch-accordion-item></bch-accordion></div></bch-tab-panel>
            <bch-tab-panel slot="panel" value="behavior"><div class="settings-panel"><bch-alert tone="info" heading="Keyboard first">Try Tab, Enter, Space and Escape across the surface.</bch-alert><bch-button id="open-drawer">Open drawer</bch-button></div></bch-tab-panel>
          </bch-tabs>
        </section>
      </div>
    </main>
  </div>
  <bch-dialog id="create-dialog" label="Create item"><p>This dialog demonstrates native dialog semantics, focus restoration and composable footer actions.</p><div slot="footer"><bch-button variant="secondary" id="cancel-dialog">Cancel</bch-button><bch-button id="confirm-dialog">Create item</bch-button></div></bch-dialog>
  <bch-drawer id="mobile-drawer" label="Navigation"><div class="drawer-nav"><button type="button" data-view="overview">Overview</button><button type="button" data-view="activity">Activity</button><button type="button" data-view="forms">Forms</button><button type="button" data-view="settings">Settings</button></div></bch-drawer>
`;

const table = document.createElement('bch-data-table') as HTMLElement & {
  columns: unknown;
  rows: unknown;
};
table.columns = [
  { key: 'name', label: 'Event' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'amount', label: 'Value', numeric: true },
];
table.rows = [
  { name: 'Component published', status: 'Ready', owner: 'Maya', amount: '$2,410' },
  { name: 'Visual baseline', status: 'Review', owner: 'Leo', amount: '$860' },
  { name: 'A11y audit', status: 'Ready', owner: 'Nina', amount: '$1,240' },
  { name: 'Token update', status: 'Ready', owner: 'Owen', amount: '$540' },
];
document.querySelector('#table-mount')!.appendChild(table);

const dialog = document.querySelector('#create-dialog') as HTMLElement & {
  show: () => Promise<void>;
};
document
  .querySelectorAll('#create-button, #hero-create')
  .forEach((button) => button.addEventListener('bchPress', () => dialog.show()));
document
  .querySelector('#cancel-dialog')
  ?.addEventListener('bchPress', () =>
    (dialog as HTMLElement & { close: () => Promise<void> }).close(),
  );
document
  .querySelector('#confirm-dialog')
  ?.addEventListener('bchPress', () =>
    (dialog as HTMLElement & { close: () => Promise<void> }).close(),
  );

document.querySelector('#theme-toggle')?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
});

document
  .querySelector('#menu-toggle')
  ?.addEventListener('click', () =>
    (
      document.querySelector('#mobile-drawer') as HTMLElement & { show: () => Promise<void> }
    ).show(),
  );
document
  .querySelector('#open-drawer')
  ?.addEventListener('bchPress', () =>
    (
      document.querySelector('#mobile-drawer') as HTMLElement & { show: () => Promise<void> }
    ).show(),
  );

document.querySelector('#settings-dark')?.addEventListener('bchChange', (event) => {
  const checked = (event as CustomEvent<boolean>).detail;
  document.documentElement.dataset.theme = checked ? 'dark' : 'light';
});

document.querySelector('#demo-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const feedback = document.querySelector('#form-feedback')!;
  feedback.innerHTML =
    '<bch-alert tone="success" heading="Workspace created">The demo workflow completed successfully.</bch-alert>';
});

document.querySelectorAll('.nav-link, .drawer-nav button').forEach((item) => {
  item.addEventListener('click', () => switchView(item.getAttribute('data-view') as View));
});

document
  .querySelector('#activity-link')
  ?.addEventListener('bchPress', () => switchView('activity'));

function switchView(view: View) {
  document.querySelectorAll<HTMLElement>('.view').forEach((panel) => {
    panel.hidden = panel.dataset.panel !== view;
  });
  document
    .querySelectorAll('.nav-link')
    .forEach((item) => item.classList.toggle('is-active', item.getAttribute('data-view') === view));
  const title = document.querySelector('#page-title');
  if (title) title.textContent = view[0].toUpperCase() + view.slice(1);
  document
    .querySelectorAll('.drawer-nav button')
    .forEach((item) => item.classList.toggle('is-active', item.getAttribute('data-view') === view));
}
