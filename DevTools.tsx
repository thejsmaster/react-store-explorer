import React, { useEffect, useState } from "react";
import { TXDevToolsProps } from "./types";
import { ErrorComponent, ErrorBoundary } from "./ErrorComponent";

import { CollapsableWrapper } from "./CollapsableWrapper";

export const DevTools = ({
  stores = {},
  XIconPosition = { bottom: "50px", right: "50px" },
  keepOpen = false,
  iconColor = "rgb(233 62 44)",
  hideIcon = false,
  maxLogCount = 15,
  disableToggleESCKey = false,
}: TXDevToolsProps) => {
  const [showTools, setShowTools] = useState(keepOpen || false);
  useEffect(() => {
    function addCssToHead() {
      const cssString = `#react-store-explorer-holder{position:relative;overflow:hidden}#react-store-explorer-holder span{transition:left 0.3s,top 0.3s,width 0.3s,height 0.3s,border-radius 0.3s;position:relative;border-radius:10px!important}#react-store-explorer-holder:hover span{left:19px!important;top:19.5px!important;width:10px!important;height:10px!important}#react-store-explorer-holder:active{opacity:0.7}#react-store-explorer-holder:active span{background-color:#eee!important;width:16px!important;left:16px!important;top:16.5px!important;height:16.5px!important}`;

      const id = "234lsaoep23mohiuwelpmvonou";

      // Check if the style element with the ID already exists
      if (!document.getElementById(id)) {
        // Create a style element
        const style = document.createElement("style");

        // Set the ID and CSS text
        style.id = id;
        style.textContent = cssString;

        // Append the style element to the head
        document.head.appendChild(style);
      }
    }

    // Call the function to add the CSS to the head
    addCssToHead();

    // Clean up function to remove the style element when component unmounts
    return () => {
      const styleElement = document.getElementById(
        "234lsaoep23mohiuwelpmvonou"
      );
      if (styleElement) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);
  useEffect(() => {
    function handleKeyPress(event: any) {
      if (event.key === "Escape") {
        setShowTools(keepOpen || !showTools);
      }
    }

    if (!disableToggleESCKey) {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [showTools, setShowTools]);

  return (
    <ErrorBoundary Error={ErrorComponent}>
      <div id="react-store-explorer-container">
        {" "}
        <div
          id="usex-devtools"
          style={{
            lineHeight: 1.5,
            zIndex: 1000000000,
            height: "100%",
            width: "420px",
            maxWidth: "100%",
            position: "fixed",
            // background: "rgb(250,250,250)",
            background: "white",
            boxSizing: "border-box",
            transition: "right 0.2s ",
            top: 0,
            right: showTools ? "0px" : "-420px",
            color: "#444",
            overflow: "auto",
            boxShadow: "rgb(202 204 204) 0px 0px 10px 0px",

            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI","Ubuntu", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "white",
              borderLeft: "1px solid #CCC",
              padding: "10px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              react-store-explorer
            </span>
          </div>

          <ErrorBoundary Error={ErrorComponent}>
            {Object.keys(stores).sort().map((key: any) => {
              const stateValue = stores[key];
              return stateValue &&
                !!stateValue.getState &&
                !!stateValue.subscribe ? (
                <div key={key}>
                  <ErrorBoundary Error={ErrorComponent}>
                    <CollapsableWrapper
                      maxLogCount={maxLogCount}
                      stateValue={stateValue}
                      name={key}
                    />{" "}
                  </ErrorBoundary>
                </div>
              ) : (
                <></>
              );
            })}
          </ErrorBoundary>

          {Object.keys(stores).length === 0 && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {" "}
              <i>Store is Empty</i>
            </div>
          )}
        </div>
        {!hideIcon && (
          <div
            onMouseDown={() => {
              setShowTools(keepOpen || !showTools);
            }}
            id="usex-devtools-holder"
            style={{
              zIndex: 1000000001,
              width: "50px",
              height: "50px",
              background: "green",
              borderRadius: "50px",
              position: "fixed",
              boxShadow: "0px 0px 10px 1px #CCC",
              cursor: "pointer",
              ...XIconPosition,
            }}
          >
            <div
              id="react-store-explorer-holder"
              style={{
                width: "50px",
                height: "50px",
                background: iconColor,
                borderRadius: "50px",
                position: "relative",
                boxShadow: "0px 0px 10px 1px #CCC",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "white",
                  width: "5px",
                  height: "5px",
                  left: "21.5px",
                  top: "10px",
                  position: "absolute",
                }}
              ></span>
              <span
                style={{
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "white",
                  width: "5px",
                  height: "5px",
                  left: "12px",
                  top: "30px",
                  position: "absolute",
                }}
              ></span>
              <span
                style={{
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "white",
                  width: "5px",
                  height: "5px",
                  left: "32px",
                  top: "30px",
                  position: "absolute",
                }}
              ></span>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
