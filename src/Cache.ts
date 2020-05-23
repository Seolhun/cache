import {
	CacheInterface,
	CacheConstructorInterface,
	cacheListener,
	serializeKeys,
	comparator,
} from './types';

export default class Cache<T> implements CacheInterface<T> {
  private __cache: Map<string, T[keyof T]>;
	private __listeners: cacheListener[];
	private __comparator: comparator<T>;

  constructor(props: CacheConstructorInterface<T> = {}) {
    this.__cache = new Map(Object.entries<T[keyof T]>(props.initialData || {}));
		this.__listeners = props.listeners ? props.listeners : [];
		this.__comparator = props.comparator ? props.comparator : () => true;
  }

  private async notify() {
    await Promise.all(this.__listeners.map(async (listener) => await listener()));
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

  clear() {
    this.__cache.clear();
    this.notify();
    return this;
  }

  delete(key: keyof T) {
    const [serializedKey] = this.serializeKey(key);
    this.__cache.delete(serializedKey as string);
    this.notify();
    return this;
  }

  set(key: keyof T, value: T[keyof T]): any {
		const [serializedKey] = this.serializeKey(key);
		const prevValue = this.__cache.get(serializedKey as string);
		const nextValue = value;
		if (this.__comparator(key, prevValue, nextValue)) {
			this.__cache.set(serializedKey as string, value);
			this.notify();
		}
    return this;
  }

  get(key: keyof T) {
    const [serializedKey] = this.serializeKey(key);
    const hitData = this.__cache.get(serializedKey as string);
    if (!hitData) {
			const [serializedKey, errorKey] = this.serializeKey(key);
      return {
				[serializedKey]: errorKey
			};
    }
    return hitData;
  }

  keys() {
    return Array.from(this.__cache.keys()) as (keyof T)[];
  }

  has(key: keyof T) {
    const [serializedKey] = this.serializeKey(key);
    return this.__cache.has(serializedKey as string);
  }

  serializeKey(key: keyof T): serializeKeys<T> {
    const errorKey = key ? 'error@' + key : '';
    return [key, errorKey];
  }
}
