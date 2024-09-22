import { useEffect, useState } from "react";

export const useStoreExplorer = (
  from,
  getSetInstance: any,
  maxLogCount: number
) => {
  const [state, setState] = useState(getSetInstance.getState());
  const [previousStates, setPreviousStates] = useState<any[]>([]);
  const [changes, setChanges] = useState<any>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const fn = (changesList: any = []) => {
      state !== getSetInstance.getState() &&
        setPreviousStates((prev) => [state, ...prev].slice(0, 10));
      setState(getSetInstance.getState());
      from === "get-set-react" &&
      changesList &&
      Array.isArray(changesList) &&
      changesList.length > 0
        ? setChanges((changes: any) =>
            [
              ...changesList.map((item: any) => ({
                ...item,
                index: index + 1,
              })),
              ...changes,
            ].slice(0, maxLogCount)
          )
        : setChanges((changes: any) =>
            [
              ...compareObjects(state, getSetInstance.getState()).map(
                (item: any) => ({
                  ...item,
                  index: index + 1,
                })
              ),
              ...changes,
            ].slice(0, maxLogCount)
          );
      setIndex(index + 1);
    };
    return getSetInstance.subscribe(fn, "store-explorer");
  }, [state, setState, changes, setChanges]);
  return { state, previousStates, changes, setChanges, index, setIndex };
};

export interface Change {
  path: string;
  type: "add" | "update" | "delete";
  value?: any;
  functionName?: string;
  fileName?: string;
  id: string;
  from: "react" | "update" | "set";
}

function createChange(
  path: string,
  type: "add" | "update" | "delete",
  value?: any
): Change {
  return {
    path,
    type,
    value,
    id: Math.random().toString(),
    functionName: "",
    fileName: "",
    from: "set",
  };
}

function compareObjects(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Change[] {
  const changes: Change[] = [];

  // Handle updates and deletions
  Object.keys(obj1).forEach((key) => {
    if (!(key in obj2)) {
      changes.push(createChange(key, "delete"));
    } else if (obj1[key] !== obj2[key]) {
      changes.push(createChange(key, "update", obj2[key]));
    }
  });

  // Handle additions
  Object.keys(obj2).forEach((key) => {
    if (!(key in obj1)) {
      changes.push(createChange(key, "add", obj2[key]));
    }
  });

  return changes;
}
