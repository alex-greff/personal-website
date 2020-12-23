import React, { FunctionComponent, useContext } from "react";
import "./SectionWaypoint.scss";
import { Waypoint } from "react-waypoint";
import update from "immutability-helper";
import SiteContext, { LoadStatus } from "@/contexts/site-context";

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
};

const SectionWaypoint: FunctionComponent<Props> = (props) => {
  const { name, disable, triggerLocation } = props;
  const { siteState, setSiteState } = useContext(SiteContext);

  const onWaypointEnter = () => {
    // Only register a section entrance when not disabled and the site 
    // isn't loading
    if (!disable && siteState.loadStatus >= LoadStatus.COMPLETED) {
      const waypoint = name;

      // Update the window hash whenever we enter a full page section
      window.location.hash = `#${waypoint}`;

      setSiteState((prevState) =>
        update(prevState, { currentWaypoint: { $set: waypoint } })
      );
    }
  };

  return (
    <div 
      className="SectionWaypoint"
      style={{
        height: `calc(100% - 2 * ${triggerLocation})`
      }}
    >
      <Waypoint 
        onEnter={onWaypointEnter}
      />
    </div>
  );
};

SectionWaypoint.defaultProps = {
  disable: false,
  triggerLocation: "50%"
} as Partial<Props>;

export default SectionWaypoint;