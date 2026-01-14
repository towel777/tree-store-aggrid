export type Id = number;

export interface TreeItem {
  id: Id;
  parent: Id | null;
  label: string
}