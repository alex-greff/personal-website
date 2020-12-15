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
import NavContext from "@/contexts/nav-context";
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

const FLUSH_THRESHOLD = 0;

type NavState = "nav-state-flush" | "nav-state-outset";

const ITEMS: SelectionItem[] = [
  { id: "home", display: "Home", href: "#home" },
  { id: "about", display: "About", href: "#about" },
  {
    id: "experience",
    display: "Experience",
    href: "#experience",
    disabled: true,
  },
  { id: "projects", display: "Projects", href: "#projects" },
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
  const { navState, setNavState } = useContext(NavContext);
  const stateClass = useMemo(
    () => getStateClass(navState.scrollAmount, navState.mobileDropdownOpen),
    [navState.scrollAmount, navState.mobileDropdownOpen]
  );
  const [currSectionIdx, setCurrSectionIdx] = useState<number>(0);

  const toggleMobileDropdown = () => {
    setNavState(
      update(navState, {
        mobileDropdownOpen: { $set: !navState.mobileDropdownOpen },
      })
    );
  };

  const handleNavItemClick = (mobile = false) => {
    return (item: SelectionItem, idx: number) => {
      if (mobile) {
        toggleMobileDropdown();
      }
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
    setNavState(
      update(navState, {
        isMobile: { $set: isMobile },
        width: { $set: contentRef.current!.offsetWidth },
        height: { $set: contentRef.current!.offsetHeight },
      })
    );
  }, [contentWidth, contentHeight]);

  return (
    <nav
      id="NavBar"
      className={classnames(props.className, stateClass, {
        mobile: navState.isMobile,
      })}
      style={props.style}
    >
      <div className="NavBar__content" ref={contentRef}>
        {!navState.isMobile ? (
          // Render regular navbar
          <>
            <div className="NavBar__nav-items">
              <SelectableList
                items={ITEMS}
                selectedIdx={currSectionIdx}
                onClick={handleNavItemClick(false)}
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
              open={navState.mobileDropdownOpen}
              onClick={toggleMobileDropdown}
            />
          </div>
        )}
      </div>

      {navState.isMobile ? (
        // Render mobile dropdown menu
        <div
          className={classnames("NavBar__dropdown-mobile", {
            open: navState.mobileDropdownOpen,
          })}
          style={{
            height: `calc(100vh - ${navState.height}px)`,
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
