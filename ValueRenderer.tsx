import React, { useEffect, useState } from "react";

export const ValueRenderer = ({ text }: any) => {
  const [highlighted, setHighlighted] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    if (!firstRender) {
      setHighlighted(true);
      const timer = setTimeout(() => {
        setHighlighted(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setFirstRender(false);
    }
  }, [text]);

  const highlightStyle = highlighted
    ? {
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        transition: "background-color 0s",
      }
    : {
        backgroundColor: "rgba(0, 255, 0, 0)",
        transition: "background-color 2s",
      };

  return (
    <span
      title={text + ""}
      style={{
        ...highlightStyle,
        padding: "0px 5px",
        borderRadius: "4px",
      }}
    >
      {text === null ? (
        <span style={{ color: "orange" }}>null</span>
      ) : text === undefined ? (
        <span style={{ color: "orange" }}>undefined</span>
      ) : typeof text === "function" ? (
        <b>Function</b>
      ) : text === "" ? (
        <i>''</i>
      ) : typeof text === "string" ? (
        <span style={{ color: "#444" }}>{text}</span>
      ) : (
        (text + "").slice(0, 100) + "" + ((text + "").length > 100 ? "..." : "")
      )}
    </span>
  );
};
