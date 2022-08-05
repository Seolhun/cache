import Cache from './Cache';

type CacheValueType = any;

describe('Cache Test', () => {
  it('comparator', () => {
    const comparator = (key, prevValue, nextValue) => {
      if (key === 'foo') {
        const hit = prevValue !== 4 && prevValue !== nextValue;
        return hit;
      }
      return true;
    };
    const initialData = { foo: 3 };
    const cache = new Cache<CacheValueType>({ initialData, comparator });
    cache.set('user', { id: 1, name: 'seolhun' });
    cache.set('foo', 4);
    expect(cache.get('user')).toEqual({ id: 1, name: 'seolhun' });
    expect(cache.get('foo')).toEqual(4);
    cache.set('user', { id: 1, name: 'seolhun' });
    cache.set('foo', 5);
    expect(cache.get('user')).toEqual({ id: 1, name: 'seolhun' });
    expect(cache.get('foo')).toEqual(4);
  });

  it('notify(): after set subscribe, log test', () => {
    const cache = new Cache<CacheValueType>();
    const listener = jest.fn();
    cache.subscribe(listener);

    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(listener).toBeCalledTimes(1);
    cache.delete('user');
    expect(listener).toBeCalledTimes(2);
    cache.clear();
    expect(listener).toBeCalledTimes(3);
  });

  it('clear()', () => {
    const cache = new Cache<CacheValueType>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.clear().keys()).toEqual([]);
  });

  it('delete', () => {
    const cache = new Cache<CacheValueType>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    cache.set('users', []);
    expect(cache.delete('user').keys()).toEqual(['users']);
  });

  it('set() - get()', () => {
    const cache = new Cache<CacheValueType>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.get('user')).toEqual({ id: 1, name: 'hun' });
  });

  it('get(): No cache key', () => {
    const cache = new Cache<CacheValueType>();
    expect(cache.get('foo')).toEqual(null);
  });

  it('keys()', () => {
    const cache = new Cache<CacheValueType>();
    expect(cache.keys()).toEqual([]);
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.keys()).toEqual(['user']);
  });

  it('has()', () => {
    const cache = new Cache<CacheValueType>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.has('user')).toEqual(true);
    expect(cache.has('users')).toEqual(false);
    expect(cache.has('fdsa')).toEqual(false);
  });

  it('serializeKey()', () => {
    const cache = new Cache<CacheValueType>();
    expect(cache.serializeKey('user')).toEqual(['user', 'error@user']);
    expect(cache.serializeKey('foo')).toEqual(['foo', 'error@foo']);
  });
});
