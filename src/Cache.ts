import {
  CacheInterface,
  CacheConstructorInterface,
  cacheListener,
  serializeKeys,
  comparator,
} from './types';

class Cache<Value> implements CacheInterface<Value> {
  private _cache: Map<string, Value>;
  private _listeners: cacheListener[];
  private _comparator: comparator<Value>;

  constructor(props: CacheConstructorInterface<Value> = {}) {
    this._cache = new Map(Object.entries<Value>(props.initialData || {}));
    this._listeners = props.listeners ? props.listeners : [];
    this._comparator = props.comparator ? props.comparator : () => true;
  }

  private async notify() {
    await Promise.all(this._listeners.map(async (listener) => await listener()));
  }

  serializeKey(key: string): serializeKeys {
    const serializedKey = key;
    const errorKey = serializedKey ? 'error@' + serializedKey : '';
    return [serializedKey, errorKey];
  }

  subscribe(listener: cacheListener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    let isSubscribed = true;
    this._listeners.push(listener);

    return () => {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      const index = this._listeners.indexOf(listener);
      if (index > -1) {
        this._listeners[index] = this._listeners[this._listeners.length - 1];
        this._listeners.length--;
      }
    };
  }

  clear() {
    this._cache.clear();
    this.notify();
    return this;
  }

  delete(key: string) {
    const [serializedKey] = this.serializeKey(key);
    this._cache.delete(serializedKey as string);
    this.notify();
    return this;
  }

  set(key: string, value: Value): this {
    const [serializedKey] = this.serializeKey(key);
    const prevValue = this._cache.get(serializedKey as string);
    const nextValue = value;
    if (this._comparator(key, prevValue, nextValue)) {
      this._cache.set(serializedKey as string, value);
      this.notify();
    }
    return this;
  }

  get(key: string) {
    const [serializedKey] = this.serializeKey(key);
    const hitData = this._cache.get(serializedKey as string);
    if (!hitData) {
      return null;
    }
    return hitData;
  }

  keys() {
    return Array.from(this._cache.keys()) as (string)[];
  }

  has(key: string) {
    const [serializedKey] = this.serializeKey(key);
    return this._cache.has(serializedKey as string);
  }
}

export { Cache };
export default Cache;
