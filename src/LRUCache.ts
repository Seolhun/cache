import { CacheInterface } from './Cache.types';
import { LRUCacheConstructorInterface } from './LRUCache.types';
import { AbstractCache } from './AbstractCache';

export class LRUCache<T> extends AbstractCache<T> implements CacheInterface {
  private _maxSize: number;

  constructor(props: LRUCacheConstructorInterface<T> = {}) {
    super(props);
    this._maxSize = props.maxSize || Infinity;
  }

  private _evictOldestEntry() {
    const oldestKey = this._cache.keys().next().value;
    this.delete(oldestKey);
  }

  clear() {
    this._cache.clear();
    this._emitter.emit('clear', null);
    return this;
  }

  delete(key: string) {
    const serializedKey = this.serializeKey(key)[0];
    const deleted = this._cache.delete(serializedKey);
    if (deleted) {
      this._emitter.emit('delete', { key: serializedKey });
    }
    return this;
  }

  set(key: string, value: T) {
    const serializedKey = this.serializeKey(key)[0];
    const existingValue = this._cache.get(serializedKey);

    if (!this.has(serializedKey)) {
      if (this.size() >= this._maxSize) {
        this._evictOldestEntry();
      }
    }

    this._cache.set(serializedKey, value);
    if (!this._comparator(serializedKey, existingValue, value)) {
      this._emitter.emit('set', { key: serializedKey, value });
    }

    return this;
  }

  get(key: string) {
    const serializedKey = this.serializeKey(key)[0];
    const value = this._cache.get(serializedKey);

    if (this.has(serializedKey)) {
      // update usage order of cache entries
      this.delete(serializedKey);
      this.set(serializedKey, value);
    }

    return value;
  }

  keys() {
    return Array.from(this._cache.keys());
  }

  has(key: string) {
    const serializedKey = this.serializeKey(key)[0];
    return this._cache.has(serializedKey);
  }

  size() {
    return this._cache.size;
  }
}
