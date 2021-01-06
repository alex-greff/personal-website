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

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";

import NavBar from "@/components/nav/NavBar/NavBar";
import FooterSection from "@/sections/FooterSection/FooterSection";
import Loader from "@/components/Loader/Loader";

const BaseLayoutInternal: FunctionComponent = (props) => {
  const { children } = props;
  const { siteState, setSiteState } = useContext(SiteContext);
  const osRef = useRef<OverlayScrollbarsComponent>(null);
  const [autoscrollTimer, setAutoscrollTimer] = useState<number | null>(null);

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
    const pageType = Utilities.getPageType(location.pathname);

    if (pageType === Utilities.PageType.ROOT) {
      // Disable smooth scrolling so the initial location change is instant
      document.documentElement.classList.add("disable-smooth-scroll");

      setTimeout(() => {
        document.documentElement.classList.remove("disable-smooth-scroll");
      }, 0);

    } else if (pageType === Utilities.PageType.PROJECT) {

    }
  }, RouteWatcherMode.PATHNAME);

  // React to hash changes
  useRouteWatcher((location) => {
    const pageType = Utilities.getPageType(window.location.pathname);

    if (pageType === Utilities.PageType.ROOT) {
      if (autoscrollTimer)
        clearTimeout(autoscrollTimer);

      // Set autoscrolling
      setSiteState((prevState) =>
        update(prevState, { autoScrolling: { $set: true } })
      );

      const newTimer = setTimeout(() => {
        // Unset autoscrolling
        setSiteState((prevState) =>
          update(prevState, { autoScrolling: { $set: false } })
        );
      }, 1000);

      setAutoscrollTimer(newTimer);
    }
  }, RouteWatcherMode.HASH);

  // -------------------
  // --- Other Stuff ---
  // -------------------

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
  }, []);

  return (
    <>
      <Loader />
      <div id="BaseLayout">
        <NavBar />
        <div
          className="BaseLayout__content"
          style={{
            marginTop: `${siteState.navHeight}px`,
          }}
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
