import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }, [value, key, setValue, defaultValue]);

  return [value, setValue];
};
