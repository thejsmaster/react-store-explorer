import React, { useState } from "react";

export const Collapsable = ({
  children,
  label,
  isUseXState = true,
  RightHeaderContent = () => {},
}: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        key={label}
        style={{
          padding: "12px 15px",
          borderTop: "1px solid rgb(232 238 231)",
          borderLeft: !open ? "4px solid #CCC" : "4px solid rgb(2, 137, 101)",
          borderImage: "initial",
          background: "rgb(250 250 250)",
          cursor: "pointer",
          fontWeight: !open ? "normal" : 700,
          color: "rgb(92 92 92)",
          textAlign: "left",
          overflow: "auto",
          position: "sticky",
          top: 0,
          zIndex: 1000002,
        }}
        onMouseDown={() => setOpen(!open)}
      >
        <span
          style={{
            display: "inline-block",
            paddingLeft: "5px",
            fontSize: "16px",
          }}
        >
          <b>{label}</b>
        </span>{" "}
        <RightHeaderContent open={open} />
      </div>
      {
        <div
          style={{
            display: open ? "block" : "none",
            padding: "10px 30px",
            background: "rgb(252, 252, 252)",
            fontSize: "14px",
            paddingBottom: "45px",
          }}
        >
          {children}
        </div>
      }
    </>
  );
};
