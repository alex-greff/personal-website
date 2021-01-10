// Note: this component should be treated like App

import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import "./BaseLayout.scss";
import { Helmet } from "react-helmet";
import update from "immutability-helper";
import * as Utilities from "@/utilities";
import useRouteWatcher, { RouteWatcherMode } from "@/hooks/useRouteWatcher";

import { ThemeProvider } from "@/contexts/theme-context";
import SiteContext, { LoadStatus, SiteProvider } from "@/contexts/site-context";

import NavBar from "@/components/nav/NavBar/NavBar";
import FooterSection from "@/sections/FooterSection/FooterSection";
import Loader from "@/components/Loader/Loader";

const BaseLayoutInternal: FunctionComponent = (props) => {
  const { children } = props;
  const { siteState, setSiteState } = useContext(SiteContext);

  // ----------------------------
  // --- Scrollbar Management ---
  // ----------------------------

  // Set scroll position to initial section
  useEffect(() => {
    if (siteState.loadStatus == LoadStatus.LOADING) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [siteState.loadStatus]);

  // React to page changes
  useRouteWatcher((location) => {
    // Disable smooth scrolling so the initial location change is instant
    document.documentElement.classList.add("disable-smooth-scroll");

    setTimeout(() => {
      document.documentElement.classList.remove("disable-smooth-scroll");
    }, 0);
  }, RouteWatcherMode.PATHNAME);

  // -------------------
  // --- Other Stuff ---
  // -------------------

  return (
    <>
      <Loader />
      <div id="BaseLayout">
        <NavBar />
        <div
          className="BaseLayout__content"
          // TODO: remove
          // style={{
          //   marginTop: `${siteState.navHeight}px`,
          // }}
        >
          {children}
        </div>
        <FooterSection />
      </div>
    </>
  );
};

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Helmet>
        <html className="global-theme" />
        {/* TODO: get from data */}
        {/* <title>Alexander Greff</title>  */}
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
