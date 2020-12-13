import React, { FunctionComponent, useEffect, useContext } from "react";
import { BaseProps } from "@/types";
import "./NavBar.scss";
import { SizeMeProps, withSize } from "react-sizeme";
import NavContext from "@/contexts/nav-context";
import update from "immutability-helper";

interface Props extends Omit<BaseProps, "id">, SizeMeProps {

}

const NavBar: FunctionComponent<Props> = (props) => {
  const { size } = props;
  const { navState, setNavState } = useContext(NavContext);

  useEffect(() => {
    setNavState(update(navState, {
      width: { $set: size.width! },
      height: { $set: size.height! }
    }));
  }, [size]);

  return (
    <div 
      id="NavBar"
      className={props.className}
      style={props.style}
    >
      Navbar
    </div>
  );
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 50
})(NavBar);