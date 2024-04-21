import { ErrorBoundary, ErrorComponent } from "./ErrorComponent";
import React, { useEffect } from "react";
import { DevTools } from "./DevTools";
import { TXDevToolsProps } from "./types";

export function ReactStoreExplorer(props: TXDevToolsProps) {
  const { enableDevTools = true, keepOpen = false } = props;
  return (
    <>
      <ErrorBoundary Error={ErrorComponent}>
        <div style={{ paddingRight: keepOpen ? "400px" : "0px" }}>
          {" "}
          {props.children && props.children}
        </div>
      </ErrorBoundary>
      {enableDevTools && (
        <ErrorBoundary Error={ErrorComponent}>
          <DevTools {...props} />
        </ErrorBoundary>
      )}
    </>
  );
}
