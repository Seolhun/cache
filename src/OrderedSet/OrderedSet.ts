export class OrderedSet<Item> {
  private set: Set<Item>;
  private items: Item[];

  constructor() {
    this.set = new Set<Item>();
    this.items = [];
  }

  get size(): number {
    return this.set.size;
  }

  add(value: Item): this {
    if (!this.set.has(value)) {
      this.set.add(value);
      this.items.push(value);
    }
    return this;
  }

  delete(value: Item): boolean {
    const deleted = this.set.delete(value);
    if (deleted) {
      const index = this.items.indexOf(value);
      this.items.splice(index, 1);
    }
    return deleted;
  }

  has(value: Item): boolean {
    return this.set.has(value);
  }

  clear(): void {
    this.set.clear();
    this.items = [];
  }

  values(): IterableIterator<Item> {
    return this.set.values();
  }

  entries(): IterableIterator<[Item, Item]> {
    return this.set.entries();
  }

  [Symbol.iterator](): IterableIterator<Item> {
    return this.values();
  }

  forEach(callback: (value: Item, value2: Item, set: Set<Item>) => void, thisArg?: any): void {
    this.set.forEach((value, _, set) => {
      callback.call(thisArg, value, value, set);
    });
  }

  toArray(): Item[] {
    return [...this.items];
  }
}
