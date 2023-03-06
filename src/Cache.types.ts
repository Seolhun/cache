import { EventEmitterListener } from './EventEmitter';

export type SerializeKey = string;
export type SerializeKeys = [SerializeKey, string];

export type Comparator = <Value>(key: string, prevValue?: Value, nextValue?: Value) => boolean;

export interface CacheInterface {
  subscribe: (event: string, listener: EventEmitterListener) => () => void;
  clear: () => void;
  delete: (key: string) => void;
  set: (key: string, value: any) => this;
  get: (key: string) => any | null;
  keys: () => string[];
  has: (key: string) => boolean;
  serializeKey: (key: string) => SerializeKeys;
}

export interface CacheConstructorInterface<T> {
  initialData?: T;
  comparator?: Comparator;
}
