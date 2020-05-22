type keyFunction = () => string | any[] | null;

export type keyInterface = keyFunction | string | any[] | null;

export type cacheListener = () => void;

export interface CacheInterface {
  get(key: keyInterface): any;
  set(key: keyInterface, value: any, shouldNotify?: boolean): any;
  keys(): string[];
  has(key: keyInterface): boolean;
  delete(key: keyInterface, shouldNotify?: boolean): void;
  clear(shouldNotify?: boolean): void;
  serializeKey(key: keyInterface): [string, any, string];
  subscribe(listener: cacheListener): () => void;
}
