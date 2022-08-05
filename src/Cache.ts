import {
  CacheInterface,
  CacheConstructorInterface,
  serializeKeys,
  comparator,
} from './Cache.types';
import Observable, { ObservableListener } from './Observable';

class Cache<T> implements CacheInterface {
  private _observable: Observable;
  private _cache: Map<string, any>;
  private _comparator: comparator;

  constructor(props: CacheConstructorInterface<T> = {}) {
    this._observable = new Observable(props.listeners);
    this._cache = new Map(Object.entries<T>(props.initialData || {}));
    this._comparator = props.comparator ? props.comparator : () => true;
  }

  subscribe(listener: ObservableListener) {
    return this._observable.subscribe(listener);
  }

  serializeKey(key: string): serializeKeys {
    const serializedKey = key;
    const errorKey = serializedKey ? 'error@' + serializedKey : '';
    return [serializedKey, errorKey];
  }

  clear() {
    this._cache.clear();
    this._observable.notify();
    return this;
  }

  delete(key: string) {
    const [serializedKey] = this.serializeKey(key);
    this._cache.delete(serializedKey);
    this._observable.notify();
    return this;
  }

  set(key: string, value: any): this {
    const [serializedKey] = this.serializeKey(key);
    const prevValue = this._cache.get(serializedKey);
    const nextValue = value;
    if (this._comparator(key, prevValue, nextValue)) {
      this._cache.set(serializedKey, value);
      this._observable.notify();
    }
    return this;
  }

  get(key: string) {
    const [serializedKey] = this.serializeKey(key);
    const hitData = this._cache.get(serializedKey);
    if (!hitData) {
      return null;
    }
    return hitData;
  }

  keys() {
    return Array.from(this._cache.keys());
  }

  has(key: string) {
    const [serializedKey] = this.serializeKey(key);
    return this._cache.has(serializedKey);
  }
}

export { Cache };
export default Cache;
