import React, { FunctionComponent, useContext, useState } from "react";
import "./SectionWaypoint.scss";
import { Waypoint } from "react-waypoint";
import update from "immutability-helper";
import SiteContext, { LoadStatus } from "@/contexts/site-context";
import * as Utilities from "@/utilities";

export interface Props {
  name: string;
  disable?: boolean;
  // The location within the container that the section waypoint will trigger
  // - 50% => will trigger when exactly half of the section is visible
  // Note: no value over 50% is possible, so it is bounded by [0%, 50%]
  //       |-----------------|
  //       |                 |
  // tl -> |                 |
  //       |    Section      |
  //       |    Container    |
  // tl -> |                 |
  //       |                 |
  //       |-----------------|
  triggerLocation?: string;
}

const SectionWaypoint: FunctionComponent<Props> = (props) => {
  const { name, disable, triggerLocation } = props;
  const { siteState, setSiteState } = useContext(SiteContext);
  const [initPage] = useState(Utilities.getPageType(window.location.pathname));

  const onWaypointEnter = () => {
    // Only register a section entrance when:
    // - not disabled
    // - the site isn't loading
    // - an autoscrolling operation is not running
    // - the current page is the same as the page it belongs to
    if (
      !disable &&
      siteState.loadStatus >= LoadStatus.COMPLETED &&
      !siteState.autoScrolling &&
      Utilities.getPageType(window.location.pathname) === initPage
    ) {
      const waypoint = name;

      // Update the hash without triggering the hash change event
      history.replaceState(
        null,
        document.title,
        document.location.pathname + "#" + waypoint
      );

      setSiteState((prevState) =>
        update(prevState, { currentWaypoint: { $set: waypoint } })
      );
    }
  };

  return (
    <div
      className="SectionWaypoint"
      style={{
        height: `calc(100% - 2 * ${triggerLocation})`,
      }}
    >
      <Waypoint onEnter={onWaypointEnter} />
    </div>
  );
};

SectionWaypoint.defaultProps = {
  disable: false,
  triggerLocation: "50%",
} as Partial<Props>;

export default SectionWaypoint;
