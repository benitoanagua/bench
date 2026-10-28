import { Component, Element, Event, type EventEmitter, Prop, h, Fragment } from '@stencil/core';
import { getDirectChildrenForBench } from '../util/direct-children';

/**
 * One node of a `bch-tree` (§4.7). The focusable row carries
 * `role="treeitem"` (+ `aria-expanded` for branches); nested items must be
 * marked `slot="children"` and render inside the `role="group"` container.
 *
 *   <bch-tree-item value="a" label="A" expanded>
 *     <bch-tree-item slot="children" value="a1" label="A1" />
 *   </bch-tree-item>
 *
 * Expansion is attribute-driven: the parent tree toggles `expanded` on the
 * host (reflected `@Prop` → observed attribute) so the two components stay
 * coordinated through DOM state. Roving tabindex is owned by the tree, so
 * the row starts with `tabindex="-1"`.
 */
@Component({ tag: 'bch-tree-item', styleUrl: 'tree.css', shadow: false, scoped: true })
export class BchTreeItem {
  @Element() host!: HTMLElement;
  @Prop({ reflect: true }) value = '';
  @Prop({ reflect: true }) label = '';
  /** Controlled by the parent `bch-tree` via the reflected attribute. */
  @Prop({ reflect: true }) expanded = false;
  @Event() bchSelect!: EventEmitter<string>;

  /** Focusable row element — read by the tree through the DOM scan (`rowOf`). */
  private row?: HTMLSpanElement;

  /** Whether this node has nested `bch-tree-item` children. */
  get hasChildren(): boolean {
    return getDirectChildrenForBench(this.host, 'bch-tree-item').length > 0;
  }

  private onRowClick = () => {
    this.bchSelect.emit(this.value);
  };

  render() {
    const hasChildren = this.hasChildren;
    const isExpanded = hasChildren && this.expanded;
    return (
      <>
        <span
          class={{ 'bch-tree-item__row': true, 'is-branch': hasChildren }}
          role="treeitem"
          aria-expanded={hasChildren ? String(isExpanded) : undefined}
          tabindex={-1}
          onClick={this.onRowClick}
          ref={(el?: HTMLSpanElement) => (this.row = el)}
        >
          <span
            class={{ 'bch-tree-item__toggle': true, 'is-open': isExpanded }}
            aria-hidden="true"
          />
          <span class="bch-tree-item__label">{this.label ? this.label : <slot />}</span>
        </span>
        <div
          class="bch-tree-item__children"
          role={hasChildren ? 'group' : undefined}
          hidden={!isExpanded}
        >
          <slot />
        </div>
      </>
    );
  }
}
