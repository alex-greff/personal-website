import React, { FunctionComponent, useState } from "react";
import * as Utilities from "@/utilities";

interface NavContextState {
  isMobile: boolean;
  mobileDropdownOpen: boolean;
  width: number;
  height: number;
  scrollAmount: number;
}

interface NavContextValue {
  navState: NavContextState;
  setNavState: (newState: NavContextState) => void;
}

function documentIsMobile() {
  const width = document.body.offsetWidth;
  return Utilities.getBreakpoint(width) == Utilities.Breakpoint.phone;
}

const NavContext = React.createContext<NavContextValue>({
  navState: {
    isMobile: documentIsMobile(),
    mobileDropdownOpen: false,
    width: 0,
    height: 0,
    scrollAmount: 0
  },
  setNavState: () => {}
});

export const NavProvider: FunctionComponent = ({ children }) => {
  const [navState, setNavState] = useState<NavContextState>({
    isMobile: documentIsMobile(),
    mobileDropdownOpen: false,
    width: 0,
    height: 0,
    scrollAmount: 0
  });

  return (
    <NavContext.Provider value={{navState, setNavState}}>
      {children}
    </NavContext.Provider>
  )
};

export default NavContext;