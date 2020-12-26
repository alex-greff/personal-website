import React, { FunctionComponent, useContext } from "react";
import { BaseProps } from "@/types";
import "./ContentWrapper.scss";
import classnames from "classnames";
import SiteContext from "@/contexts/site-context";

interface Props extends BaseProps {
  style?: Omit<React.CSSProperties, "marginBottom">;
  accountForNav?: boolean;
}

const ContentWrapper: FunctionComponent<Props> = (props) => {
  const { accountForNav } = props;
  const { siteState } = useContext(SiteContext);

  return (
    <div 
      className={classnames("ContentWrapper", props.className)}
      style={{ 
        marginBottom: (accountForNav) ? `${siteState.navHeight}px` : 0,
        ...props.style,
      }}
      id={props.id}
    >
      <div className="ContentWrapper__content">
        {props.children}
      </div>
    </div>
  );
};

export default ContentWrapper;