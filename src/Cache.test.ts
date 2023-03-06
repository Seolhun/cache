import Cache from './Cache';

describe('Cache', () => {
  let cache: Cache<any>;

  beforeEach(() => {
    cache = new Cache();
  });

  describe('set', () => {
    it('should set the value for the given key', () => {
      cache.set('foo', 'bar');
      expect(cache.get('foo')).toEqual('bar');
    });

    it('should emit "set" event with key and value', () => {
      const listener = jest.fn();
      cache.subscribe('set', listener);

      cache.set('foo', 'bar');

      expect(listener).toHaveBeenCalledWith({ key: 'foo', value: 'bar' });
    });

    it('should not emit "set" event if value is the same', () => {
      const listener = jest.fn();
      cache.subscribe('set', listener);

      cache.set('foo', 'bar');
      cache.set('foo', 'bar');

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    it('should return the value for the given key', () => {
      cache.set('foo', 'bar');
      expect(cache.get('foo')).toEqual('bar');
    });

    it('should return null if the key is not found', () => {
      expect(cache.get('foo')).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete the value for the given key', () => {
      cache.set('foo', 'bar');
      cache.delete('foo');
      expect(cache.get('foo')).toBeNull();
    });

    it('should emit "delete" event with key', () => {
      const listener = jest.fn();
      cache.subscribe('delete', listener);

      cache.delete('foo');

      expect(listener).toHaveBeenCalledWith({ key: 'foo' });
    });
  });

  describe('clear', () => {
    it('should clear all values', () => {
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      cache.clear();
      expect(cache.get('foo')).toBeNull();
      expect(cache.get('baz')).toBeNull();
    });

    it('should emit "clear" event', () => {
      const listener = jest.fn();
      cache.subscribe('clear', listener);

      cache.clear();

      expect(listener).toHaveBeenCalledWith(null);
    });
  });

  describe('has', () => {
    it('should return true if the key exists', () => {
      cache.set('foo', 'bar');
      expect(cache.has('foo')).toBe(true);
    });

    it('should return false if the key does not exist', () => {
      expect(cache.has('foo')).toBe(false);
    });
  });

  describe('keys', () => {
    it('should return an array of keys', () => {
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      expect(cache.keys()).toEqual(['foo', 'baz']);
    });
  });
});
