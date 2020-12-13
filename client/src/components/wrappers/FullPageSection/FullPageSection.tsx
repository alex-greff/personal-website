import React, { FunctionComponent, useContext } from "react";
import { BaseProps } from "@/types";
import "./FullPageSection.scss";
import classnames from "classnames";

import FooterContext from "@/contexts/footer-context";
import NavContext from "@/contexts/nav-context";

interface Props extends BaseProps {
  accountForNav?: boolean;
  accountForFooter?: boolean;
}

const FullPageSection: FunctionComponent<Props> = (props) => {
  const { accountForNav, accountForFooter } = props;
  const { navState } = useContext(NavContext);
  const { footerState } = useContext(FooterContext);

  const navMod = (accountForNav) ? navState.height : 0;
  const footerMod = (accountForFooter) ? footerState.height : 0;

  return (
    <div 
      className={classnames("FullPageSection", props.className)}
      style={{
        ...props.style,
        minHeight: `calc(100vh - ${footerMod}px - ${navMod}px)`
      }}
      id={props.id}
    >
      {props.children}
    </div>
  );
};

FullPageSection.defaultProps = {
  accountForNav: false,
  accountForFooter: false
} as Partial<Props>;

export default FullPageSection;