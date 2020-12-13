import React, { FunctionComponent, useState } from "react";
import * as Utilities from "@/utilities";

interface NavContextState {
  isMobile: boolean;
  width: number;
  height: number;
  scrollAmount: number;
}

interface NavContextValue {
  navState: NavContextState;
  setNavState: (newState: NavContextState) => void;
}

const NavContext = React.createContext<NavContextValue>({
  navState: {
    isMobile: false,
    width: 0,
    height: 0,
    scrollAmount: 0
  },
  setNavState: () => {}
});

function documentIsMobile() {
  const width = document.body.offsetWidth;
  return Utilities.getBreakpoint(width) == Utilities.Breakpoint.phone;
}

export const NavProvider: FunctionComponent = ({ children }) => {
  const [navState, setNavState] = useState<NavContextState>({
    isMobile: documentIsMobile(),
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