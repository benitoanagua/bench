import { Component, Element, Event, type EventEmitter, Prop, State, h } from '@stencil/core';
import { getDirectChildrenForBench } from '../util/direct-children';
import type { BchTreeNode } from './tree-nodes';

type FlatRow = {
  item: HTMLElement;
  value: string;
  row: HTMLElement;
  parent: HTMLElement | null;
  index: number;
  depth: number;
};

function itemsOf(host: HTMLElement): HTMLElement[] {
  return getDirectChildrenForBench(host, 'bch-tree-item');
}

function rowOf(item: HTMLElement): HTMLElement | undefined {
  return Array.from(item.childNodes ?? []).find(
    (node): node is HTMLElement =>
      (node as HTMLElement).nodeType === 1 &&
      (node as HTMLElement).className?.includes?.('bch-tree-item__row'),
  );
}

function isExpanded(item: HTMLElement): boolean {
  return item.getAttribute('expanded') === 'true';
}

/**
 * Tree of navigation following the standard treeview pattern (spec §4.7,
 * herencia IRIX/SGI): roving tabindex, keyboard navigation over *visible*
 * nodes only, one composite of the same function index that feeds the
 * omnibar (4.1).
 *
 * Expansion is attribute-driven (`expanded="true|false"` on the item host,
 * which is also the reflected prop of `bch-tree-item`) so the tree and the
 * items stay coordinated through DOM state rather than instance access.
 *
 *   <bch-tree
 *     items={[
 *       { id: 'billing', label: 'Billing', children: [{ id: 'nf', label: 'New invoice' }] },
 *     ]}
 *   />
 *   <bch-tree>
 *     <bch-tree-item value="a" label="A">
 *       <bch-tree-item slot="children" value="a1" label="A1" />
 *     </bch-tree-item>
 *   </bch-tree>
 */
@Component({ tag: 'bch-tree', styleUrl: 'tree.css', shadow: false, scoped: true })
export class BchTree {
  @Element() host!: HTMLElement;
  /** Optional data-driven API; slotted `bch-tree-item` children win when both are present. */
  @Prop() items?: BchTreeNode[];
  @Event() bchSelect!: EventEmitter<string>;

  @State() private focused = 0;
  private root?: HTMLElement;

  componentDidLoad() {
    this.root?.addEventListener('bchSelect', this.onItemSelectBubbled as EventListener);
    this.syncRoving();
  }
  componentDidUpdate() {
    // Re-runs after every tree re-render (recreated nested items need fresh
    // roving tabindex + indentation).
    this.syncRoving();
  }
  disconnectedCallback() {
    this.root?.removeEventListener('bchSelect', this.onItemSelectBubbled as EventListener);
  }

  /* ---- flattening ---------------------------------------------------- */

  /** Visible rows only: collapsed subtrees never participate in roving focus (§4.7). */
  private flatten(): FlatRow[] {
    const rows: FlatRow[] = [];
    const visit = (items: HTMLElement[], depth: number, parent: HTMLElement | null) => {
      for (const item of items) {
        const row = rowOf(item);
        if (!row) continue;
        rows.push({
          item,
          value: item.getAttribute('value') || '',
          row,
          parent,
          index: rows.length,
          depth,
        });
        if (isExpanded(item)) visit(itemsOf(item), depth + 1, item);
      }
    };
    // Data-driven items render inside the tree body; slotted items remain
    // physical children of the host in real browsers (light DOM), while
    // mock-doc projects them into the body's slot. Scan both.
    const body = this.root?.querySelector('.bch-tree__body') ?? this.host;
    for (const container of [body, this.host] as HTMLElement[]) {
      const roots = itemsOf(container);
      if (roots.length > 0) {
        visit(roots, 0, null);
        break;
      }
    }
    return rows;
  }

  private syncRoving() {
    const rows = this.flatten();
    const clamped = Math.min(this.focused, Math.max(rows.length - 1, 0));
    this.focused = clamped;
    rows.forEach((r, i) => {
      r.row.tabIndex = i === clamped ? 0 : -1;
      // Indentation scaled by depth, in density tokens (Regla 6), never fixed px.
      r.row.style.setProperty(
        'padding-inline-start',
        `calc(var(--bch-density-cell-px) * ${r.depth})`,
      );
    });
  }

  private focusRow(rows: FlatRow[], index: number) {
    const clamped = Math.max(0, Math.min(rows.length - 1, index));
    this.focused = clamped;
    rows[clamped]?.row.focus();
    this.syncRoving();
  }

  /* ---- keyboard (§4.7) ------------------------------------------------ */

  private onKeyDown = (event: KeyboardEvent) => {
    const rows = this.flatten();
    if (rows.length === 0) return;
    const activeIndex = rows.findIndex((r) => r.row === (document.activeElement as HTMLElement));
    const current = activeIndex >= 0 ? activeIndex : this.focused;
    const selected = rows[current];
    if (!selected) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusRow(rows, current + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusRow(rows, current - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.expandRight(rows, selected);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.collapseLeft(rows, selected);
        break;
      case 'Enter':
        event.preventDefault();
        this.bchSelect.emit(selected.value);
        break;
      case ' ':
        event.preventDefault();
        this.bchSelect.emit(selected.value);
        break;
    }
  };

  /** `→` expands, or enters the first child when already expanded. */
  private expandRight(rows: FlatRow[], current: FlatRow) {
    if (itemsOf(current.item).length === 0) return;
    if (!isExpanded(current.item)) {
      current.item.setAttribute('expanded', 'true');
      this.syncRoving();
      return;
    }
    const child = rows.find((r) => r.parent === current.item && r.index > current.index);
    if (child) this.focusRow(rows, child.index);
  }

  /** `←` collapses, or climbs to the parent node's exact row. */
  private collapseLeft(rows: FlatRow[], current: FlatRow) {
    if (itemsOf(current.item).length > 0 && isExpanded(current.item)) {
      current.item.setAttribute('expanded', 'false');
      this.focusRow(rows, current.index);
      return;
    }
    if (current.parent) {
      const parentIndex = rows.findIndex((r) => r.item === current.parent);
      if (parentIndex >= 0) this.focusRow(rows, parentIndex);
    }
  }

  /* ---- selection ------------------------------------------------------- */

  private onItemSelectBubbled = (event: CustomEvent<string>) => {
    this.bchSelect.emit(event.detail);
  };

  /* ---- rendering -------------------------------------------------------- */

  private renderNode(node: BchTreeNode, slot?: string) {
    const props = { slot, value: node.id, label: node.label };
    if (node.children && node.children.length > 0) {
      return (
        <bch-tree-item key={node.id} {...props}>
          {node.children.map((child) => this.renderNode(child, 'children'))}
        </bch-tree-item>
      );
    }
    return <bch-tree-item key={node.id} {...props} />;
  }

  render() {
    const dataDriven = this.items && this.items.length > 0;
    return (
      <nav
        class="bch-tree"
        onKeyDown={(e: KeyboardEvent) => this.onKeyDown(e)}
        ref={(el) => (this.root = el)}
      >
        <div class="bch-tree__body" role="tree" aria-label="Tree">
          {dataDriven ? (
            this.items!.map((node) => this.renderNode(node))
          ) : (
            <slot onSlotchange={() => this.syncRoving()} />
          )}
        </div>
      </nav>
    );
  }
}
