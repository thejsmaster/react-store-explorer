import React from "react";
export const LabelRenderer = ({ label }: any) => {
  return (
    <span>
      {label.endsWith("[M]") ? (
        <span title={"Modified"} style={{ color: "#bc7a00" }}>
          {/* <span
                  style={{ color: "#bc7a00", fontSize: "large", fontWeight: "bold" }}
                >
                  *
                </span>{" "} */}
          {label.substr(0, label.length - 3)}{" "}
        </span>
      ) : label.endsWith("[A]") ? (
        <span title={"Added"} style={{ color: "green" }}>
          {/* <span
                  style={{ color: "green", fontSize: "large", fontWeight: "bold" }}
                >
                  +
                </span> */}
          {label.substr(0, label.length - 3)}{" "}
        </span>
      ) : label.endsWith("[D]") ? (
        <span title={"Deleted"} style={{ color: "#df0000" }}>
          {/* <span style={{ color: "red", fontSize: "large", fontWeight: "bold" }}>
                  -
                </span> */}
          {label.substr(0, label.length - 3)}{" "}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </span>
  );
};
