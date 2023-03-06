import { ObservableInterface, ObservableListener } from './Observable.types';

class Observable implements ObservableInterface {
  private _listeners: ObservableListener[] = [];
  size = 0;

  constructor(listeners: ObservableListener[] = []) {
    listeners.forEach((listener) => this.addEventListener(listener));
  }

  private addEventListener(listener: ObservableListener) {
    this._listeners.push(listener);
    this.size += 1;
  }

  private removeEventListener(listener: ObservableListener) {
    const index = this._listeners.indexOf(listener);
    if (index > -1) {
      this._listeners[index] = this._listeners[this._listeners.length - 1];
      this._listeners.length--;
      this.size -= 1;
    }
  }

  subscribe(listener: ObservableListener) {
    let isSubscribed = true;
    this.addEventListener(listener);

    return () => {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      this.removeEventListener(listener);
    };
  }

  async notify() {
    await Promise.all(this._listeners.map(async (listener) => await listener()));
  }
}

export { Observable };
export default Observable;
