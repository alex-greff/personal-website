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

  // ----------------------------
  // --- Scrollbar Management ---
  // ----------------------------

  // Set scroll position to initial section
  useEffect(() => {
    if (siteState.loadStatus >= LoadStatus.FADING) {
      const pageType = Utilities.getPageType(window.location.pathname);

      // Set the initial location of the page
      if (pageType === Utilities.PageType.ROOT) {
        const targetQuery = `#${Utilities.hashToSectionId(
          window.location.hash
        )}`;
        const targetEl = document.querySelector(targetQuery) as HTMLElement;
        if (targetEl) {
          osRef.current?.osInstance()!.scroll({ el: targetEl }, 0);
        }
      }
    }
  }, [siteState.loadStatus]);

  // React to page changes
  useRouteWatcher((location) => {
    const pageType = Utilities.getPageType(location.pathname);

    if (pageType === Utilities.PageType.ROOT) {
      // Delay hack because it doesn't work when running instantly
      setTimeout(() => {
        const targetQuery = `#${Utilities.hashToSectionId(location.hash)}`;
        const targetEl = document.querySelector(targetQuery) as HTMLElement;
        if (targetEl) {
          osRef.current?.osInstance()!.scroll({ el: targetEl }, 0);
        }
      }, 10);
    } else if (pageType === Utilities.PageType.PROJECT) {
      // Scroll to top
      osRef.current?.osInstance()?.scroll({ y: 0 });
    }
  }, RouteWatcherMode.PATHNAME);

  // React to hash changes
  useRouteWatcher((location) => {
    const pageType = Utilities.getPageType(window.location.pathname);

    if (pageType === Utilities.PageType.ROOT) {
      const targetQuery = `#${Utilities.hashToSectionId(location.hash)}`;
      const targetEl = document.querySelector(targetQuery)! as HTMLElement;

      if (targetEl) {
        const osInstance = osRef.current?.osInstance();

        // Set autoscrolling
        setSiteState((prevState) =>
          update(prevState, { autoScrolling: { $set: true } })
        );

        // Cancel any already running scrolls and start the new one
        osInstance?.scrollStop();
        osInstance?.scroll({ el: targetEl }, 500, "easeOutQuad", () => {
          window.location.hash = location.hash;

          // Unset autoscrolling
          setSiteState((prevState) =>
            update(prevState, { autoScrolling: { $set: false } })
          );
        });
      }
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
