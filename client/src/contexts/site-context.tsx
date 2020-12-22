import React, { FunctionComponent, useState } from "react";
import * as Utilities from "@/utilities";

interface SiteContextState {
  isMobile: boolean;
  mobileDropdownOpen: boolean;
  navWidth: number;
  navHeight: number;
  footerWidth: number;
  footerHeight: number;
  scrollAmount: number;
  osInstance: OverlayScrollbars | null;
  loadCompleted: boolean;
  currentWaypoint: string;
}

interface SiteContextValue {
  siteState: SiteContextState;
  setSiteState: (prevState: React.SetStateAction<SiteContextState>) => void;
}

function documentIsMobile() {
  const width = (typeof document !== "undefined") ? document.body.offsetWidth : 0;
  return Utilities.getBreakpoint(width) == Utilities.Breakpoint.phone;
}

function initialWaypoint() {
  return (window.location.hash) ? window.location.hash.replace("#", "") : "home";
}

const SiteContext = React.createContext<SiteContextValue>({
  siteState: {
    isMobile: documentIsMobile(),
    mobileDropdownOpen: false,
    navWidth: 0,
    navHeight: 0,
    footerWidth: 0,
    footerHeight: 0,
    scrollAmount: 0,
    osInstance: null,
    loadCompleted: false,
    currentWaypoint: initialWaypoint()
  },
  setSiteState: () => {}
});

export const SiteProvider: FunctionComponent = ({ children }) => {
  const [siteState, setSiteState] = useState<SiteContextState>({
    isMobile: documentIsMobile(),
    mobileDropdownOpen: false,
    navWidth: 0,
    navHeight: 0,
    footerWidth: 0,
    footerHeight: 0,
    scrollAmount: 0,
    osInstance: null,
    loadCompleted: false,
    currentWaypoint: initialWaypoint()
  });

  return (
    <SiteContext.Provider value={{siteState, setSiteState}}>
      {children}
    </SiteContext.Provider>
  )
};

export default SiteContext;