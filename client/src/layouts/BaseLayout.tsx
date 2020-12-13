// Note: this component should be treated like App

import React, { FunctionComponent, useContext } from "react";
import "./BaseLayout.scss";
import { Helmet } from "react-helmet";
import update from "immutability-helper";

import { ThemeProvider } from "@/contexts/theme-context";
import NavContext, { NavProvider } from "@/contexts/nav-context";
import { FooterProvider } from "@/contexts/footer-context";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";

import NavBar from "@/components/nav/NavBar/NavBar";
import FooterSection from "@/sections/FooterSection/FooterSection";

const BaseLayoutInternal: FunctionComponent =  ({ children }) => {
  const { navState, setNavState } = useContext(NavContext);

  const onScroll = (args?: UIEvent) => {
    const target = args?.target as HTMLElement;

    setNavState(update(navState, {
      scrollAmount: { $set: target.scrollTop }
    }));
  };

  return (
    <OverlayScrollbarsComponent
      className="BaseLayout__overlay-container"
      options={{
        scrollbars: {
          autoHide: "leave",
        },
        callbacks: {
          onScroll: (args) => onScroll(args),
        },
      }}
    >
      <div id="BaseLayout">
        <NavBar />
        <div className="BaseLayout__content">
          {children}
        </div>
        <FooterSection />
      </div>
    </OverlayScrollbarsComponent>
  )
};

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Helmet>
        <body className="global-theme" />
      </Helmet>
      <ThemeProvider>
        <NavProvider>
          <FooterProvider>
            <BaseLayoutInternal>{children}</BaseLayoutInternal>
          </FooterProvider>
        </NavProvider>
      </ThemeProvider>
    </>
  );
};

export default BaseLayout;