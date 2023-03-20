export type EventEmitterListener = <Args extends unknown[]>(...args: Args) => void;

export interface EventEmitterSubscriptionEventMap {
  [key: string | number | symbol]: EventEmitterListener;
}
