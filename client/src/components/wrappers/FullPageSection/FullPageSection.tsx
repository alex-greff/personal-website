import React, { FunctionComponent, useContext } from "react";
import { BaseProps } from "@/types";
import "./FullPageSection.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";

import SiteContext from "@/contexts/site-context";

import SectionWaypoint from "@/components/SectionWaypoint/SectionWaypoint";

interface Props extends BaseProps {
  accountForNav?: boolean;
  accountForFooter?: boolean;
  name: string;
  updateHash?: boolean;
}

const FullPageSection: FunctionComponent<Props> = (props) => {
  const { accountForNav, accountForFooter, updateHash, name } = props;
  const { siteState } = useContext(SiteContext);

  const navMod = accountForNav ? siteState.navHeight : 0;
  const footerMod = accountForFooter ? siteState.footerHeight : 0;

  return (
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
        id={Utilities.hashToSectionId(name)}
        style={{
          top: `-${siteState.navHeight}px`,
          height: `${siteState.navHeight}px`,
        }}
      ></div>

      {/* Update the hash with a section waypoint, if needed */}
      {updateHash ? <SectionWaypoint name={name} /> : null}

      {props.children}
    </div>
  );
};

FullPageSection.defaultProps = {
  accountForNav: false,
  accountForFooter: false,
  updateHash: true,
} as Partial<Props>;

export default FullPageSection;
