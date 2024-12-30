import React, { useState } from "react";
import { ValueRenderer } from "./ValueRenderer";
import { StateView } from "./StateView";
import { formatTimeExtended } from "./utils";

export const Switch = ({
  from,
  actualState,
  changeList,
  setChanges,
  previousStates = [],
  setIndex,
  index,
  name,
  maxLogCount,
}: any) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ["State", "Change Logs", "prev states"];

  const spanStyle = (isSelected: boolean) => {
    return {
      border: " 1px solid #DDD",
      color: isSelected ? "white" : "#444",
      padding: "3px 10px",
      marginRight: "7px",
      borderRadius: "7px",
      background: isSelected ? "rgb(2 137 101)" : "none",
      display: "inline-block",
      verticalAlign: "top",
      width: "auto",
      textAlign: "center",
      cursor: "pointer",
    };
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          paddingBottom: "5px",
          width: "100%",
          margin: "0 auto",
          marginBottom: "10px",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        {tabs.map((item, i) => (
          <span
            key={i}
            onMouseDown={() => setSelectedTab(i)}
            //@ts-ignore
            style={spanStyle(selectedTab === i)}
          >
            {item} {i === 1 && <ValueRenderer text={index} />}
          </span>
        ))}
      </div>
      <div style={{ display: selectedTab === 0 ? "block" : "none" }}>
        {typeof actualState === "object" ? (
          <StateView state={actualState} />
        ) : (
          actualState
        )}
      </div>
      <div style={{ display: selectedTab === 2 ? "block" : "none" }}>
        {previousStates?.length > 9 && (
          <span>
            <i>only showing the last {10} previous states</i>
          </span>
        )}
        {typeof previousStates === "object" ? (
          <StateView state={previousStates} />
        ) : (
          actualState
        )}
      </div>

      <div style={{ display: selectedTab === 1 ? "block" : "none" }}>
        {changeList.length > 0 && (
          <>
            {" "}
            <div>
              {" "}
              <span style={{ paddingRight: "5px" }}>
                {" "}
                <b>R</b>eact{" "}
              </span>
              <span style={{ paddingRight: "5px" }}>
                <b> U</b>pdate{" "}
              </span>
              <span style={{ paddingRight: "5px" }}>
                <b> S</b>et
              </span>
            </div>
            <div style={{ padding: "10px", marginBottom: "10px" }}>
              {index > maxLogCount && (
                <span>
                  <i>only showing the last {maxLogCount} logs</i>
                </span>
              )}
              <span
                style={{
                  float: "right",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setChanges([]);
                  setIndex(0);
                }}
              >
                <i>Clear Logs</i>
              </span>
            </div>
          </>
        )}
        {(changeList || []).map((item: any, key: number) => {
          return (
            <div
              key={key}
              style={{
                borderBottom: "1px solid #CCC",
              }}
            >
              {" "}
              {(item.functionName || item.fileName) && (
                <div style={{ textAlign: "center", padding: "5px" }}>
                  {item.functionName} - {item.fileName}
                </div>
              )}
              <span
                style={{ float: "right", clear: "both", paddingRight: "10px" }}
              >
                {item.index}
              </span>{" "}
              <StateView
                state={{
                  [item.from && item.type && item.path
                    ? "(" +
                      item.from?.toUpperCase?.()?.slice?.(0, 1) +
                      ") " +
                      (item.path || "*") +
                      (item.type === "add"
                        ? "[A]"
                        : item.type === "update"
                        ? "[M]"
                        : "[D]")
                    : "*"]: item.value,
                }}
              />
            </div>
          );
        })}

        {/* {changeList?.map((log: any, index: number) => {
          let lastone = State.setLogs[index - 1];
          let timeDurationSinceLast = lastone ? lastone.time - log.time : 0;
          let groupLog = false;
          if (
            lastone &&
            timeDurationSinceLast < 2000 &&
            lastone.functionName === log.functionName
          ) {
            groupLog = true;
          }
          return (
            <div
              key={" set " + index + log.name}
              style={{
                // background: Timer(log.at) === "Just now" ? "#EEE" : "none",
                borderTop:
                  timeDurationSinceLast < 2000 || index == 0
                    ? "none"
                    : "1px solid #CCC",
                marginBottom: "5px",
                marginTop: groupLog ? "-10px" : "0px",
                paddingBottom: "5px",

                position: "relative",
              }}
            >
              {!groupLog && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <span
                    style={{
                      // backgroundColor: "#EEE",
                      padding: "2px 5px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      textAlign: "left",
                      fontSize: "16px",
                      // background: "#EFEFEF",
                    }}
                  >
                    
                  </span>{" "}
                  <span style={{ color: "#777" }}></span>
                  <span style={{}}>
                    <TimeRenderer time={log.at} />
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  verticalAlign: "top",
                  width: "330px",
                }}
              >
                <StateView
                  autoOpenFirstLevel={false}
                  state={
                    {
                      [log.name]: {
                        changes: log.changeList,
                        payload: log.payload,
                        "Called By": log.functionName,
                        from: log.fileName,
                        "triggered at": formatTimeExtended(log.at),
                      },
                    } || {}
                  }
                />{" "}
                <div
                  style={{ position: "absolute", top: "6px", right: "50px" }}
                >
                  ~ {log.duration}
                </div>
                <div
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    marginTop: "10px",
                    right: "5px",
                    top: "-3px",
                  }}
                >
                  {log.index}
                </div>
                <div
                  title={
                    log.errorOccured
                      ? "check console for error deails"
                      : "Success"
                  }
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    marginTop: "10px",
                    right: "30px",
                    top: "3px",
                    borderRadius: "30px",
                    width: "10px",
                    height: "10px",
                    background: log.errorOccured ? "red" : "green",
                  }}
                ></div>
              </div>
            </div>
          );
        })} */}
      </div>

      <div style={{ marginTop: "10px" }}></div>
    </div>
  );
};
