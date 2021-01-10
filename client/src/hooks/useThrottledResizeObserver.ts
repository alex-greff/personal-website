import { useState, useMemo, RefObject } from "react";
import useResizeObserver from "use-resize-observer";
import { throttle } from "throttle-debounce";
import * as Utilities from "@/utilities";

// Source: https://codesandbox.io/s/8uvsg

export default <T extends HTMLElement>(
  wait: number,
  ref?: RefObject<T> | T | null
) => {
  if (Utilities.isSSR) 
    return {} as any;

  const [size, setSize] = useState({ width: 0, height: 0 });
  const onResize = useMemo(() => throttle(wait, setSize), [wait]);
  if (ref) {
    useResizeObserver({ onResize: onResize as any, ref });
    return { ref: null, ...size };
  } else {
    const { ref } = useResizeObserver({ onResize: onResize as any });
    return { ref, ...size };
  }
};
