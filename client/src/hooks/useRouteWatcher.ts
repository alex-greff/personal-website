import { useState, useEffect, useRef } from "react";
import { globalHistory } from "@reach/router";

export type RouteChangeCallback = (
  nextLocation: Location,
  prevLocation: Location
) => unknown;

export enum RouteWatcherMode {
  ALL,
  PATHNAME,
  HASH
};

export default function useRouteWatcher(
  cb: RouteChangeCallback,
  mode = RouteWatcherMode.ALL
) {
  const getInitialRouteData = () => {
    return {...window.location};
  };

  const [prevLocation, _setPrevLocation] = useState<Location>(
    getInitialRouteData()
  );

  // A hack to be able to use state in the listener callbacks
  // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const prevLocationRef = useRef(prevLocation);
  const setPrevLocation = (nextLocation: Location) => {
    prevLocationRef.current = nextLocation;
    _setPrevLocation(nextLocation);
  };

  useEffect(() => {
    // A nice hack to find the route change...
    // https://stackoverflow.com/questions/61274365/allow-component-to-detect-route-change-in-gatsby
    return globalHistory.listen(({ action, location }) => {
      if (action === "PUSH") {
        const prevLocation = prevLocationRef.current;

        // TODO: remove
        // console.log("mode", mode);
        // console.log("prevLocation", prevLocation);
        // console.log("currLocation", location);

        const pathnameChange = prevLocation.pathname !== location.pathname;
        const hashChange = prevLocation.hash !== location.hash;
        if (mode === RouteWatcherMode.PATHNAME && pathnameChange)
          cb(location, prevLocation);
        else if (mode === RouteWatcherMode.HASH && hashChange) 
          cb(location, prevLocation);
        else if (mode === RouteWatcherMode.ALL && (pathnameChange || hashChange))
          cb(location, prevLocation);
        
        // if (pathnameChange || (notifyOnHashChange && hashChange)) {
        //   cb(location, prevLocation);
        // }

        setPrevLocation({...location});
      }
    });

  }, [prevLocation]);
}
