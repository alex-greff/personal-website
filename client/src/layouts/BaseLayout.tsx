// Note: this component should be treated like App

import React, { FunctionComponent, useContext, useEffect } from "react";
import "./BaseLayout.scss";
import { Helmet } from "react-helmet";
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
        <div className="BaseLayout__content">{children}</div>
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
