export type Id = number | string;

export interface TreeItem {
  id: Id;
  parent: Id | null;
  label: string
}