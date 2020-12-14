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

import SelectableList, {
  SelectionItem,
} from "@/components/ui/SelectableList/SelectableList";

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

  return isFlush ? "state-flush" : "state-outset";
};

const NavBar: FunctionComponent<Props> = (props) => {
  const { size } = props;
  const { navState, setNavState } = useContext(NavContext);
  const stateClass = useMemo(() => getStateClass(navState.scrollAmount), [
    navState.scrollAmount,
  ]);
  const [currSectionIdx, setCurrSectionIdx] = useState<number>(0);

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
    <div
      id="NavBar"
      className={classnames(props.className, stateClass)}
      style={props.style}
    >
      <div className="NavBar__nav-items">
        <SelectableList 
          items={ITEMS} 
          selectedIdx={currSectionIdx}
          onClick={handleNavItemClick}
        />
      </div>
    </div>
  );
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 50,
})(NavBar);
