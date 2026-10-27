import { newSpecPage } from '@stencil/core/testing';
import { BchMetricCard } from './metric-card';
import { BchStatus } from './status';
import { BchAlert } from './alert';
import { BchEmptyState } from './empty-state';
import { BchDataTable } from './data-table';
import { BchToolbar } from './toolbar';

describe('showcase components', () => {
  it('renders the compositional set', async () => {
    const page = await newSpecPage({
      components: [BchMetricCard, BchStatus, BchAlert, BchEmptyState, BchDataTable, BchToolbar],
      html: '<bch-metric-card label=Users value=42></bch-metric-card>',
    });
    expect(page.root).toBeTruthy();
  });
});
