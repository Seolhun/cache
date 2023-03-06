import { CacheInterface, SerializeKeys, Comparator, CacheConstructorInterface } from './Cache.types';
import { EventEmitter, EventEmitterListener } from './EventEmitter';

export abstract class AbstractCache<T> implements CacheInterface {
  protected _emitter: EventEmitter<any>;
  protected _cache: Map<string, any>;
  protected _comparator: Comparator;

  constructor(props: CacheConstructorInterface<T> = {}) {
    this._emitter = new EventEmitter();
    this._cache = new Map(Object.entries<T>(props.initialData || {}));
    this._comparator = props.comparator ? props.comparator : (_key, prev, next) => prev === next;
  }

  abstract clear(): this;
  abstract delete(key: string): this;
  abstract set(key: string, value: any): this;
  abstract get(key: string): void;
  abstract keys(): string[];
  abstract has(key: string): boolean;
  abstract size(): number;

  subscribe(event: string, listener: EventEmitterListener) {
    return this._emitter.subscribe(event, listener);
  }

  serializeKey(key: string): SerializeKeys {
    const serializedKey = key;
    const errorKey = serializedKey ? 'error@' + serializedKey : '';
    return [serializedKey, errorKey];
  }
}
