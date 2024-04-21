import { useEffect, useState } from "react";

export const useStore = (getSetInstance: any, maxLogCount: number) => {
  const [state, setState] = useState(getSetInstance.get());
  const [changes, setChanges] = useState<any>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const fn = (changesList: any) => {
      setState(getSetInstance.get());
      let newIndex = index + changesList.length;
      console.log("changelist", changesList);
      const newChanges = [
        ...changesList.map((item: any) => ({
          ...item,
          index: newIndex--,
        })),
        ...changes,
      ].slice(0, maxLogCount);
      console.log("new", newChanges);
      setChanges(newChanges);
      setIndex(index + changesList.length);
    };
    getSetInstance.subscribe(fn);
    return () => {
      getSetInstance.unsubscribe(fn);
    };
  }, [state, setState, changes, setChanges]);
  console.log("changes", changes);
  return { state, changes, setChanges, index, setIndex };
};
