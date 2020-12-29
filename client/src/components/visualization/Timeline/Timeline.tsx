import React, { FunctionComponent, useMemo, useEffect } from "react";
import { BaseProps } from "@/types";
import "./Timeline.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";
import useWindowSize from "@/hooks/useWindowSize";

import TimelineItem from "@/components/visualization/Timeline/TimelineItem/TimelineItem";

export interface TimelineItemData {
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date | null;
  accentColor: string;
  mdxContent: any;
}

export interface Props extends BaseProps {
  colGap?: string;
  rowGap?: string;
  backboneWidth?: string;
  backboneExtension?: string;
  backboneFadeStart?: string;
  timelineData: TimelineItemData[];
}

const Timeline: FunctionComponent<Props> = (props) => {
  const {
    timelineData,
    colGap,
    rowGap,
    backboneWidth,
    backboneExtension,
    backboneFadeStart,
  } = props;

  const windowSize = useWindowSize();

  // Sort the timeline data
  const sortedTimelineData = useMemo(() => {
    return Utilities.dateSortArray(
      timelineData,
      "title",
      "startDate",
      "endDate"
    ).reverse();
  }, [timelineData]);

  const numRows = sortedTimelineData.length;

  const isMobile = (Utilities.getBreakpoint(windowSize.width!) <= Utilities.Breakpoint.tabPort);

  const renderItem = (
    itemData: TimelineItemData,
    rowNum: number,
    side: "left" | "right"
  ) => {
    return (
      <TimelineItem
        key={rowNum}
        side={side}
        className={`Timeline__item Timeline__item-${side}`}
        style={{ gridRow: rowNum }}
        backboneGap={colGap!}
        backboneWidth={backboneWidth!}
        itemData={itemData}
      />
    );
  };

  return (
    <div
      className={classnames("Timeline", props.className, { mobile: isMobile })}
      style={{
        ...props.style,
        ...{
          "--col-gap": colGap,
          "--row-gap": rowGap,
          "--backbone-width": backboneWidth,
          "--backbone-extension": backboneExtension,
          "--backbone-fade-start": backboneFadeStart,
        },
      }}
      id={props.id}
    >
      <div
        className="Timeline__backbone"
        style={{ gridRow: `1/${numRows + 1}` }}
      ></div>
      {sortedTimelineData.map((item, idx) => {
        if (isMobile)
          return renderItem(item, idx + 1, "right");
        return renderItem(item, idx + 1, idx % 2 == 0 ? "right" : "left");
      })}
    </div>
  );
};

Timeline.defaultProps = {
  colGap: "1.5rem",
  rowGap: "1.5rem",
  backboneWidth: "4px",
  backboneExtension: "40px",
  backboneFadeStart: "60px",
} as Partial<Props>;

export default Timeline;
