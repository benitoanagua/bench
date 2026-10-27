import { stencilContent } from './story-helpers';

export default { title: 'BENCH/Components/Surface' };
export const CardAndBadge = {
  render: () =>
    stencilContent(
      `<bch-card><span slot="header">Account</span><p>Reusable content surface.</p><span slot="footer"><bch-badge tone="success">Active</bch-badge></span></bch-card>`,
    ),
};
