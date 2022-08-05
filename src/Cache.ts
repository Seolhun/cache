import {
  CacheInterface,
  CacheConstructorInterface,
  serializeKeys,
  comparator,
} from './Cache.types';
import Observable, { ObservableListener } from './Observable';

class Cache<Value> implements CacheInterface<Value> {
  private _observable: Observable;
  private _cache: Map<string, Value>;
  private _comparator: comparator<Value>;

  constructor(props: CacheConstructorInterface<Value> = {}) {
    this._observable = new Observable(props.listeners);
    this._cache = new Map(Object.entries<Value>(props.initialData || {}));
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
    this._cache.delete(serializedKey as string);
    this._observable.notify();
    return this;
  }

  set(key: string, value: Value): this {
    const [serializedKey] = this.serializeKey(key);
    const prevValue = this._cache.get(serializedKey as string);
    const nextValue = value;
    if (this._comparator(key, prevValue, nextValue)) {
      this._cache.set(serializedKey as string, value);
      this._observable.notify();
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
    return Array.from(this._cache.keys()) as string[];
  }

  has(key: string) {
    const [serializedKey] = this.serializeKey(key);
    return this._cache.has(serializedKey as string);
  }
}

export { Cache };
export default Cache;
