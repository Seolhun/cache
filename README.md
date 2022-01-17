![Stage Github workflow](https://github.com/Seolhun/cache/actions/workflows/stage-build-test.yml/badge.svg)
![Dev Github workflow](https://github.com/Seolhun/cache/actions/workflows/dev-build-test.yml/badge.svg)

# Cache

To store key value as Cache

## Requirement

Node > 10.0

## Install

```bash
npm install @seolhun/cache
```

```ts
import Cache from '@seolhun/cache';
```

## Configuration props

```ts
export interface CacheInterface<Value> {
  subscribe(listener: cacheListener): () => void;
  clear(): void;
  delete(key: string): void;
  set(key: string, value: Value): this;
  get(key: string): Value | null;
  keys(): (string)[];
  has(key: string): boolean;
  serializeKey(key: string): serializeKeys;
}

export interface CacheConstructorInterface<T> {
  initialData?: T;
  listeners?: ((...args: any[]) => void)[];
  comparator?: comparator<T>;
}
```
