export type StateType = Record<
  string,
  {
    get: () => object;
    subscribe: (callback: () => void) => void;
    unsubscribe: (callback: () => void) => void;
  }
>;
export type TXDevToolsProps = {
  XIconPosition?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  iconColor?: string;
  maxLogCount?: number;
  store: StateType;
  keepOpen?: boolean;
  enableConsoleLogging?: boolean;
  hideIcon?: boolean;
  enableDevTools?: boolean;
  children?: any;
  disableToggleESCKey?: boolean;
  showUnMountedViews?: boolean;
};
