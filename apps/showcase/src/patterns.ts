/**
 * Tier (c) application patterns — ADR-009.
 *
 * These demos are *composition*, not library code. BENCH supplies the parts
 * (omnibar, menu, drawer, splitter, tree, tabs…) and the application owns the
 * behaviour: keyboard orchestration, permissions, persistence, undo stack.
 * Nothing here is part of `@bench/components`; each demo maps 1:1 to a guide
 * in `docs/integrations/patterns/`.
 *
 * The overlays (dialogs and drawers) live outside the views: a modal opened
 * from a hidden view would be rendered inside a `display: none` subtree and
 * would never be seen.
 */
import './patterns.css';
import manifest from '../bench.functions.json';

type FunctionEntry = {
  id: string;
  nombre: string;
  path: string[];
  sinonimos?: string[];
  alias?: string;
  permisos?: string[];
  tipo: 'pantalla' | 'accion' | 'macro' | 'reporte';
  frecuenciaUso?: number;
};

type TreeNode = { id: string; label: string; children?: TreeNode[] };

type WithValue = HTMLElement & { value: string };
type WithTone = HTMLElement & { tone: string };
type WithLabel = HTMLElement & { label: string };
type WithMode = HTMLElement & { mode: string };
type WithDisabled = HTMLElement & { disabled: boolean };
type WithEntries = HTMLElement & { entries: FunctionEntry[] };
type WithItems = HTMLElement & { items?: TreeNode[] };
type Overlay = HTMLElement & { show(): Promise<void>; close(): Promise<void> };

const functionIndex = (manifest as { functions: FunctionEntry[] }).functions;

const $ = <T extends HTMLElement>(selector: string, scope: ParentNode = document): T =>
  scope.querySelector(selector) as T;

function setStatus(element: HTMLElement | null, tone: string, text: string) {
  if (!element) return;
  (element as WithTone).tone = tone;
  (element as WithLabel).label = text;
}

/** A pattern block: the demo plus the heading that ties it to its guide. */
function pattern(id: string, spec: string, title: string, description: string, body: string) {
  return `
    <article class="pattern" id="${id}" aria-labelledby="${id}-title">
      <header class="pattern__head">
        <span class="eyebrow">${spec} · TIER C</span>
        <h3 id="${id}-title">${title}</h3>
        <p class="muted">${description}</p>
      </header>
      <div class="pattern__body">${body}</div>
    </article>`;
}

const RECORD_CARDS = [
  {
    id: 'inv-4381',
    title: 'Invoice #4381',
    client: 'AC Constructores',
    amount: '1,240.00 €',
    status: 'In review',
    tone: 'warning',
  },
  {
    id: 'inv-4382',
    title: 'Invoice #4382',
    client: 'Globex',
    amount: '860.00 €',
    status: 'Issued',
    tone: 'success',
  },
  {
    id: 'nc-021',
    title: 'Credit note #021',
    client: 'Initech',
    amount: '310.00 €',
    status: 'Draft',
    tone: 'neutral',
  },
];

const INTRO = `
  <div class="section-intro">
    <div>
      <span class="eyebrow">APPLICATION PATTERNS · TIER C</span>
      <h2>Application patterns</h2>
      <p>Composition recipes from spec §4. BENCH supplies the parts; the application owns the behaviour, the data and the storage.</p>
    </div>
  </div>
`;

const DEMOS = [
  pattern(
    'demo-command-palette',
    'SPEC §4.1',
    'Command palette & leader keys',
    'The omnibar indexes the application functions; the keyboard orchestration stays in the application.',
    `
      <div class="pattern__row">
        <bch-button id="palette-open">Open palette</bch-button>
        <bch-mode-badge id="palette-leader" mode="normal" label="Leader armed"></bch-mode-badge>
        <span class="muted">Press <kbd>Ctrl</kbd>+<kbd>K</kbd>, or <kbd>g</kbd> then <kbd>f</kbd>.</span>
      </div>
      <bch-status id="palette-status" tone="info" label="No function executed yet."></bch-status>
    `,
  ),
  pattern(
    'demo-context-menu',
    'SPEC §4.2',
    'Context menus',
    'Eight to ten actions on the object under the cursor — a menu, not a navigation.',
    `
      <div class="pattern__row">
        <bch-menu id="context-menu" label="Invoice actions">
          <bch-icon-button slot="trigger" name="chevron-down" label="Invoice actions"></bch-icon-button>
          <bch-menu-item value="open">Open</bch-menu-item>
          <bch-menu-item value="duplicate">Duplicate</bch-menu-item>
          <bch-menu-item value="send">Send by email</bch-menu-item>
          <bch-menu-item value="pdf">Export PDF</bch-menu-item>
          <bch-menu-item value="hold">Mark on hold</bch-menu-item>
          <bch-menu-item value="credit">Issue credit note</bch-menu-item>
          <bch-menu-item value="split">Split the amount</bch-menu-item>
          <bch-menu-item value="assign">Reassign</bch-menu-item>
          <bch-menu-item value="delete" tone="danger">Delete</bch-menu-item>
        </bch-menu>
        <bch-status id="context-status" tone="info" label="No action selected."></bch-status>
      </div>
    `,
  ),
  pattern(
    'demo-layout-persistence',
    'SPEC §4.3',
    'Layout persistence',
    'The splitter only emits deltas; the application owns the widths — and decides where to store them.',
    `
      <div class="layout-demo">
        <div class="layout-pane" id="layout-pane-left">
          <bch-toolbar><span slot="start" class="toolbar-label">Invoices</span></bch-toolbar>
          <p class="muted">Drag the separator, or focus it and use the arrow keys.</p>
        </div>
        <bch-splitter id="layout-splitter" orientation="horizontal"></bch-splitter>
        <div class="layout-pane" id="layout-pane-right">
          <p class="muted">The second pane. The layout belongs to the application, not to the splitter.</p>
        </div>
      </div>
      <div class="pattern__row">
        <bch-status id="layout-status" tone="info" label="Layout restored."></bch-status>
        <bch-button id="layout-reset" variant="secondary">Reset layout</bch-button>
      </div>
    `,
  ),
  pattern(
    'demo-inspector',
    'SPEC §4.3',
    'Inspector panel',
    'The inspector is a non-modal drawer: the list behind stays usable while the details update.',
    `
      <div class="inspector-grid">
        <div>
          <bch-tree id="inspector-tree"></bch-tree>
          <p class="muted">Select a node to fill the inspector.</p>
        </div>
        <div>
          <bch-button id="inspector-open">Open inspector</bch-button>
          <p class="muted" id="inspector-selection">Nothing selected yet.</p>
        </div>
      </div>
    `,
  ),
  pattern(
    'demo-workspace',
    'SPEC §4.3',
    'Workspaces',
    'Switching workspace changes the context, not the application: every group keeps its own tabs.',
    `
      <div class="pattern__row">
        <bch-menu id="workspace-menu" label="Workspace">
          <bch-icon-button slot="trigger" name="workspace" label="Switch workspace"></bch-icon-button>
          <bch-menu-item value="finance">Finance</bch-menu-item>
          <bch-menu-item value="operations">Operations</bch-menu-item>
        </bch-menu>
        <bch-status id="workspace-status" tone="info" label="Workspace: Finance"></bch-status>
      </div>
      <div id="workspace-groups">
        <bch-tabs id="workspace-finance" class="workspace-group" value="invoices">
          <bch-tab value="invoices">Invoices</bch-tab>
          <bch-tab value="customers">Customers</bch-tab>
          <bch-tab-panel slot="panel" value="invoices">Finance · Invoices</bch-tab-panel>
          <bch-tab-panel slot="panel" value="customers">Finance · Customers</bch-tab-panel>
        </bch-tabs>
        <bch-tabs id="workspace-operations" class="workspace-group is-hidden" value="stock">
          <bch-tab value="stock">Stock</bch-tab>
          <bch-tab value="warehouses">Warehouses</bch-tab>
          <bch-tab-panel slot="panel" value="stock">Operations · Stock</bch-tab-panel>
          <bch-tab-panel slot="panel" value="warehouses">Operations · Warehouses</bch-tab-panel>
        </bch-tabs>
      </div>
    `,
  ),
  pattern(
    'demo-window-placement',
    'SPEC §4.3',
    'Window placement',
    'Multi-window placement is an optional capability: without it, the application keeps working as usual.',
    `
      <div class="pattern__row">
        <bch-button id="screens-detect">Detect screens</bch-button>
        <bch-status id="screens-status" tone="info" label="Not checked yet."></bch-status>
      </div>
      <p class="muted">The detection is opt-in: the application never asks for a permission it cannot work without.</p>
    `,
  ),
  pattern(
    'demo-record-cards',
    'SPEC §4.3',
    'Record cards',
    'A card is one subject with its own identity — the grid of records, not a table of rows.',
    `
      <div class="record-grid" id="record-grid"></div>
    `,
  ),
  pattern(
    'demo-modes',
    'SPEC §4.4',
    'Modes and cursors',
    'The badge and the cursor always agree on the active mode; the badge is the one that survives a touchscreen.',
    `
      <div class="pattern__row">
        <bch-segmented-control id="mode-control" value="select" label="Mode">
          <bch-segmented-item value="select">Select</bch-segmented-item>
          <bch-segmented-item value="edit">Edit</bch-segmented-item>
        </bch-segmented-control>
        <bch-mode-badge id="mode-badge" mode="select" label="Select"></bch-mode-badge>
      </div>
      <div class="mode-surface" id="mode-surface">
        <p class="muted">The mode changes how the clicks are read, never what the data means.</p>
      </div>
    `,
  ),
  pattern(
    'demo-balloon-help',
    'SPEC §4.4',
    'Balloon help',
    'A tooltip is one sentence; a balloon help is the paragraph that explains the process.',
    `
      <div class="pattern__row">
        <bch-tooltip
          text="The invoice number is immutable once issued. To correct it, issue a credit note."
          placement="bottom"
        >
          <bch-icon-button name="information" label="Help about the invoice number"></bch-icon-button>
        </bch-tooltip>
        <bch-form-field label="Invoice number">
          <bch-input id="balloon-number" value="INV-4381"></bch-input>
        </bch-form-field>
      </div>
      <bch-card class="balloon-card">
        <span slot="header" class="card-heading">Pinned balloon</span>
        <p class="muted">A balloon that stays open holds the explanation while the user keeps working.</p>
      </bch-card>
    `,
  ),
  pattern(
    'demo-macros',
    'SPEC §4.5',
    'Macros',
    'The recorder is application state; the UI is BENCH. A macro is published in the index as any other function.',
    `
      <div class="pattern__row">
        <bch-button id="macro-record"><span id="macro-record-label">Record macro</span></bch-button>
        <bch-button id="macro-step" variant="secondary" disabled>Add step</bch-button>
        <bch-button id="macro-replay" variant="secondary" disabled>Replay macro</bch-button>
        <bch-status id="macro-status" tone="info" label="Idle."></bch-status>
      </div>
      <ol class="macro-steps" id="macro-steps"></ol>
    `,
  ),
  pattern(
    'demo-apply',
    'SPEC §4.5',
    'Apply pattern',
    'Snapshot, live edit and discard are three different things: only the apply makes the change real.',
    `
      <bch-form-field label="Client name">
        <bch-input id="apply-input" value="AC Constructores"></bch-input>
      </bch-form-field>
      <div class="pattern__row">
        <bch-status id="apply-status" tone="success" label="Applied."></bch-status>
        <bch-button id="apply-apply">Apply</bch-button>
        <bch-button id="apply-discard" variant="secondary">Discard</bch-button>
      </div>
    `,
  ),
  pattern(
    'demo-undo',
    'SPEC §4.5',
    'Undo history',
    'The history panel shows what is going to be undone, and the undo action is always visible.',
    `
      <bch-card>
        <span slot="header" class="card-heading">History</span>
        <ul class="undo-list" id="undo-list"></ul>
        <span slot="footer" class="card-footer">
          <span id="undo-size">0 actions</span>
          <bch-button id="undo-button" variant="secondary" disabled><span id="undo-label">Undo</span></bch-button>
        </span>
      </bch-card>
      <div class="pattern__row">
        <bch-button id="undo-rename" variant="secondary">Rename client</bch-button>
        <bch-button id="undo-line" variant="secondary">Add invoice line</bch-button>
      </div>
    `,
  ),
  pattern(
    'demo-templates',
    'SPEC §4.5',
    'Templates',
    'An unconfirmed template is provisional: it says so, with the provisional line and nowhere else.',
    `
      <div class="template-grid" id="template-grid">
        <bch-empty-state
          id="template-draft"
          heading="Invoice template"
          description="Draft: complete it before issuing."
          provisional
        >
          <bch-button slot="actions" variant="secondary" id="template-discard">Discard</bch-button>
          <bch-button slot="actions" id="template-confirm">Confirm template</bch-button>
        </bch-empty-state>
      </div>
    `,
  ),
  pattern(
    'demo-persistence',
    'SPEC §4.6',
    'Persistence',
    'The storage is the application’s: IndexedDB behind a Web Worker, with the state reported in the interface.',
    `
      <div class="pattern__row">
        <bch-input id="persistence-note" label="Note" placeholder="Write a note to persist"></bch-input>
        <bch-button id="persistence-save">Save note</bch-button>
        <bch-button id="persistence-load" variant="secondary">Recover note</bch-button>
      </div>
      <bch-status id="persistence-status" tone="info" label="Nothing stored yet."></bch-status>
    `,
  ),
  pattern(
    'demo-secure-fields',
    'SPEC §4.6',
    'Secure fields',
    'Caps Lock is a state, not an error; the organization selector says out loud which context is active.',
    `
      <div class="secure-grid">
        <div>
          <bch-input id="secure-password" label="Password" type="password"></bch-input>
          <bch-status id="caps-status" tone="neutral" label="Caps Lock is off"></bch-status>
        </div>
        <div>
          <bch-select id="secure-org" label="Organization">
            <option value="acm">AC Constructores</option>
            <option value="globex">Globex</option>
          </bch-select>
          <p class="muted" id="org-context">Context: AC Constructores</p>
        </div>
      </div>
    `,
  ),
].join('');

const DEMO_HTML = `<div class="patterns">${INTRO}${DEMOS}</div>`;

const OVERLAYS = `
  <bch-dialog id="palette-dialog" label="Search functions">
    <bch-omnibar id="palette-omnibar" placeholder="Search functions or filter (field:value)"></bch-omnibar>
    <p class="muted" id="palette-hint">The index comes from the application manifest (bench.functions.json).</p>
    <div slot="footer">
      <bch-button variant="secondary" id="palette-close">Close</bch-button>
    </div>
  </bch-dialog>

  <bch-drawer id="inspector-drawer" label="Inspector" side="end">
    <bch-form-field label="Client"><bch-input id="inspector-client" readonly></bch-input></bch-form-field>
    <bch-form-field label="Status"><bch-input id="inspector-status" readonly></bch-input></bch-form-field>
    <bch-form-field label="Amount"><bch-input id="inspector-amount" readonly></bch-input></bch-form-field>
  </bch-drawer>

  <bch-drawer id="record-drawer" label="Record detail" side="end">
    <p class="muted" id="record-detail">Select a record.</p>
  </bch-drawer>
`;

/* ---- §4.1 command palette --------------------------------------------- */

function wireCommandPalette(overlays: ParentNode) {
  const omnibar = $<WithEntries>('#palette-omnibar', overlays);
  omnibar.entries = functionIndex;

  const dialog = $<Overlay>('#palette-dialog', overlays);
  const status = $('#palette-status');
  const leader = $<WithMode>('#palette-leader');
  let armed = false;

  const openPalette = () => void dialog.show();

  $('#palette-open')?.addEventListener('bchPress', openPalette);
  $('#palette-close')?.addEventListener('bchPress', () => void dialog.close());

  omnibar.addEventListener('bchRun', (event) => {
    const detail = (event as CustomEvent<FunctionEntry | { text: string }>).detail;
    const name = 'text' in detail ? `"${detail.text}"` : detail.nombre;
    setStatus(status, 'success', `Executed: ${name}`);
    void dialog.close();
  });

  const runFunction = (id: string) => {
    const entry = functionIndex.find((item) => item.id === id);
    if (entry) setStatus(status, 'success', `Executed: ${entry.nombre}`);
  };

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openPalette();
      return;
    }
    const target = event.target as HTMLElement | null;
    const typing =
      target?.tagName === 'INPUT' ||
      target?.tagName === 'TEXTAREA' ||
      target?.isContentEditable === true;
    if (typing || event.ctrlKey || event.metaKey || event.altKey) return;

    if (armed) {
      armed = false;
      leader.mode = 'normal';
      if (event.key === 'f') runFunction('panel-facturacion');
      return;
    }
    if (event.key === 'g') {
      armed = true;
      leader.mode = 'custom';
      setStatus(status, 'info', 'Leader armed: press f for billing.');
    }
  });
}

/* ---- §4.2 context menu ------------------------------------------------ */

function wireContextMenu() {
  const status = $('#context-status');
  $('#context-menu')?.addEventListener('bchSelect', (event) => {
    const value = (event as CustomEvent<string>).detail;
    setStatus(status, 'info', `Action: ${value}`);
  });
}

/* ---- §4.3 layout persistence ------------------------------------------ */

const LAYOUT_KEY = 'bench.showcase.layout.v1';
/** Spec §4.3: a column cannot shrink below 160px. */
const LAYOUT_MIN_PX = 160;
const LAYOUT_MAX_PX = 520;
const LAYOUT_DEFAULT_PX = 320;

function readStoredWidth(): number | null {
  try {
    const parsed = Number(localStorage.getItem(LAYOUT_KEY));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function wireLayoutPersistence() {
  const pane = $('#layout-pane-left');
  const splitter = $('#layout-splitter');
  const status = $('#layout-status');
  if (!pane || !splitter) return;

  const apply = (width: number, persist: boolean) => {
    const clamped = Math.min(Math.max(width, LAYOUT_MIN_PX), LAYOUT_MAX_PX);
    pane.style.flexBasis = `${clamped}px`;
    if (!persist) return;
    try {
      localStorage.setItem(LAYOUT_KEY, String(clamped));
    } catch {
      /* storage is optional: the layout still works for this session */
    }
  };

  const stored = readStoredWidth();
  if (stored) {
    apply(stored, false);
    setStatus(status, 'info', `Layout restored (${Math.round(stored)} px).`);
  } else {
    apply(LAYOUT_DEFAULT_PX, false);
    setStatus(status, 'info', 'Default layout.');
  }

  splitter.addEventListener('bchDrag', (event) => {
    const { deltaPx } = (event as CustomEvent<{ deltaPx: number }>).detail;
    const current = pane.getBoundingClientRect().width || LAYOUT_DEFAULT_PX;
    apply(current + deltaPx, true);
  });

  $('#layout-reset')?.addEventListener('bchPress', () => {
    apply(LAYOUT_DEFAULT_PX, false);
    try {
      localStorage.removeItem(LAYOUT_KEY);
    } catch {
      /* ignore */
    }
    setStatus(status, 'info', 'Layout reset to the default.');
  });
}

/* ---- §4.3 inspector ---------------------------------------------------- */

const INSPECTED: Record<string, { client: string; status: string; amount: string }> = {
  'inv-4381': { client: 'AC Constructores', status: 'In review', amount: '1,240.00 €' },
  'inv-4382': { client: 'Globex', status: 'Issued', amount: '860.00 €' },
  'nc-021': { client: 'Initech', status: 'Draft', amount: '310.00 €' },
};

function wireInspector(overlays: ParentNode) {
  const tree = $<WithItems>('#inspector-tree');
  const drawer = $<Overlay>('#inspector-drawer', overlays);
  const selection = $('#inspector-selection');

  tree.items = [
    {
      id: 'inv-4381',
      label: 'Invoice #4381',
      children: [
        { id: 'inv-4381-line-1', label: 'Consulting — 1.000,00 €' },
        { id: 'inv-4381-line-2', label: 'Licenses — 240,00 €' },
      ],
    },
    { id: 'inv-4382', label: 'Invoice #4382' },
    { id: 'nc-021', label: 'Credit note #021' },
  ];

  tree.addEventListener('bchSelect', (event) => {
    const id = (event as CustomEvent<string>).detail;
    const record = INSPECTED[id];
    if (!record) {
      if (selection) selection.textContent = `Selected: ${id}`;
      return;
    }
    $<WithValue>('#inspector-client', overlays).value = record.client;
    $<WithValue>('#inspector-status', overlays).value = record.status;
    $<WithValue>('#inspector-amount', overlays).value = record.amount;
    if (selection) selection.textContent = `Selected: ${record.client}`;
    void drawer.show();
  });

  $('#inspector-open')?.addEventListener('bchPress', () => void drawer.show());
}

/* ---- §4.3 workspaces --------------------------------------------------- */

function wireWorkspace() {
  const status = $('#workspace-status');
  const groups: Record<string, HTMLElement> = {
    finance: $('#workspace-finance') as HTMLElement,
    operations: $('#workspace-operations') as HTMLElement,
  };
  const names: Record<string, string> = { finance: 'Finance', operations: 'Operations' };

  $('#workspace-menu')?.addEventListener('bchSelect', (event) => {
    const key = (event as CustomEvent<string>).detail;
    Object.entries(groups).forEach(([name, group]) => {
      group.hidden = name !== key;
    });
    setStatus(status, 'info', `Workspace: ${names[key] ?? key}`);
  });
}

/* ---- §4.3 window placement --------------------------------------------- */

type ScreenDetails = {
  screens: { availLeft: number; availTop: number; availWidth: number; availHeight: number }[];
};

function wireWindowPlacement() {
  const status = $('#screens-status');
  const win = window as Window & { getScreenDetails?: () => Promise<ScreenDetails> };

  $('#screens-detect')?.addEventListener('bchPress', () => {
    if (typeof win.getScreenDetails !== 'function') {
      setStatus(
        status,
        'warning',
        'This browser does not expose the screens: the feature degrades to the current window.',
      );
      return;
    }
    void win
      .getScreenDetails()
      .then((details) => {
        const count = details.screens.length;
        setStatus(
          status,
          count > 1 ? 'success' : 'info',
          `${count} screen${count === 1 ? '' : 's'} detected.`,
        );
      })
      .catch(() => {
        setStatus(
          status,
          'warning',
          'Permission denied: the feature degrades to the current window.',
        );
      });
  });
}

/* ---- §4.3 record cards ------------------------------------------------- */

function wireRecordCards(overlays: ParentNode) {
  const grid = $('#record-grid');
  const drawer = $<Overlay>('#record-drawer', overlays);
  const detail = $('#record-detail');
  if (!grid) return;

  RECORD_CARDS.forEach((record) => {
    const card = document.createElement('bch-card') as HTMLElement & { interactive: boolean };
    card.className = 'record-card';
    card.interactive = true;
    card.innerHTML = `
      <span slot="header" class="card-heading">${record.title}</span>
      <bch-avatar slot="header" name="${record.client}" size="small"></bch-avatar>
      <p class="muted">${record.client} — ${record.amount}</p>
      <span slot="footer"><bch-status tone="${record.tone}">${record.status}</bch-status></span>
    `;
    card.addEventListener('bchPress', () => {
      if (detail) {
        detail.textContent = `${record.title} — ${record.client} — ${record.amount} (${record.status})`;
      }
      void drawer.show();
    });
    grid.appendChild(card);
  });
}

/* ---- §4.4 modes -------------------------------------------------------- */

function wireModes() {
  const badge = $<WithMode & WithLabel>('#mode-badge');
  const surface = $('#mode-surface');

  $('#mode-control')?.addEventListener('bchChange', (event) => {
    const mode = (event as CustomEvent<string>).detail;
    badge.mode = mode;
    badge.label = mode === 'edit' ? 'Edit' : 'Select';
    if (surface) surface.dataset.mode = mode;
  });
}

/* ---- §4.5 macros ------------------------------------------------------- */

function wireMacros() {
  const record = $('#macro-record');
  const recordLabel = $('#macro-record-label');
  const step = $<WithDisabled>('#macro-step');
  const replay = $<WithDisabled>('#macro-replay');
  const status = $('#macro-status');
  const list = $('#macro-steps');
  const steps: string[] = [];
  let recording = false;

  const render = () => {
    if (list) list.innerHTML = steps.map((item) => `<li>${item}</li>`).join('');
    if (replay) replay.disabled = steps.length === 0;
    if (recordLabel) recordLabel.textContent = recording ? 'Stop recording' : 'Record macro';
  };

  record?.addEventListener('bchPress', () => {
    recording = !recording;
    if (step) step.disabled = !recording;
    setStatus(
      status,
      recording ? 'warning' : 'info',
      recording ? 'Recording…' : `Macro with ${steps.length} step(s).`,
    );
    render();
  });

  step?.addEventListener('bchPress', () => {
    steps.push(`Step ${steps.length + 1}: open invoice`);
    setStatus(status, 'warning', `Recording… (${steps.length} step(s))`);
    render();
  });

  replay?.addEventListener('bchPress', () => {
    setStatus(status, 'success', `Replayed ${steps.length} step(s).`);
  });

  render();
}

/* ---- §4.5 apply -------------------------------------------------------- */

function wireApply() {
  const input = $<WithValue>('#apply-input');
  const status = $('#apply-status');
  // The components hydrate after the markup is parsed, so the initial value
  // lives in the attribute until the property is set: the snapshot (the base
  // the live edit is compared against) is read from there.
  let snapshot = input.getAttribute('value') ?? '';

  const refresh = () => {
    const dirty = input.value !== snapshot;
    setStatus(status, dirty ? 'warning' : 'success', dirty ? 'Unsaved changes.' : 'Applied.');
  };

  input?.addEventListener('bchInput', refresh);
  $('#apply-apply')?.addEventListener('bchPress', () => {
    snapshot = input.value;
    refresh();
  });
  $('#apply-discard')?.addEventListener('bchPress', () => {
    input.value = snapshot;
    refresh();
  });
}

/* ---- §4.5 undo --------------------------------------------------------- */

function wireUndo() {
  const list = $('#undo-list');
  const size = $('#undo-size');
  const label = $('#undo-label');
  const undo = $<WithDisabled>('#undo-button');
  const history: string[] = [];

  const render = () => {
    if (list) list.innerHTML = history.map((item) => `<li>${item}</li>`).join('');
    if (size) size.textContent = `${history.length} action${history.length === 1 ? '' : 's'}`;
    if (undo) undo.disabled = history.length === 0;
    const next = history[history.length - 1];
    if (label) label.textContent = next ? `Undo: ${next}` : 'Undo';
  };

  const push = (action: string) => {
    history.push(action);
    render();
  };

  $('#undo-rename')?.addEventListener('bchPress', () => push('Rename client'));
  $('#undo-line')?.addEventListener('bchPress', () => push('Add invoice line'));
  undo?.addEventListener('bchPress', () => {
    history.pop();
    render();
  });

  render();
}

/* ---- §4.5 templates ---------------------------------------------------- */

function wireTemplates() {
  const grid = $('#template-grid');
  const draft = $('#template-draft');
  if (!grid || !draft) return;

  const replace = (title: string, description: string, tone: string) => {
    const card = document.createElement('bch-card');
    card.className = 'template-card';
    card.innerHTML = `
      <span slot="header" class="card-heading">${title}</span>
      <p class="muted">${description}</p>
      <span slot="footer"><bch-status tone="${tone}">${tone === 'success' ? 'Confirmed' : 'Discarded'}</bch-status></span>
    `;
    grid.replaceChild(card, draft);
  };

  $('#template-confirm')?.addEventListener('bchPress', () => {
    replace(
      'Invoice template',
      'Confirmed: the draft became a saved template and left the provisional area.',
      'success',
    );
  });
  $('#template-discard')?.addEventListener('bchPress', () => {
    replace('Invoice template', 'The draft was discarded; nothing was saved.', 'neutral');
  });
}

/* ---- §4.6 persistence -------------------------------------------------- */

function wirePersistence() {
  const note = $<WithValue>('#persistence-note');
  const status = $('#persistence-status');

  let worker: Worker | undefined;
  try {
    worker = new Worker(new URL('./persistence-worker.ts', import.meta.url), { type: 'module' });
  } catch {
    setStatus(status, 'warning', 'This browser cannot start a Web Worker: nothing is persisted.');
    return;
  }

  worker.addEventListener('message', (event) => {
    const data = event.data as { type: string; value?: string | null; message?: string };
    if (data.type === 'saved') {
      setStatus(status, 'success', 'Note saved.');
    } else if (data.type === 'loaded') {
      if (data.value) {
        note.value = data.value;
        setStatus(status, 'info', 'Note recovered.');
      } else {
        setStatus(status, 'info', 'There is no stored note yet.');
      }
    } else if (data.type === 'error') {
      setStatus(status, 'danger', `Storage error: ${data.message ?? 'unknown'}`);
    }
  });

  worker.addEventListener('error', () => {
    setStatus(status, 'danger', 'The storage worker failed to start.');
  });

  $('#persistence-save')?.addEventListener('bchPress', () => {
    const value = note.value.trim();
    if (!value) {
      setStatus(status, 'warning', 'Write something before saving.');
      return;
    }
    setStatus(status, 'info', 'Saving…');
    worker?.postMessage({ type: 'save', key: 'note', value });
  });

  $('#persistence-load')?.addEventListener('bchPress', () => {
    setStatus(status, 'info', 'Recovering…');
    worker?.postMessage({ type: 'load', key: 'note' });
  });
}

/* ---- §4.6 secure fields ------------------------------------------------ */

function wireSecureFields() {
  const password = $('#secure-password');
  const caps = $('#caps-status');

  const checkCaps = (event: KeyboardEvent) => {
    const on = event.getModifierState('CapsLock');
    setStatus(caps, on ? 'warning' : 'neutral', on ? 'Caps Lock is on' : 'Caps Lock is off');
  };

  password?.addEventListener('keydown', checkCaps);
  password?.addEventListener('keyup', checkCaps);

  const org = $<WithValue>('#secure-org');
  const context = $('#org-context');
  org?.addEventListener('bchChange', (event) => {
    const value = (event as CustomEvent<string>).detail;
    const label = org.querySelector(`option[value="${value}"]`)?.textContent ?? value;
    if (context) context.textContent = `Context: ${label}`;
  });
}

/* ---- mount ------------------------------------------------------------- */

/**
 * Renders the tier (c) pattern demos inside the showcase.
 *
 * `demos` receives the visible blocks; `overlays` receives the dialogs and
 * drawers, which live outside the views so they can be opened from anywhere.
 */
export function mountPatterns(demos: HTMLElement, overlays: HTMLElement): void {
  demos.innerHTML = DEMO_HTML;
  overlays.innerHTML = OVERLAYS;

  wireCommandPalette(overlays);
  wireContextMenu();
  wireLayoutPersistence();
  wireInspector(overlays);
  wireWorkspace();
  wireWindowPlacement();
  wireRecordCards(overlays);
  wireModes();
  wireMacros();
  wireApply();
  wireUndo();
  wireTemplates();
  wirePersistence();
  wireSecureFields();
}
