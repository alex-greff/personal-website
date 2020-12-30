import useWindowSize from "./useWindowSize";
import * as Utilities from "@/utilities";

/* A hook that gives the current breakpoint of the window. */
export function useBreakpoint(throttleWait = 500) {
  const windowSize = useWindowSize(throttleWait);
  return Utilities.getBreakpoint(windowSize.width!);
}