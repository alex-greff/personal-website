import { useState } from "react";
import useRouteWatcher, { RouteWatcherMode } from "./useRouteWatcher";
import * as Utilities from "@/utilities";

export default function useLocation() {
  const [location, setLocation] = useState<Location>(
    !Utilities.isSSR ? { ...window.location } : {} as any
  );

  useRouteWatcher((newLocation) => {
    setLocation({ ...newLocation });
  }, RouteWatcherMode.ALL);

  return location;
}
