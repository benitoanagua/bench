import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchDialog } from '@bench/components';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'BENCH/Patterns/Sessions',
  component: BchDialog,
} satisfies Meta<BchDialog>;

export default meta;

/**
 * Session expiry warning (spec §4.9; ADR-009: `bch-dialog` composition — the
 * session timers/logic is app-level tier (c), nothing but the UI structure
 * lives here).
 *
 * Pattern checklist:
 * - A real blocking modal (§4.7): focus is trapped by the native dialog
 *   while open and returns to the element that opened it on close — unlike
 *   a toast, this decision must not be ignorable by accident.
 * - Two equally visible exits: "Extend session" is the primary default but
 *   "Sign out now" is always present and legible — never a single "OK".
 * - The app surfaces the warning with generous time before the real expiry,
 *   never at the last second; if the session finally closes it must confirm
 *   explicitly that the work was saved (§4.9 / §4.6).
 * - Body and footer are composed purely with slotted content (here:
 *   `bch-button`s in the footer slot).
 */
export const SessionExpiry = {
  render: () =>
    stencilContent(`
      <bch-button onclick="document.querySelector('#session-expiry-dialog').show()">Show expiry warning</bch-button>
      <bch-dialog id="session-expiry-dialog" label="Your session is about to expire" tone="critical">
        <p>Your session will end in 2 minutes. Extend it to keep working, or sign out now. Your work is saved continuously (§4.6), so nothing is lost either way.</p>
        <span slot="footer">
          <bch-button variant="primary" onclick="document.querySelector('#session-expiry-dialog').close()">Extend session</bch-button>
          <bch-button variant="secondary" onclick="document.querySelector('#session-expiry-dialog').close()">Sign out now</bch-button>
        </span>
      </bch-dialog>`),
};
