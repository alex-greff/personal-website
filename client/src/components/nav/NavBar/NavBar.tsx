import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { BaseProps } from "@/types";
import "./NavBar.scss";
import { SizeMeProps, withSize } from "react-sizeme";
import NavContext from "@/contexts/nav-context";
import update from "immutability-helper";
import classnames from "classnames";

const FLUSH_THRESHOLD = 0;

interface Props extends Omit<BaseProps, "id">, SizeMeProps {}

const getStateClass = (scrollAmount: number) => {
  const isFlush = scrollAmount <= FLUSH_THRESHOLD;
  
  return (isFlush) ? "state-flush" : "state-outset";
}

const NavBar: FunctionComponent<Props> = (props) => {
  const { size } = props;
  const { navState, setNavState } = useContext(NavContext);
  const stateClass = useMemo(() => getStateClass(navState.scrollAmount), [navState.scrollAmount]);

  useEffect(() => {
    setNavState(
      update(navState, {
        width: { $set: size.width! },
        height: { $set: size.height! },
      })
    );
  }, [size]);

  useEffect(() => {

  }, [navState.scrollAmount]);

  return (
    <div 
      id="NavBar" 
      className={classnames(props.className, stateClass)} 
      style={props.style}
    >
      Navbar
    </div>
  );
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 50,
})(NavBar);
