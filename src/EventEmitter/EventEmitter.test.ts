import { EventEmitter } from './EventEmitter';
import { EventEmitterListener, EventEmitterSubscriptionEventMap } from './EventEmitter.types';

interface EventMap extends EventEmitterSubscriptionEventMap {
  event: EventEmitterListener;
}

describe('EventEmitter', () => {
  it('should invoke listener when emitting an event', () => {
    const emitter = new EventEmitter<EventMap>();
    const listener = jest.fn();
    emitter.on('event', listener);
    emitter.emit('event', 'hello');
    expect(listener).toHaveBeenCalledWith('hello');
  });

  it('should not invoke removed listener when emitting an event', () => {
    const emitter = new EventEmitter<EventMap>();
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    emitter.on('event', listener1);
    emitter.on('event', listener2);
    emitter.off('event', listener1);
    emitter.emit('event', 'hello');
    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledWith('hello');
  });

  it('should not throw when removing non-existent listener', () => {
    const emitter = new EventEmitter<EventMap>();
    const listener = jest.fn();
    expect(() => emitter.off('event', listener)).not.toThrow();
  });

  it('should invoke listener when subscribing to an event and emit an event', () => {
    const emitter = new EventEmitter<EventMap>();
    const listener = jest.fn();
    const unsubscribe = emitter.subscribe('event', listener);
    emitter.emit('event', 'hello');
    expect(listener).toHaveBeenCalledWith('hello');
    unsubscribe();
  });

  it('should not invoke listener after unsubscribing from an event', () => {
    const emitter = new EventEmitter<EventMap>();
    const listener = jest.fn();
    const unsubscribe = emitter.subscribe('event', listener);
    unsubscribe();
    emitter.emit('event', 42);
    expect(listener).not.toHaveBeenCalled();
  });
});
