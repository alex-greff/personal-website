import { useState, useMemo } from "react";
import useResizeObserver, { } from "use-resize-observer";
import { throttle } from "throttle-debounce";

// Source: https://codesandbox.io/s/8uvsg

export default (wait: number) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onResize = useMemo(() => throttle(wait, setSize), [wait]);
  const { ref } = useResizeObserver({ onResize: onResize as any });

  return { ref, ...size };
};