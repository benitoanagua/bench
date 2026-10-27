import { stencilContent } from './story-helpers';

export default { title: 'BENCH/Components/Overlays' };

export const DialogAndDrawer = {
  render: () =>
    stencilContent(`
      <div style="display:flex;gap:12px;align-items:center">
        <bch-button onclick="document.querySelector('bch-dialog').show()">Open dialog</bch-button>
        <bch-button variant="secondary" onclick="document.querySelector('bch-drawer').show()">Open drawer</bch-button>
        <bch-tooltip text="Helpful context"><bch-icon name="info-circle" aria-label="Information"></bch-icon></bch-tooltip>
        <bch-dialog label="Confirm action"><p>This dialog uses the native dialog element and restores focus on close.</p><span slot="footer"><bch-button variant="secondary" onclick="document.querySelector('bch-dialog').close()">Cancel</bch-button><bch-button onclick="document.querySelector('bch-dialog').close()">Confirm</bch-button></span></bch-dialog>
        <bch-drawer label="Navigation"><bch-nav><bch-nav-item active href="#home">Home</bch-nav-item><bch-nav-item href="#settings">Settings</bch-nav-item></bch-nav></bch-drawer>
      </div>`),
};
