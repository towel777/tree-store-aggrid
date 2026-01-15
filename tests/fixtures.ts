import type { TreeItem } from '../src/entities/treeStore/types';

export const baseItems: TreeItem[] = [
  { id: 1, parent: null, label: 'Item 1' },
  { id: 'a', parent: 1, label: 'Item 2' },
  { id: 3, parent: 1, label: 'Item 3' },
  { id: 4, parent: 'a', label: 'Item 4' },
  { id: 5, parent: 'a', label: 'Item 5' },
  { id: 6, parent: 4, label: 'Item 6' }
];