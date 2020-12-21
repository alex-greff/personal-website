import React, { FunctionComponent, useState } from "react";
import * as Utilities from "@/utilities";

interface NavContextState {
  isMobile: boolean;
  mobileDropdownOpen: boolean;
  width: number;
  height: number;
  scrollAmount: number;
  osInstance: OverlayScrollbars | null;
}

interface NavContextValue {
  navState: NavContextState;
  setNavState: (newState: NavContextState) => void;
}

function documentIsMobile() {
  const width = (typeof document !== "undefined") ? document.body.offsetWidth : 0;
  return Utilities.getBreakpoint(width) == Utilities.Breakpoint.phone;
}

const NavContext = React.createContext<NavContextValue>({
  navState: {
    isMobile: documentIsMobile(),
    mobileDropdownOpen: false,
    width: 0,
    height: 0,
    scrollAmount: 0,
    osInstance: null
  },
  setNavState: () => {}
});

export const NavProvider: FunctionComponent = ({ children }) => {
  const [navState, setNavState] = useState<NavContextState>({
    isMobile: documentIsMobile(),
    mobileDropdownOpen: false,
    width: 0,
    height: 0,
    scrollAmount: 0,
    osInstance: null
  });

  return (
    <NavContext.Provider value={{navState, setNavState}}>
      {children}
    </NavContext.Provider>
  )
};

export default NavContext;