import React, { FunctionComponent, useMemo } from "react";
import { BaseProps } from "@/types";
import "./Timeline.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";

export interface TimelineItemData {
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date | null;
  accentColor: string;
  mdxContent: any;
}

export interface Props extends BaseProps {
  timelineData: TimelineItemData[];
};

const Timeline: FunctionComponent<Props> = (props) => {
  const { timelineData } = props;

  // Sort the timeline data
  const sortedTimelineData = useMemo(() => {
    return Utilities.dateSortArray(timelineData, "title", "startDate", "endDate"); 
  }, [timelineData]);

  return (
    <div 
      className={classnames("Timeline", props.className)}
      style={props.style}
      id={props.id}
    >
      Timeline
    </div>
  );
};

Timeline.defaultProps = {

} as Partial<Props>;

export default Timeline;