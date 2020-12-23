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
import { navigate } from "gatsby";

import SelectableList, {
  SelectionItem,
} from "@/components/ui/lists/SelectableList/SelectableList";
import HamburgerMenu from "@/components/ui/icons/HamburgerMenu/HamburgerMenu";
import ThemeToggle from "@/components/ui/toggles/ThemeToggle/ThemeToggle";
import ResumeButton from "@/components/ui/buttons/ResumeButton/ResumeButton";

const FLUSH_THRESHOLD = 0;

type NavState = "nav-state-flush" | "nav-state-outset";

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

const RESIZE_TROTTLE = 100;

interface Props extends Omit<BaseProps, "id"> {}

const getStateClass = (
  scrollAmount: number,
  mobileDropdownOpen: boolean
): NavState => {
  const isFlush = scrollAmount <= FLUSH_THRESHOLD;

  if (mobileDropdownOpen) return "nav-state-outset";

  return isFlush ? "nav-state-flush" : "nav-state-outset";
};

const NavBar: FunctionComponent<Props> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    height: contentHeight,
    width: contentWidth,
  } = useThrottledResizeObserver(RESIZE_TROTTLE, contentRef);
  const { siteState, setSiteState } = useContext(SiteContext);
  const stateClass = useMemo(
    () => getStateClass(siteState.scrollAmount, siteState.mobileDropdownOpen),
    [siteState.scrollAmount, siteState.mobileDropdownOpen]
  );

  const findInitSectionIdx = () => {
    const projectRegex = /^\/projects\/(.+)\/?$/g;
    let hash = window.location.hash;

    // if (projectRegex.test(window.location.pathname)) {
    //   console.log("Here");
    //   hash = "#projects";
    // }

    let sectionIdx = 0;
    if (hash)
      sectionIdx = Math.max(
        0,
        ITEMS.findIndex((item) => item.href?.replace("/", "") === hash)
      );

    // console.log("sectionIdx", sectionIdx); // TODO: remove
    return sectionIdx;
  };

  const findSectionIdx = (section: string) => {
    const sectionIdx = Math.max(
      0,
      ITEMS.findIndex((item) => item.href?.replace("/", "") === `#${section}`)
    );
    return sectionIdx;
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

  const handleNavItemClick = (mobile = false) => {
    return (item: SelectionItem, idx: number) => {
      if (mobile) {
        toggleMobileDropdown();
      }

      const targetQuery = `#${Utilities.hashToSectionId(item.href!)}`;

      if (window.location.pathname === '/') {
        const targetEl = document.querySelector(targetQuery)! as HTMLElement;
        if (targetEl) {
          // Set autoscrolling
          setSiteState((prevState) =>
            update(prevState, { autoScrolling: { $set: true } })
          );

          // Cancel any already running scrolls and start the new one
          siteState.osInstance?.scrollStop();
          siteState.osInstance?.scroll(
            { el: targetEl },
            500,
            "easeOutQuad",
            () => {
              // Unset autoscrolling
              setSiteState((prevState) =>
                update(prevState, { autoScrolling: { $set: false } })
              );
            }
          );
        }
      } 

      // // We are not on the root page, navigate to it and scroll to the
      // // target section
      // if (window.location.pathname !== '/') {
      //   navigate(`/${targetQuery}`);
      // } 
      // // Otherwise we just do an explicit scroll
      // else {
        // Scroll to the target element
        // const targetEl = document.querySelector(targetQuery)! as HTMLElement;
        // if (targetEl) {
        //   // Set autoscrolling
        //   setSiteState((prevState) =>
        //     update(prevState, { autoScrolling: { $set: true } })
        //   );

        //   // Cancel any already running scrolls and start the new one
        //   siteState.osInstance?.scrollStop();
        //   siteState.osInstance?.scroll(
        //     { el: targetEl },
        //     500,
        //     "easeOutQuad",
        //     () => {
        //       // Unset autoscrolling
        //       setSiteState((prevState) =>
        //         update(prevState, { autoScrolling: { $set: false } })
        //       );
        //     }
        //   );
        // }
      // }

      // console.log("a) setCurrSectionIdx", idx); // TODO: remove
      setCurrSectionIdx(idx);
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
    if (!siteState.autoScrolling) {
      const sectionIdx = findSectionIdx(siteState.currentWaypoint); 
      // console.log("b) setCurrSectionIdx", sectionIdx); // TODO: remove
      setCurrSectionIdx(sectionIdx);
    }
  }, [siteState.currentWaypoint]);

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
