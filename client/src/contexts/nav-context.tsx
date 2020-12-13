import React, { FunctionComponent, useEffect, useState } from "react";
import * as Utilities from "@/utilities";

export type NavbarDisplay = "flush" | "outset";

interface NavContextValue {
  isMobile: boolean;
  height: number;
  display: NavbarDisplay;
  setHeight: (newHeight: number) => void;
  setIsMobile: (newIsMobile: boolean) => void;
  setDisplay: (newState: NavbarDisplay) => void;
}

const NavContext = React.createContext<NavContextValue>({
  isMobile: false,
  height: 0,
  display: "flush",
  setHeight: () => {},
  setIsMobile: () => {},
  setDisplay: () => {}
});

function documentIsMobile() {
  const width = document.body.offsetWidth;
  return Utilities.getBreakpoint(width) == Utilities.Breakpoint.phone;
}

export const NavProvider: FunctionComponent = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(documentIsMobile());
  // TODO: get the height of the nav element
  const [height, setHeight] = useState<number>(0);
  const [display, setDisplay] = useState<NavbarDisplay>("flush");

  return (
    <NavContext.Provider 
      value={{
        isMobile,
        height,
        display,
        setHeight,
        setIsMobile,
        setDisplay
      }}
    >
      {children}
    </NavContext.Provider>
  )
};