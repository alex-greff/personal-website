import { useState, useEffect, useRef } from "react";
import useRouteWatcher, { RouteWatcherMode } from "./useRouteWatcher";

export default function useLocation() {
  const [location, setLocation] = useState<Location>({...window.location});

  useRouteWatcher((newLocation) => {
    setLocation({...newLocation});
  }, RouteWatcherMode.ALL);

  return location;
}