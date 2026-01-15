import { TreeStore } from '../src/entities/treeStore';
import { baseItems } from './fixtures';
import type { TreeItem } from '../src/entities/treeStore/types';

describe('TreeStore basic functionality', () => {
  let store: TreeStore<TreeItem>;

  beforeEach(() => {
    store = new TreeStore([...baseItems]);
  });

  test('getAll returns original array', () => {
    const all = store.getAll();
    expect(all.length).toBe(baseItems.length);
    expect(all[0]).toEqual(baseItems[0]);
  });

  test('getItem returns item by id', () => {
    const item = store.getItem('a');
    expect(item).toBeDefined();
    expect(item?.label).toBe('Item 2');
  });

  test('getChildren returns direct children', () => {
    const children = store.getChildren(1);
    expect(children.map(i => i.id)).toEqual(['a', 3]);
  });

  test('getChildren returns empty array if no children', () => {
    expect(store.getChildren(6)).toEqual([]);
  });

  test('getAllChildren returns all descendants', () => {
    const children = store.getAllChildren('a');
    const ids = children.map(i => i.id).sort();
    expect(ids).toEqual([4, 5, 6].sort());
  });

  test('getAllParents returns correct path', () => {
    const parents = store.getAllParents(6);
    const ids = parents.map(i => i.id);
    expect(ids).toEqual([6, 4, 'a', 1]);
  });
});