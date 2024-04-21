import { Collapsable } from "./Collapsable";
import { ErrorBoundary, ErrorComponent } from "./ErrorComponent";
import { Switch } from "./Switch";
import { useStore } from "./useStore";
import React from "react";
export const CollapsableWrapper = ({ stateValue, name, maxLogCount }: any) => {
  const {
    state: actualState,
    changes: changeList,
    setChanges,
    index,

    setIndex,
  } = useStore(stateValue, maxLogCount);

  return (
    <Collapsable
      label={name}
      state={actualState}
      changeList={changeList}
      setChanges={setChanges}
      index={index}
      setIndex={setIndex}
      RightHeaderContent={({ open }: any) => {
        return (
          !open && (
            <b
              style={{
                float: "right",
                color: "green",
                fontSize: "small",
              }}
            >
              {" "}
              {index > 0 ? index : ""}
            </b>
          )
        );
      }}
    >
      <ErrorBoundary Error={ErrorComponent}>
        <Switch
          changeList={changeList}
          setChanges={setChanges}
          maxLogCount={maxLogCount}
          index={index}
          setIndex={setIndex}
          actualState={actualState}
          name={name}
        />
      </ErrorBoundary>
    </Collapsable>
  );
};