import { useState, useEffect } from "react";
import { globalHistory } from "@reach/router";

export type RouteChangeCallback = (
  nextLocation: Location,
  prevLocation: Location
) => unknown;

export default function useRouteWatcher(
  cb: RouteChangeCallback,
  notifyOnHashChange = false
) {
  const getInitialRouteData = () => {
    return {...window.location};
  };

  const [prevLocation, setPrevLocation] = useState<Location>(
    getInitialRouteData()
  );

  useEffect(() => {
    // A nice hack to find the route change...
    // https://stackoverflow.com/questions/61274365/allow-component-to-detect-route-change-in-gatsby
    return globalHistory.listen(({ action, location }) => {
      if (action === "PUSH") {
        const pathnameChange = prevLocation.pathname !== location.pathname;
        const hashChange = prevLocation.hash !== location.hash;
        if (pathnameChange || (notifyOnHashChange && hashChange)) {
          cb(location, prevLocation);
          setPrevLocation({...location});
        }
      }
    });

  }, []);
}
