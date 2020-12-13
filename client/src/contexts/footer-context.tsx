import React, { FunctionComponent, useState } from "react";

interface FooterContextState {
  width: number; 
  height: number;
}

interface FooterContextValue {
  footerState: FooterContextState;
  setFooterState: (newState: FooterContextState) => void;
}

const FooterContext = React.createContext<FooterContextValue>({
  footerState: {
    width: 0,
    height: 0
  },
  setFooterState: () => {}
});

export const FooterProvider: FunctionComponent = ({ children }) => { 
  const [footerState, setFooterState] = useState<FooterContextState>({
    width: 0,
    height: 0
  });

  return (
    <FooterContext.Provider value={{ footerState, setFooterState }}>
      {children}
    </FooterContext.Provider>
  );
};

export default FooterContext;