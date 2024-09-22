export type StateType = Record<string, StoreType>;
export type StoreType = {
  getState: () => object;
  subscribe: (callback: () => void) => void;
};
export type TXDevToolsProps = {
  XIconPosition?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  from?: "custom" | "get-set-react" | "zustand" | "redux" ;
  iconColor?: string;
  maxLogCount?: number;
  stores: StateType;
  keepOpen?: boolean;
  enableConsoleLogging?: boolean;
  hideIcon?: boolean;
  enableDevTools?: boolean;
  children?: any;
  disableToggleESCKey?: boolean;
  showUnMountedViews?: boolean;
};
