export type ObservableListener = () => void;

export interface ObservableInterface {
  subscribe: (listener: ObservableListener) => void;

  notify: () => void;
}
