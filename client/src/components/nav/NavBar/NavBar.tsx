import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useMemo,
  useState
} from "react";
import { BaseProps } from "@/types";
import "./NavBar.scss";
import { SizeMeProps, withSize } from "react-sizeme";
import NavContext from "@/contexts/nav-context";
import update from "immutability-helper";
import classnames from "classnames";
import * as Utilities from "@/utilities";

import SelectableList, {
  SelectionItem,
} from "@/components/ui/lists/SelectableList/SelectableList";
import HamburgerMenu from "@/components/ui/icons/HamburgerMenu/HamburgerMenu";
import ThemeToggle from "@/components/ui/toggles/ThemeToggle/ThemeToggle";
import ResumeButton from "@/components/ui/buttons/ResumeButton/ResumeButton";

const FLUSH_THRESHOLD = 0;

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

interface Props extends Omit<BaseProps, "id">, SizeMeProps {}

const getStateClass = (scrollAmount: number) => {
  const isFlush = scrollAmount <= FLUSH_THRESHOLD;

  return isFlush ? "nav-state-flush" : "nav-state-outset";
};

const NavBar: FunctionComponent<Props> = (props) => {
  const { size } = props;
  const { navState, setNavState } = useContext(NavContext);
  const stateClass = useMemo(() => getStateClass(navState.scrollAmount), [
    navState.scrollAmount,
  ]);
  const [currSectionIdx, setCurrSectionIdx] = useState<number>(0);
  const mobile = Utilities.getBreakpoint(size.width!) <= Utilities.Breakpoint.phone;

  const handleNavItemClick = (item: SelectionItem, idx: number) => {
    setCurrSectionIdx(idx);
  };

  useEffect(() => {
    setNavState(
      update(navState, {
        width: { $set: size.width! },
        height: { $set: size.height! },
      })
    );
  }, [size]);

  return (
    <nav
      id="NavBar"
      className={classnames(
        props.className, 
        stateClass,
        { mobile }
      )}
      style={props.style}
    >
      <div className="NavBar__content">
        {!mobile ? (
          <>
            <div className="NavBar__nav-items">
              <SelectableList 
                items={ITEMS} 
                selectedIdx={currSectionIdx}
                onClick={handleNavItemClick}
              />
            </div>
            <div className="NavBar__additional-items">
              <ThemeToggle 
                className="NavBar__theme-toggle"
              />

              <ResumeButton
                className="NavBar__resume-button"
              >
                Resume
              </ResumeButton>
            </div>
          </>
        ) : (
          <div className="NavBar__additional-items">
            <HamburgerMenu />
          </div>
        )}
      </div>
    </nav>
  );
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 50,
})(NavBar);
