import React, { useEffect, useState } from "react";
import { buildObjectOrArrayPreview } from "./utils";
import { ErrorBoundary, ErrorComponent } from "./ErrorComponent";
import { ValueRenderer } from "./ValueRenderer";
import { LabelRenderer } from "./LabelRenderer";

export const Treeview = ({ state, autoOpenFirstLevel = false }: any) => {
  const [openList, setOpen] = useState<string[]>([]);

  useEffect(() => {
    setOpen(
      autoOpenFirstLevel && typeof state === "object" ? Object.keys(state) : []
    );
  }, []);
  const toggleOpen = (key: string) => {
    if (openList.includes(key)) {
      setOpen(openList.filter((item) => item !== key));
    } else {
      setOpen([...openList, key]);
    }
  };
  return (
    <ErrorBoundary Error={ErrorComponent}>
      <div
        style={{
          paddingLeft: "25px",
          textAlign: "left",
          paddingBottom: "2px",
          minWidth: "300px",
          height: "auto",
          transition: "height 0.3s ease",
          color: "rgb(92 92 92)",
        }}
      >
        {" "}
        {Object.keys(state).length === 0 && (
          <i style={{ color: "#999" }}>
            {Array.isArray(state) ? "Array " : "Object "} is Empty
          </i>
        )}
        {Object.keys(state)
          .filter((key) => typeof state[key] !== "function")
          .map((item, i) => {
            return typeof state[item] === "object" && state[item] !== null ? (
              <div key={i}>
                <div
                  className="x-devtools-treview-header"
                  style={{
                    cursor: "pointer",
                    marginTop: "003px",
                    paddingBottom: "5px",
                    paddingLeft: "4px",
                  }}
                  onMouseDown={() => toggleOpen(item)}
                >
                  {" "}
                  <b>
                    <span
                      style={{ display: "inline-block", paddingTop: "5px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="13"
                        viewBox="0 -960 960 960"
                        width="24"
                        style={{
                          transform: !openList.includes(item)
                            ? "rotate(-32deg)"
                            : "rotate(60deg)",
                          transition: "transform ease 0.2s",
                          marginRight: "0px",
                          fill: "#444",
                        }}
                      >
                        <path d="m80-160 400-640 400 640H80Z" />
                      </svg>
                    </span>
                    <LabelRenderer label={item} />{" "}
                  </b>
                  :{" "}
                  {Array.isArray(state[item]) ? (
                    <b>
                      <i
                        title="Array"
                        style={{ color: "#555", fontSize: "12px" }}
                      >
                        {state[item].length > 0
                          ? buildObjectOrArrayPreview(state[item])
                          : " []"}
                      </i>
                    </b>
                  ) : (
                    <b>
                      <i
                        title="Object"
                        style={{ color: "#555", fontSize: "12px" }}
                      >
                        {Object.keys(state[item]).length > 0
                          ? buildObjectOrArrayPreview(state[item])
                          : " {}"}
                      </i>
                    </b>
                  )}
                </div>
                {openList.includes(item) &&
                  state[item] &&
                  typeof state[item] === "object" && (
                    <Treeview state={state[item]} />
                  )}
              </div>
            ) : (
              <div style={{ marginTop: "3px", width: "auto" }}>
                <b style={{ marginLeft: "10px" }}>
                  <LabelRenderer label={item} />{" "}
                </b>
                : <ValueRenderer text={state[item]} />
              </div>
            );
          })}
      </div>
    </ErrorBoundary>
  );
};
