import { Cache } from './Cache';
import { Node } from './LRUCache.types';

export class LRUCache<T> extends Cache<T> {
  private capacity: number;
  private head: Node | null;
  private tail: Node | null;
  private map: Map<string, Node>;

  constructor(capacity: number = 500) {
    super();
    this.capacity = capacity;
    this.head = null;
    this.tail = null;
    this.map = new Map<string, Node>();
  }

  private addNode(node: Node) {
    node.prev = null;
    node.next = this.head;

    if (this.head !== null) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }

    this.head = node;
  }

  private removeNode(node: Node) {
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }

  get(key: string) {
    if (!this.map.has(key)) {
      return null;
    }

    const node = this.map.get(key)!;
    this.removeNode(node);
    this.addNode(node);

    return node.value;
  }

  put(key: string, value: any) {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.value = value;
      this.removeNode(node);
      this.addNode(node);
    } else {
      const node: Node = {
        key,
        value,
        prev: null,
        next: null,
      };

      if (this.map.size >= this.capacity) {
        this.map.delete(this.tail!.key);
        this.removeNode(this.tail!);
      }

      this.addNode(node);
      this.map.set(key, node);
    }
  }
}
