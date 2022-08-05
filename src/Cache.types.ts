import { ObservableListener } from './Observable';

export type serializeKey = string;
export type serializeKeys = [serializeKey, string];

export type comparator<Value> = (key: string, prevValue?: Value, nextValue?: Value) => boolean;

export interface CacheInterface<Value> {
  subscribe: (listener: ObservableListener) => () => void;
  clear: () => void;
  delete: (key: string) => void;
  set: (key: string, value: Value) => this;
  get: (key: string) => Value | null;
  keys: () => string[];
  has: (key: string) => boolean;
  serializeKey: (key: string) => serializeKeys;
}

export interface CacheConstructorInterface<T> {
  initialData?: T;
  listeners?: ObservableListener[];
  comparator?: comparator<T>;
}
