// Note: this component should be treated like App

import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./BaseLayout.scss";
import { Helmet } from "react-helmet";
import update from "immutability-helper";
import * as Utilities from "@/utilities";

import { ThemeProvider } from "@/contexts/theme-context";
import SiteContext, { LoadStatus, SiteProvider } from "@/contexts/site-context";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";

import NavBar from "@/components/nav/NavBar/NavBar";
import FooterSection from "@/sections/FooterSection/FooterSection";
import Loader from "@/components/Loader/Loader";

const BaseLayoutInternal: FunctionComponent = ({ children }) => {
  const { siteState, setSiteState } = useContext(SiteContext);
  const osRef = useRef<OverlayScrollbarsComponent>(null);

  const onScroll = (args?: UIEvent) => {
    const target = args?.target as HTMLElement;

    setSiteState((prevState) =>
      update(prevState, {
        scrollAmount: { $set: target.scrollTop },
      })
    );
  };

  const updateOsInstance = () => {
    if (!siteState.osInstance) {
      setSiteState((prevState) =>
        update(prevState, {
          osInstance: { $set: osRef.current?.osInstance()! },
        })
      );
    }
  };

  useEffect(() => {
    updateOsInstance();

    // TODO: remove
    // // Set the initial location of the page
    // if (window.location.hash) {
    //   const targetQuery = `#${Utilities.hashToSectionId(window.location.hash)}`;
    //   const targetEl = document.querySelector(targetQuery) as HTMLElement;
    //   if (targetEl) {
    //     // Delay hack because it doesn't work when running instantly
    //     setTimeout(() => {
    //       osRef.current?.osInstance()!.scroll({ el: targetEl }, 0);
    //     }, 50);
    //   }
    // }
  }, []);

  useEffect(() => {
    if (siteState.loadStatus >= LoadStatus.FADING) {
      // Set the initial location of the page
      if (window.location.hash) {
        const targetQuery = `#${Utilities.hashToSectionId(window.location.hash)}`;
        const targetEl = document.querySelector(targetQuery) as HTMLElement;
        if (targetEl) {
          osRef.current?.osInstance()!.scroll({ el: targetEl }, 0);
          // Delay hack because it doesn't work when running instantly
          // setTimeout(() => {
          //   osRef.current?.osInstance()!.scroll({ el: targetEl }, 0);
          // }, 50);
        }
      }
    }
  }, [siteState.loadStatus])

  return (
    <>
      <Loader />
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
              siteState.isMobile && siteState.mobileDropdownOpen
                ? "hidden"
                : "scroll",
            y:
              siteState.isMobile && siteState.mobileDropdownOpen
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
              marginTop: `${siteState.navHeight}px`,
            }}
          >
            {/* TODO: remove */}
            {/* {(siteState.loadStatus >= LoadStatus.FADING) ? (children) : null} */}
            {children}
          </div>
          <FooterSection />
        </div>
      </OverlayScrollbarsComponent>
    </>
  );
};

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Helmet>
        <body className="global-theme" />
      </Helmet>
      <ThemeProvider>
        <SiteProvider>
          <BaseLayoutInternal>{children}</BaseLayoutInternal>
        </SiteProvider>
      </ThemeProvider>
    </>
  );
};

export default BaseLayout;
