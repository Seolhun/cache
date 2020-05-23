export type cacheListener = () => void;

export type serializeKeys<T> = [keyof T, string];

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

type mutateCallback<Data> = (currentValue: Data) => Promise<Data> | Data;

export type mutateInterface<Data> = (
  key: keyof Data,
  data?: Data | Promise<Data> | mutateCallback<Data>,
  shouldRevalidate?: boolean,
) => Promise<Data | undefined>;
