import React from "react";
import { ErrorBoundary, ErrorComponent } from "./ErrorComponent";
import { Treeview } from "./Treeview";

export const StateView = ({
  state,
  boldFont = true,
  autoOpenFirstLevel = false,
}: any) => {
  return (
    <ErrorBoundary Error={ErrorComponent}>
      <div style={{ marginLeft: "-30px" }}>
        <Treeview
          autoOpenFirstLevel={autoOpenFirstLevel}
          state={state}
          boldFont={boldFont}
        />
      </div>
    </ErrorBoundary>
  );
};
