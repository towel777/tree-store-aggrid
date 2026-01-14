import type { TreeItem, Id } from "./types";

export class TreeStore<T extends TreeItem> {
  private itemsMap = new Map<Id, T>();
  private childrenMap = new Map<Id | null, Set<Id>>();
  private sourceItems: T[];

  constructor(items: T[]) {
    this.sourceItems = items;

    for (const item of items) {
      this.itemsMap.set(item.id, item);

      if (!this.childrenMap.has(item.parent)) {
        this.childrenMap.set(item.parent, new Set());
      }

      this.childrenMap.get(item.parent)!.add(item.id);
    }
  }

  getAll(): T[] {
    return this.sourceItems;
  }

  getItem(id: Id): T | undefined {
    return this.itemsMap.get(id);
  }

  getChildren(id: Id): T[] {
    const childrenIds = this.childrenMap.get(id);
    if (!childrenIds) return [];

    return Array.from(childrenIds)
      .map(childId => this.itemsMap.get(childId)!)
      .filter(Boolean);
  }

  getAllChildren(id: Id): T[] {
    const result: T[] = [];

    const children = this.childrenMap.get(id);
    if (!children) return result;

    const stack = [...children];

    while (stack.length) {
      const currentId = stack.pop()!;
      const item = this.itemsMap.get(currentId);
      if (!item) continue;

      result.push(item);

      const children = this.childrenMap.get(currentId);
      if (children) {
        stack.push(...children);
      }
    }

    return result;
  }

  getAllParents(id: Id): T[] {
    const result: T[] = [];
    let current = this.itemsMap.get(id);

    while (current) {
      result.push(current);
      if (current.parent === null) break;
      current = this.itemsMap.get(current.parent);
    }

    return result;
  }

  addItem(item: T): void {
    if (this.itemsMap.has(item.id)) {
      throw new Error(`Item with id ${item.id} already exists`);
    }

    this.itemsMap.set(item.id, item);
    this.sourceItems.push(item);

    if (!this.childrenMap.has(item.parent)) {
      this.childrenMap.set(item.parent, new Set());
    }

    this.childrenMap.get(item.parent)!.add(item.id);
  }

  updateItem(updated: T): void {
    const existing = this.itemsMap.get(updated.id);
    if (!existing) return;

    if (existing.parent !== updated.parent) {
      this.childrenMap.get(existing.parent)?.delete(updated.id);

      if (!this.childrenMap.has(updated.parent)) {
        this.childrenMap.set(updated.parent, new Set());
      }
      this.childrenMap.get(updated.parent)?.add(updated.id);
    }

    Object.assign(existing, updated);
  }

  removeItem(id: Id): void {
    const toRemove = [id, ...this.getAllChildren(id).map(i => i.id)];

    for (const removeId of toRemove) {
      const item = this.itemsMap.get(removeId);
      if (!item) continue;

      this.childrenMap.get(item.parent)?.delete(removeId);
      this.childrenMap.delete(removeId);
      this.itemsMap.delete(removeId);
    }

    this.sourceItems = this.sourceItems.filter(
      item => !toRemove.includes(item.id)
    );
  }
}
