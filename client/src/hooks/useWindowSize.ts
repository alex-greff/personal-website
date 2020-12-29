import { useState, useEffect, useMemo } from "react";
import { throttle } from "throttle-debounce";

// Source: https://usehooks.com/useWindowSize/

interface WindowSizeSate {
  width?: number;
  height?: number;
}

// TODO: using throttleWait seems to break it for some reason
export default function useWindowSize(throttleWait = 500) {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<WindowSizeSate>({
    width: undefined,
    height: undefined,
  });

  const setWindowSizeTrottled = useMemo(() => throttle(500, setWindowSize), []);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSizeTrottled({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowSizeTrottled]); 

  return windowSize;
}
