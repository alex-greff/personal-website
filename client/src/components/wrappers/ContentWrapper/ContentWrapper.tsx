import React, { FunctionComponent, useContext } from "react";
import { BaseProps } from "@/types";
import "./ContentWrapper.scss";
import classnames from "classnames";
import SiteContext from "@/contexts/site-context";

interface Props extends BaseProps {
  style?: Omit<React.CSSProperties, "marginBottom">;
  wideness?: "wide" | "normal" | "thin";
  accountForNav?: boolean;
  centered?: boolean;
}

const ContentWrapper: FunctionComponent<Props> = (props) => {
  const { accountForNav, wideness, centered } = props;
  const { siteState } = useContext(SiteContext);

  return (
    <div 
      className={classnames("ContentWrapper", props.className, `wideness-${wideness}`)}
      style={{ 
        marginBottom: (accountForNav) ? `${siteState.navHeight}px` : 0,
        justifyContent: (centered) ? "center" : "flex-start",
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
  wideness: "normal",
  centered: false
} as Partial<Props>;

export default ContentWrapper;