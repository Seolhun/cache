export type EventEmitterListener = <Args>(args: Args) => void;



export class EventEmitter<Args> {
	private listeners: Map<string, EventEmitterListener[]> = new Map();

  on(event: string, listener: EventEmitterListener): void {
    const listeners = this.listeners.get(event) || [];
    listeners.push(listener);
    this.listeners.set(event, listeners);
  }

  off(event: string, listener: EventEmitterListener): void {
    const listeners = this.listeners.get(event) || [];
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
      this.listeners.set(event, listeners);
    }
	}

	subscribe(event: string, listener: EventEmitterListener) {
    let isSubscribed = true;
    this.on(event, listener);

    return () => {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      this.off(event, listener);
    };
  }

  async emit(event: string, args: Args): Promise<void> {
		const listeners = this.listeners.get(event) || [];
		await Promise.all(listeners.map( (listener) => listener(args)));
  }
}
