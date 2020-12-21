// Note: this component should be treated like App

import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import "./BaseLayout.scss";
import { Helmet } from "react-helmet";
import update from "immutability-helper";
import * as Utilities from "@/utilities";

import { ThemeProvider } from "@/contexts/theme-context";
import NavContext, { NavProvider } from "@/contexts/nav-context";
import { FooterProvider } from "@/contexts/footer-context";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";

import NavBar from "@/components/nav/NavBar/NavBar";
import FooterSection from "@/sections/FooterSection/FooterSection";

const BaseLayoutInternal: FunctionComponent = ({ children }) => {
  const { navState, setNavState } = useContext(NavContext);
  const osRef = useRef<OverlayScrollbarsComponent>(null);

  const onScroll = (args?: UIEvent) => {
    const target = args?.target as HTMLElement;

    setNavState(
      update(navState, {
        scrollAmount: { $set: target.scrollTop },
      })
    );
  };

  const updateOsInstance = () => {
    if (!navState.osInstance) {
      setNavState(
        update(navState, {
          osInstance: { $set: osRef.current?.osInstance()! },
        })
      );
    }
  };

  useEffect(() => {
    updateOsInstance();

    // Set the initial location of the page
    if (window.location.hash) {
      const targetQuery = `#${Utilities.hashToSectionId(window.location.hash)}`;
      const targetEl = document.querySelector(targetQuery) as HTMLElement;
      if (targetEl) {
        // Delay hack because it doesn't work when running instantly
        setTimeout(() => {
          osRef.current?.osInstance()!.scroll({ el: targetEl }, 0);
        }, 10);
      }
    }
  }, []);

  return (
    <OverlayScrollbarsComponent
      className="BaseLayout__overlay-container"
      ref={osRef}
      options={{
        scrollbars: {
          autoHide: "leave",
        },
        callbacks: {
          onScroll: (args) => onScroll(args),
        },
        // Disable scrolling when the navbar mobile dropdown is open
        overflowBehavior: {
          x:
            navState.isMobile && navState.mobileDropdownOpen
              ? "hidden"
              : "scroll",
          y:
            navState.isMobile && navState.mobileDropdownOpen
              ? "hidden"
              : "scroll",
        },
      }}
    >
      <div id="BaseLayout">
        <NavBar />
        <div
          className="BaseLayout__content"
          style={{
            marginTop: `${navState.height}px`,
          }}
        >
          {children}
        </div>
        <FooterSection />
      </div>
    </OverlayScrollbarsComponent>
  );
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
