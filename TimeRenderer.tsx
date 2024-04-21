import React, { useEffect, useState } from "react";
import { Timer } from "./utils";

export function TimeRenderer({ time }: any) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const clear = setInterval(() => {
      setCount(count + 1);
    }, 10000);
    return () => {
      clearInterval(clear);
    };
  }, [count]);
  return <span>{Timer(time)}</span>;
}
