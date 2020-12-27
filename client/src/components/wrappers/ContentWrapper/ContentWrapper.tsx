import React, { FunctionComponent, useContext } from "react";
import { BaseProps } from "@/types";
import "./ContentWrapper.scss";
import classnames from "classnames";
import SiteContext from "@/contexts/site-context";

interface Props extends BaseProps {
  style?: Omit<React.CSSProperties, "marginBottom">;
  wideness?: "wide" | "normal" | "thin";
  accountForNav?: boolean;
}

const ContentWrapper: FunctionComponent<Props> = (props) => {
  const { accountForNav, wideness } = props;
  const { siteState } = useContext(SiteContext);

  return (
    <div 
      className={classnames("ContentWrapper", props.className, `wideness-${wideness}`)}
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

ContentWrapper.defaultProps = {
  wideness: "normal"
} as Partial<Props>;

export default ContentWrapper;