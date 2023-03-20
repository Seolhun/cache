export type EventEmitterListener = <Args>(args: Args) => void;

export interface EventEmitterSubscriptionEventMap {
  [key: string]: EventEmitterListener;
}
