import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useMemo,
  useState,
  useRef,
} from "react";
import { BaseProps } from "@/types";
import "./NavBar.scss";
import SiteContext from "@/contexts/site-context";
import update from "immutability-helper";
import classnames from "classnames";
import * as Utilities from "@/utilities";
import useThrottledResizeObserver from "@/hooks/useThrottledResizeObserver";

import SelectableList, {
  SelectionItem,
} from "@/components/ui/lists/SelectableList/SelectableList";
import HamburgerMenu from "@/components/ui/icons/HamburgerMenu/HamburgerMenu";
import ThemeToggle from "@/components/ui/toggles/ThemeToggle/ThemeToggle";
import ResumeButton from "@/components/ui/buttons/ResumeButton/ResumeButton";
import useLocation from "@/hooks/useLocation";
import useRouteWatcher, { RouteWatcherMode } from "@/hooks/useRouteWatcher";
import useScrollPosition from "@/hooks/useScrollPosition";

const FLUSH_THRESHOLD = 0;

type NavState = "nav-state-flush-root" | "nav-state-flush" | "nav-state-outset";

const ITEMS: SelectionItem[] = [
  { id: "home", display: "Home", href: "/#home" },
  { id: "about", display: "About", href: "/#about" },
  {
    id: "experience",
    display: "Experience",
    href: "/#experience",
    disabled: false,
  },
  { id: "projects", display: "Projects", href: "/#projects" },
];

const RESIZE_THROTTLE = 100;

interface Props extends Omit<BaseProps, "id"> {}

const getStateClass = (
  scrollAmount: number,
  mobileDropdownOpen: boolean,
  pathname: string
): NavState => {
  const isFlush = scrollAmount <= FLUSH_THRESHOLD;
  const isRootPath = pathname === "/";

  if (mobileDropdownOpen) return "nav-state-outset";

  if (isFlush) return isRootPath ? "nav-state-flush-root" : "nav-state-flush";

  return "nav-state-outset";
};

const NavBar: FunctionComponent<Props> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    height: contentHeight,
    width: contentWidth,
  } = useThrottledResizeObserver(RESIZE_THROTTLE, contentRef);

  const { siteState, setSiteState } = useContext(SiteContext);
  const currLocation = useLocation();
  const scrollTop = useScrollPosition();

  const [autoscrollTimer, setAutoscrollTimer] = useState<number | null>(null);

  const stateClass = useMemo(
    () =>
      getStateClass(
        scrollTop,
        siteState.mobileDropdownOpen,
        currLocation.pathname
      ),
    [scrollTop, siteState.mobileDropdownOpen, currLocation.pathname]
  );

  const findSectionIdx = (section: string) => {
    // Handle if we are on the projects page
    const pathname = !Utilities.isSSR ? window.location.pathname : "";
    if (Utilities.getPageType(pathname) === Utilities.PageType.PROJECT) {
      section = "projects";
    }
    const sectionIdx = ITEMS.findIndex(
      (item) => item.href?.replace("/", "") === `#${section}`
    );
    return sectionIdx;
  };

  const findInitSectionIdx = () => {
    const section = !Utilities.isSSR
      ? window.location.hash.replace("#", "")
      : "";
    const idx = findSectionIdx(section);
    return idx;
  };

  const [currSectionIdx, setCurrSectionIdx] = useState<number>(
    findInitSectionIdx()
  );

  const toggleMobileDropdown = () => {
    setSiteState((prevState) =>
      update(prevState, {
        mobileDropdownOpen: { $set: !siteState.mobileDropdownOpen },
      })
    );
  };

  const setAutoScrolling = () => {
    const page = !Utilities.isSSR ? window.location.pathname : "";
    const pageType = Utilities.getPageType(page);

    if (pageType === Utilities.PageType.ROOT) {
      if (autoscrollTimer) clearTimeout(autoscrollTimer);

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
  };

  const handleNavItemClick = (mobile = false) => {
    return (item: SelectionItem, idx: number) => {
      if (mobile) {
        toggleMobileDropdown();
      }
      setCurrSectionIdx(idx);

      setAutoScrolling();
    };
  };

  // Note: we use offsetWidth and offsetHeight instead of contentWidth
  // contentHeight b/c it gives the wrong value that doesn't account for the
  // padding
  // TODO: I should fix this
  useEffect(() => {
    const isMobile =
      Utilities.getBreakpoint(contentWidth!) <= Utilities.Breakpoint.phone;
    setSiteState((prevState) =>
      update(prevState, {
        isMobile: { $set: isMobile },
        navWidth: { $set: contentRef.current!.offsetWidth },
        navHeight: { $set: contentRef.current!.offsetHeight },
      })
    );
  }, [contentWidth, contentHeight]);

  // Update the section index based off the current waypoint
  useEffect(() => {
    // Do no update current section idx if an autoscrolling operation is running
    // (since it already set the section index)
    const currPage = Utilities.getPageType(
      !Utilities.isSSR ? location.pathname : ""
    );
    if (!siteState.autoScrolling && currPage === Utilities.PageType.ROOT) {
      const sectionIdx = findSectionIdx(siteState.currentWaypoint);
      if (sectionIdx !== currSectionIdx) setCurrSectionIdx(sectionIdx);
    }
  }, [siteState.currentWaypoint]);

  // Update the section index based off the current page
  useRouteWatcher((location) => {
    const sectionIdx = findSectionIdx(location.hash.replace("#", ""));
    if (sectionIdx !== currSectionIdx) setCurrSectionIdx(sectionIdx);
  }, RouteWatcherMode.PATHNAME);

  return (
    <nav
      id="NavBar"
      className={classnames(props.className, stateClass, {
        mobile: siteState.isMobile,
      })}
      style={props.style}
    >
      <div className="NavBar__content" ref={contentRef}>
        {!siteState.isMobile ? (
          // Render regular navbar
          <>
            <div className="NavBar__nav-items">
              <SelectableList
                items={ITEMS}
                selectedIdx={currSectionIdx}
                onClick={handleNavItemClick(false)}
                useLink={true}
              />
            </div>
            <div className="NavBar__additional-items">
              <ThemeToggle className="NavBar__theme-toggle" />

              <ResumeButton className="NavBar__resume-button">
                Resume
              </ResumeButton>
            </div>
          </>
        ) : (
          // Render condensed mobile navbar
          <div className="NavBar__additional-items">
            <ThemeToggle className="NavBar__theme-toggle" />
            <HamburgerMenu
              open={siteState.mobileDropdownOpen}
              onClick={toggleMobileDropdown}
            />
          </div>
        )}
      </div>

      {siteState.isMobile ? (
        // Render mobile dropdown menu
        <div
          className={classnames("NavBar__dropdown-mobile", {
            open: siteState.mobileDropdownOpen,
          })}
          style={{
            height: `calc(100vh - ${siteState.navHeight}px)`,
          }}
        >
          <div className="NavBar__dropdown-content">
            <SelectableList
              className="NavBar__dropdown-items"
              items={ITEMS}
              selectedIdx={currSectionIdx}
              onClick={handleNavItemClick(true)}
              orientation="vertical"
            />
            <ResumeButton className="NavBar__resume-button">
              Resume
            </ResumeButton>
          </div>
          <div
            className="NavBar__dropdown-blur"
            onClick={toggleMobileDropdown}
          ></div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
