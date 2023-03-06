export interface Node {
  key: string;
  value: any;
  prev: Node | null;
  next: Node | null;
}
