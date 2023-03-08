export class OrderedSet<T> {
  private set: Set<T>;
  private arr: T[];

  constructor() {
    this.set = new Set<T>();
    this.arr = [];
  }

  add(value: T): this {
    if (!this.set.has(value)) {
      this.set.add(value);
      this.arr.push(value);
    }
    return this;
  }

  delete(value: T): boolean {
    const deleted = this.set.delete(value);
    if (deleted) {
      const index = this.arr.indexOf(value);
      this.arr.splice(index, 1);
    }
    return deleted;
  }

  has(value: T): boolean {
    return this.set.has(value);
  }

  clear(): void {
    this.set.clear();
    this.arr = [];
  }

  get size(): number {
    return this.set.size;
  }

  values(): IterableIterator<T> {
    return this.set.values();
  }

  entries(): IterableIterator<[T, T]> {
    return this.set.entries();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  forEach(callback: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    this.set.forEach((value, _, set) => {
      callback.call(thisArg, value, value, set);
    });
  }

  toArray(): T[] {
    return [...this.arr];
  }
}
