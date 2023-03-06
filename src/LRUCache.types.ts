import { CacheConstructorInterface } from './Cache.types';

export interface LRUCacheNode<K, V> {
  key: K;
  value: V;
  prev: LRUCacheNode<K, V> | null;
  next: LRUCacheNode<K, V> | null;
}

export interface LRUCacheOptions {
  /**
   * @default 200
   */
  capacity?: number;
}

export interface LRUCacheConstructorInterface<T> extends CacheConstructorInterface<T> {
  maxSize?: number;
}
