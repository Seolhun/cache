import Observable from './Observable';

describe('Observable Test', () => {
  it('init listener()', () => {
    const listener = jest.fn();
    const observable = new Observable([listener]);
    expect(observable.size).toBe(1);
  });

  it('init listener - notify()', () => {
    const listener = jest.fn();
    const observable = new Observable([listener]);
    observable.notify();
    expect(listener).toBeCalledTimes(1);
    observable.notify();
    expect(listener).toBeCalledTimes(2);
    observable.notify();
    expect(listener).toBeCalledTimes(3);
  });

  it('subscribe() & notify()', () => {
    const observable = new Observable();
    const listener = jest.fn();
    observable.subscribe(listener);
    observable.notify();
    expect(listener).toBeCalledTimes(1);
    observable.notify();
    expect(listener).toBeCalledTimes(2);
    observable.notify();
    expect(listener).toBeCalledTimes(3);
  });

  it('subscribe() - subscribe() to teardown', () => {
    const observable = new Observable();
    const listener = jest.fn();
    const subscriber = observable.subscribe(listener);
    expect(observable.size).toBe(1);
    observable.notify();
    expect(listener).toBeCalledTimes(1);
    subscriber();
    expect(observable.size).toBe(0);
    observable.notify();
    expect(listener).toBeCalledTimes(1);
  });
});
