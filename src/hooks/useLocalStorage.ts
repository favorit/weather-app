import { useEffect, useState } from "react";

const useLocalStorage = <StateType = any>(
  storageKey: string,
  fallbackState: StateType
) => {
  const item = localStorage.getItem(storageKey);
  const [value, setValue] = useState(item ? JSON.parse(item) : fallbackState);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
