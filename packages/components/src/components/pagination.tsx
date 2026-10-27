import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

type PageToken = number | 'ellipsis';

@Component({ tag: 'bch-pagination', styleUrl: 'pagination.css', shadow: false, scoped: true })
export class BchPagination {
  @Prop() page = 1;
  @Prop() pageCount = 1;
  @Prop() siblingCount = 1;
  @Prop() label = 'Pagination';
  @Event() bchChange!: EventEmitter<number>;

  private goTo(page: number) {
    const clamped = Math.min(Math.max(1, page), this.pageCount);
    if (clamped !== this.page) this.bchChange.emit(clamped);
  }

  /** Builds a windowed page list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 20 */
  private buildPages(): PageToken[] {
    const total = this.pageCount;
    const current = this.page;
    const sibling = this.siblingCount;
    const totalVisible = sibling * 2 + 5; // first + last + current + 2 ellipses + siblings
    if (total <= totalVisible) return Array.from({ length: total }, (_, i) => i + 1);

    const left = Math.max(current - sibling, 2);
    const right = Math.min(current + sibling, total - 1);
    const pages: PageToken[] = [1];
    if (left > 2) pages.push('ellipsis');
    for (let p = left; p <= right; p++) pages.push(p);
    if (right < total - 1) pages.push('ellipsis');
    pages.push(total);
    return pages;
  }

  render() {
    const pages = this.buildPages();
    return (
      <nav class="bch-pagination" aria-label={this.label}>
        <bch-icon-button
          name="chevron-left"
          label="Previous page"
          size="small"
          disabled={this.page <= 1}
          onBchPress={() => this.goTo(this.page - 1)}
        />
        <ul class="bch-pagination__list">
          {pages.map((token, index) =>
            token === 'ellipsis' ? (
              <li key={`e-${index}`} class="bch-pagination__ellipsis" aria-hidden="true">
                …
              </li>
            ) : (
              <li key={token}>
                <button
                  type="button"
                  class={{ 'bch-pagination__page': true, 'is-current': token === this.page }}
                  aria-current={token === this.page ? 'page' : undefined}
                  aria-label={`Page ${token}`}
                  onClick={() => this.goTo(token)}
                >
                  {token}
                </button>
              </li>
            ),
          )}
        </ul>
        <bch-icon-button
          name="chevron-right"
          label="Next page"
          size="small"
          disabled={this.page >= this.pageCount}
          onBchPress={() => this.goTo(this.page + 1)}
        />
      </nav>
    );
  }
}
