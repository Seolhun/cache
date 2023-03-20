import { AbstractCache } from './AbstractCache';
import { CacheConstructorInterface } from './Cache.types';
import { EventEmitterListener } from './EventEmitter';

export class Cache<T> extends AbstractCache<T> {
  constructor(args: CacheConstructorInterface<T> = {}) {
    super(args);
  }

  subscribe(event: string, listener: EventEmitterListener) {
    return this._emitter.subscribe(event, listener);
  }

  clear() {
    this._cache.clear();
    this._emitter.emit('clear');
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

  size() {
    return this._cache.size;
  }
}
