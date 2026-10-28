/** Tree node data for the `items` prop (§4.7). Slotted `bch-tree-item` children are the alternative API. */
export type BchTreeNode = {
  id: string;
  label: string;
  children?: BchTreeNode[];
};
