import { useEffect, useState } from "react";

export const useStoreExplorer = (getSetInstance: any, maxLogCount: number) => {
  const [state, setState] = useState(getSetInstance.getState());
  const [changes, setChanges] = useState<any>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const fn = (changesList: any) => {
      setState(getSetInstance.getState());
      setChanges((changes: any) =>
        [
          ...changesList.map((item: any) => ({
            ...item,
            index: index + 1,
          })),
          ...changes,
        ].slice(0, maxLogCount)
      );
      setIndex(index + 1);
    };
    return getSetInstance.subscribe(fn, "store-explorer");
  }, [state, setState, changes, setChanges]);
  return { state, changes, setChanges, index, setIndex };
};
