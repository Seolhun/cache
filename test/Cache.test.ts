import Cache from '../src/Cache';

interface User {
  id: number;
  name: string;
}

interface CacheProps {
  user: User;
  users: User[];
}

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
    // @ts-ignore
    const cache = new Cache<CacheProps>({ initialData, comparator });
    cache.set('user', { id: 1, name: 'seolhun' });
    // @ts-ignore
    cache.set('foo', 4);
    expect(cache.get('user')).toEqual({ id: 1, name: 'seolhun' });
    // @ts-ignore
    expect(cache.get('foo')).toEqual(4);
    cache.set('user', { id: 1, name: 'seolhun' });
    // @ts-ignore
    cache.set('foo', 5);
    expect(cache.get('user')).toEqual({ id: 1, name: 'seolhun' });
    // @ts-ignore
    expect(cache.get('foo')).toEqual(4);
  });

  it('subscribe(): listener is not a function', () => {
    const cache = new Cache<CacheProps>();
    try {
      cache.subscribe(null);
    } catch (error) {
      expect(error.message).toEqual('Expected the listener to be a function.');
    }
  });

  it('notify(): after set subscribe, log test', () => {
    const cache = new Cache<CacheProps>();
    let subscribeOutput = 0;
    const subscribe = () => subscribeOutput++;
    cache.subscribe(subscribe);
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(subscribeOutput).toEqual(1);
    cache.delete('user');
    expect(subscribeOutput).toEqual(2);
    cache.clear();
    expect(subscribeOutput).toEqual(3);
  });

  it('clear()', () => {
    const cache = new Cache<CacheProps>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.clear().keys()).toEqual([]);
  });

  it('delete', () => {
    const cache = new Cache<CacheProps>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    cache.set('users', []);
    expect(cache.delete('user').keys()).toEqual(['users']);
  });

  it('set() - get()', () => {
    const cache = new Cache<CacheProps>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.get('user')).toEqual({ id: 1, name: 'hun' });
  });

  it('get(): No cache key', () => {
    const cache = new Cache<CacheProps>();
    // @ts-ignore
    expect(cache.get('foo')).toEqual({ foo: 'error@foo' });
  });

  it('keys()', () => {
    const cache = new Cache<CacheProps>();
    expect(cache.keys()).toEqual([]);
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.keys()).toEqual(['user']);
  });

  it('has()', () => {
    const cache = new Cache<CacheProps>();
    cache.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(cache.has('user')).toEqual(true);
    expect(cache.has('users')).toEqual(false);
    // @ts-ignore
    expect(cache.has('fdsa')).toEqual(false);
  });

  it('serializeKey()', () => {
    const cache = new Cache<CacheProps>();
    expect(cache.serializeKey('user')).toEqual(['user', 'error@user']);
    // @ts-ignore
    expect(cache.serializeKey('foo')).toEqual(['foo', 'error@foo']);
  });
});
