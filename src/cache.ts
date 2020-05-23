import { CacheInterface, cacheListener, serializeKeys } from './types';

export default class Cache<T> implements CacheInterface<T> {
  private __cache: Map<string, T[keyof T]>;
  private __listeners: cacheListener[];

  constructor(initialData?: T) {
    this.__cache = new Map(Object.entries<T[keyof T]>(initialData || {}));
    this.__listeners = [];
  }

  private async notify() {
    await Promise.all(this.__listeners.map(async (listener) => await listener()));
  }

  get(key: keyof T) {
    const [serializedKey] = this.serializeKey(key);
    const hitData = this.__cache.get(serializedKey as string);
    if (!hitData) {
      return null;
    }
    return hitData;
  }

  set(key: keyof T, value: T[keyof T]): any {
    const [serializedKey] = this.serializeKey(key);
    this.__cache.set(serializedKey as string, value);
    this.notify();
  }

  keys() {
    return Array.from(this.__cache.keys()) as (keyof T)[];
  }

  has(key: keyof T) {
    const [serializedKey] = this.serializeKey(key);
    return this.__cache.has(serializedKey as string);
  }

  clear() {
    this.__cache.clear();
    this.notify();
  }

  delete(key: keyof T) {
    const [serializedKey] = this.serializeKey(key);
    this.__cache.delete(serializedKey as string);
    this.notify();
  }

  serializeKey(key: keyof T): serializeKeys<T> {
    const errorKey = key ? 'err@' + key : '';
    return [key, errorKey];
  }

  subscribe(listener: cacheListener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    let isSubscribed = true;
    this.__listeners.push(listener);

    return () => {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      const index = this.__listeners.indexOf(listener);
      if (index > -1) {
        this.__listeners[index] = this.__listeners[this.__listeners.length - 1];
        this.__listeners.length--;
      }
    };
  }
}
