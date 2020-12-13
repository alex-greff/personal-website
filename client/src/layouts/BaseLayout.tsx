import React, { FunctionComponent } from "react";
import "./BaseLayout.scss";
import { ThemeProvider } from "@/contexts/theme-context";
import { NavProvider } from "@/contexts/nav-context";
import { Helmet } from "react-helmet";

import FooterSection from "@/sections/FooterSection/FooterSection";

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Helmet>
        <body className="global-theme" />
      </Helmet>
      <ThemeProvider>
        <NavProvider>
          {/* TODO: add navbar component here */}
          <div id="BaseLayout">
            {children}
          </div>
          <FooterSection />
        </NavProvider>
      </ThemeProvider>
    </>
  );
};

export default BaseLayout;