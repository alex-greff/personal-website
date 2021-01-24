import { useState, useMemo, RefObject } from "react";
import useResizeObserver from "use-resize-observer";
import useResizeObserverPolyfill from "use-resize-observer/polyfilled";
import { debounce } from "throttle-debounce";

// Source: https://codesandbox.io/s/8uvsg

export default <T extends HTMLElement>(
  wait: number,
  ref?: RefObject<T> | T | null
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onResize = useMemo(() => debounce(wait, setSize), [wait]);
  if (ref) {
    if (typeof ResizeObserver !== 'undefined')
      useResizeObserver({ onResize: onResize as any, ref });
    else
      useResizeObserverPolyfill({ onResize: onResize as any, ref });
    return { ref: null, ...size };
  } else {
    if (typeof ResizeObserver !== 'undefined') {
      const { ref } = useResizeObserver({ onResize: onResize as any });
      return { ref, ...size };
    } else {
      const { ref } = useResizeObserverPolyfill({ onResize: onResize as any });
      return { ref, ...size };
    }
  }
};