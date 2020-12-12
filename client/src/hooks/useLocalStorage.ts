// Source: https://github.com/infoxicator/use-theme-switcher/blob/master/src/use-local-storage.js

/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { useState } from "react";

export default function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item =
        typeof window !== "undefined"
          ? window.localStorage.getItem(key)
          : undefined;

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: string | Function) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      typeof window !== "undefined" &&
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {}
  };

  return [storedValue, setValue];
}
