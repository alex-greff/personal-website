import { useState, useEffect, useMemo } from "react";
import { throttle } from "throttle-debounce";
import * as Utilities from "@/utilities";

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
        width: !Utilities.isSSR ? window.innerWidth : 0,
        height: !Utilities.isSSR ? window.innerHeight : 0,
      })
    }

    // Add event listener
    if (!Utilities.isSSR)
      window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      if (!Utilities.isSSR)
        window.removeEventListener("resize", handleResize);
    }
  }, [setWindowSizeTrottled]); 

  return windowSize;
}
