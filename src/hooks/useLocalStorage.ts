import { useCallback, useState, useEffect } from "react";

export function useLocalStorage<T extends string>(
  key: string,
  defaultValue: T,
) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    try {
      const savedValue = localStorage.getItem(key);
      setValue((savedValue as T) || defaultValue);
    } catch {
      setValue(defaultValue);
    }
  }, []);

  const setStoredValue = useCallback(
    (val: T) => {
      setValue(val);
      try {
        localStorage.setItem(key, val);
      } catch (err) {
        console.error(err);
      }
    },
    [key],
  );

  return [value, setStoredValue] as const;
}
