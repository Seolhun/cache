[![Build Status](https://travis-ci.com/Seolhun/cache.svg?branch=master)](https://travis-ci.com/Seolhun/cache)

# Cache

To store key value as Cache

## Requirement

Node > 10.0


```ts
export interface CacheInterface<T> {
  subscribe(listener: cacheListener): () => void;
  clear(): void;
  delete(key: keyof T): void;
  set(key: keyof T, value: T[keyof T]): any;
  get(key: keyof T): T[keyof T] | {[key: string]: string;}
  keys(): (keyof T)[];
  has(key: keyof T): boolean;
  serializeKey(key: keyof T): serializeKeys<T>;
}

export interface CacheConstructorInterface<T> {
	initialData?: T,
	listeners?: ((...args: any[]) => void)[];
	comparator?: comparator<T>
}
```
