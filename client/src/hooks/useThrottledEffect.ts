import { useEffect, useRef } from "react";

// Source: https://github.com/samanmohamadi/use-throttled-effect/blob/master/src/index.js

export const useThrottledEffect = (
  callback: () => unknown,
  delay: number,
  deps: any[] = []
) => {
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(function () {
      if (Date.now() - lastRan.current >= delay) {
        callback();
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
};

export default useThrottledEffect;
