import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'bch-breadcrumb-item', styleUrl: 'breadcrumbs.css', shadow: false, scoped: true })
export class BchBreadcrumbItem {
  @Prop() href = '';
  /** Set automatically by the parent <bch-breadcrumbs> on the last item. */
  @Prop({ reflect: true, mutable: true }) current = false;

  render() {
    return (
      <li class="bch-breadcrumbs__item">
        {this.current || !this.href ? (
          <span aria-current={this.current ? 'page' : undefined}><slot /></span>
        ) : (
          <a href={this.href}><slot /></a>
        )}
        {!this.current ? <bch-icon name="chevron-right" class="bch-breadcrumbs__sep" aria-hidden="true" /> : null}
      </li>
    );
  }
}
