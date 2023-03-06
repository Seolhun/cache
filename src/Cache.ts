import {
  CacheInterface,
  CacheConstructorInterface,
  SerializeKeys,
  Comparator,
} from './Cache.types';
import { EventEmitter, EventEmitterListener } from './EventEmitter';

class Cache<T> implements CacheInterface {
  private _emitter: EventEmitter<any>;
  private _cache: Map<string, any>;
  private _comparator: Comparator;

  constructor(props: CacheConstructorInterface<T> = {}) {
    this._emitter = new EventEmitter();
    this._cache = new Map(Object.entries<T>(props.initialData || {}));
    this._comparator = props.comparator ? props.comparator : (_key, prev, next) => prev === next;
  }

  subscribe(event: string, listener: EventEmitterListener) {
    return this._emitter.subscribe(event, listener);
  }

  serializeKey(key: string): SerializeKeys {
    const serializedKey = key;
    const errorKey = serializedKey ? 'error@' + serializedKey : '';
    return [serializedKey, errorKey];
  }

  clear() {
    this._cache.clear();
    this._emitter.emit('clear', null);
    return this;
  }

  delete(key: string) {
    const [serializedKey] = this.serializeKey(key);
    this._cache.delete(serializedKey);
    this._emitter.emit('delete', { key });
    return this;
  }

  set(key: string, value: any): this {
    const [serializedKey] = this.serializeKey(key);
    const prevValue = this._cache.get(serializedKey);
    const nextValue = value;
		if (!this._comparator(key, prevValue, nextValue)) {
      this._cache.set(serializedKey, value);
      this._emitter.emit('set', { key, value });
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
