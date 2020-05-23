export type cacheListener = () => void;

export type serializeKeys<T> = [keyof T, string];

export interface CacheInterface<T> {
  keys(): (keyof T)[];
  get(key: keyof T): T[keyof T] | null;
  set(key: keyof T, value: T[keyof T]): any;
  has(key: keyof T): boolean;
  delete(key: keyof T): void;
  clear(): void;
  serializeKey(key: keyof T): serializeKeys<T>;
  subscribe(listener: cacheListener): () => void;
}

type mutateCallback<Data> = (currentValue: Data) => Promise<Data> | Data;

export type mutateInterface<Data> = (
  key: keyof Data,
  data?: Data | Promise<Data> | mutateCallback<Data>,
  shouldRevalidate?: boolean,
) => Promise<Data | undefined>;
