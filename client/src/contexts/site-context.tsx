import React, { FunctionComponent, useState } from "react";
import * as Utilities from "@/utilities";

export enum LoadStatus {
  LOADING = 0,
  FADING = 1,
  COMPLETED = 2,
}

interface SiteContextState {
  isMobile: boolean;
  mobileDropdownOpen: boolean;
  navWidth: number;
  navHeight: number;
  footerWidth: number;
  footerHeight: number;
  scrollAmount: number;
  osInstance: OverlayScrollbars | null;
  loadStatus: LoadStatus;
  currentWaypoint: string;
  autoScrolling: boolean; // Scrolling from an osInstance.scroll() call
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
  if (Utilities.isSSR) return "home";
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
    loadStatus: LoadStatus.LOADING,
    currentWaypoint: initialWaypoint(),
    autoScrolling: false
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
    loadStatus: LoadStatus.LOADING,
    currentWaypoint: initialWaypoint(),
    autoScrolling: false
  });

  return (
    <SiteContext.Provider value={{siteState, setSiteState}}>
      {children}
    </SiteContext.Provider>
  )
};

export default SiteContext;