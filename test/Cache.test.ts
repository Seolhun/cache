import Cache from '../src/Cache';
import cache from '../examples/Cache.Example';

describe('Cache Test', () => {
  beforeEach(() => {
    cache.clear();
  });

  it('comparator', () => {
    const comparator = (key, prevValue, nextValue) => {
      if (key === 'foo') {
        const hit = prevValue !== 4 && prevValue !== nextValue;
        return hit;
      }
      return true;
    };
    const initialData = { foo: 3 };
    const tempCache = new Cache<any>({ initialData, comparator });
    tempCache.set('user', { name: 'seolhun' });
    tempCache.set('foo', 4);
    expect(tempCache.get('user')).toEqual({ name: 'seolhun' });
    expect(tempCache.get('foo')).toEqual(4);
    tempCache.set('user', { name: 'seolhun' });
    tempCache.set('foo', 5);
    expect(tempCache.get('user')).toEqual({ name: 'seolhun' });
    expect(tempCache.get('foo')).toEqual(4);
  });

  it('subscribe: listener is not a function', () => {
    try {
      // @ts-ignore
      cache.subscribe(null);
    } catch (error) {
      expect(error.message).toEqual('Expected the listener to be a function.');
    }
  });

  it('notify: after set subscribe, log test', () => {
    let subscribeOutput = 0;
    const subscribe = () => subscribeOutput++;
    cache.subscribe(subscribe);
    cache.set('user', {
      id: '1',
      name: 'hun',
    });
    expect(subscribeOutput).toEqual(1);
    cache.delete('user');
    expect(subscribeOutput).toEqual(2);
    cache.clear();
    expect(subscribeOutput).toEqual(3);
  });

  it('clear', () => {
    cache.set('user', {
      id: '1',
      name: 'hun',
    });
    expect(cache.clear().keys()).toEqual([]);
  });

  it('delete', () => {
    cache.set('user', {
      id: '1',
      name: 'hun',
    });
    cache.set('users', []);
    expect(cache.delete('user').keys()).toEqual(['users']);
  });

  it('set - get', () => {
    cache.set('user', {
      id: '1',
      name: 'hun',
    });
    expect(cache.get('user')).toEqual({ id: '1', name: 'hun' });
  });

  it('get: No cache key', () => {
    // @ts-ignore
    expect(cache.get('foo')).toEqual({ foo: 'error@foo' });
  });

  it('keys', () => {
    expect(cache.keys()).toEqual([]);
    cache.set('user', {
      id: '1',
      name: 'hun',
    });
    expect(cache.keys()).toEqual(['user']);
  });

  it('has', () => {
    cache.set('user', {
      id: '1',
      name: 'hun',
    });
    expect(cache.has('user')).toEqual(true);
    expect(cache.has('users')).toEqual(false);
    // @ts-ignore
    expect(cache.has('fdsa')).toEqual(false);
  });

  it('serializeKey', () => {
    expect(cache.serializeKey('user')).toEqual(['user', 'error@user']);
    // @ts-ignore
    expect(cache.serializeKey('foo')).toEqual(['foo', 'error@foo']);
  });
});
