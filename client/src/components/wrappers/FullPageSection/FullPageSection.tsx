import React, { FunctionComponent, useContext } from "react";
import { BaseProps } from "@/types";
import "./FullPageSection.scss";
import classnames from "classnames";
import { Waypoint } from 'react-waypoint';
import * as Utilities from "@/utilities";

import SiteContext from "@/contexts/site-context";

interface Props extends BaseProps {
  accountForNav?: boolean;
  accountForFooter?: boolean;
  id: string;
  updateHash?: boolean;
}

const FullPageSection: FunctionComponent<Props> = (props) => {
  const { accountForNav, accountForFooter, updateHash } = props;
  const { siteState } = useContext(SiteContext);

  const navMod = accountForNav ? siteState.navHeight : 0;
  const footerMod = accountForFooter ? siteState.footerHeight : 0;

  const handleWaypointEnter = () => {
    // if (updateHash && siteState.loadCompleted) {
    if (updateHash) {
      // Update the window hash whenever we enter a full page section
      window.location.hash = `#${props.id!}`;
    }
  };

  return (
    <Waypoint
      onEnter={handleWaypointEnter}
      topOffset="40%"
      bottomOffset="40%"
    >
      <div
        className={classnames("FullPageSection", props.className)}
        style={{
          ...props.style,
          minHeight: `calc(100vh - ${footerMod}px - ${navMod}px)`,
        }}
      >
        {/* A dummy used for attaching the ID tag to so that the scroll behavior
        accounts for the navbar */}
        <div
          className="FullPageSection__id-dummy"
          id={Utilities.hashToSectionId(props.id)}
          style={{ top: `-${siteState.navHeight}px`, height: `${siteState.navHeight}px` }}
        ></div>
        {props.children}
      </div>
    </Waypoint>
  );
};

FullPageSection.defaultProps = {
  accountForNav: false,
  accountForFooter: false,
  updateHash: true
} as Partial<Props>;

export default FullPageSection;
