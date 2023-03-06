import { LRUCache } from './LRUCache';

describe('LRUCache', () => {
  const cache = new LRUCache<string>({ maxSize: 2 });

  beforeEach(() => {
    cache.clear();
  });

  test('set/get works correctly', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toEqual('value1');

    cache.set('key2', 'value2');
    expect(cache.get('key2')).toEqual('value2');
  });

  test('LRU eviction works correctly', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');

    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toEqual('value2');
    expect(cache.get('key3')).toEqual('value3');
  });

  test('delete works correctly', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');

    cache.delete('key1');
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toEqual('value2');
  });

  test('emits events correctly', () => {
    const callback = jest.fn();
    cache.subscribe('key1', callback);

    cache.set('key1', 'value1');
    expect(callback).toHaveBeenCalledWith({ key: 'key1', value: 'value1' });

    cache.delete('key1');
    expect(callback).toHaveBeenCalledWith({ key: 'key1' });
  });
});
