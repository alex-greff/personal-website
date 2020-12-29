import { useEffect, useRef } from "react";

// Source: https://github.com/samanmohamadi/use-debounced-effect/blob/master/src/index.js

export function useDebouncedEffect(
  callback: () => unknown,
  delay: number,
  deps: any[] = []
) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
}

export default useDebouncedEffect;
