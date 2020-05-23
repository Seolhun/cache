import cache from '../examples/cache';

describe('Cache Test', () => {
  it('keys: default', () => {
    expect(cache.keys()).toEqual([]);
  });

  it('set - get: default', () => {
    cache.set('user', {
      id: '100',
      name: 'hun',
    });
    expect(cache.get('user')).toEqual({ id: '100', name: 'hun' });
  });

  it('keys: after set', () => {
    cache.set('user', {
      id: '100',
      name: 'hun',
    });
    expect(cache.keys()).toEqual(['user']);
  });
});
