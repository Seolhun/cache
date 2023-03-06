import { LRUCache } from './LRUCache';

describe('LRUCache', () => {
  let cache: LRUCache<string>;

  beforeEach(() => {
    cache = new LRUCache<string>(3);
  });

  test('get should return null if key is not in cache', () => {
    expect(cache.get('A')).toBeNull();
  });

  test('put should add a new item to the cache', () => {
    cache.put('A', 'Apple');
    expect(cache.get('A')).toBe('Apple');
  });

  test('put should update an existing item in the cache', () => {
    cache.put('A', 'Apple');
    cache.put('A', 'Apricot');
    expect(cache.get('A')).toBe('Apricot');
  });

  test('put should remove the least recently used item if cache is at capacity', () => {
    cache.put('A', 'Apple');
    cache.put('B', 'Banana');
    cache.put('C', 'Cherry');
    cache.put('D', 'Durian');
    expect(cache.get('A')).toBeNull();
  });
});
