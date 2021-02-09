import React, { FunctionComponent, useMemo, useRef, useEffect } from "react";
import { BaseProps } from "@/types";
import "./Timeline.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";
import { sr, srConfig } from "@/utilities";
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
  scrollAnimate?: boolean;
}

const Timeline: FunctionComponent<Props> = (props) => {
  const {
    timelineData,
    colGap,
    rowGap,
    backboneWidth,
    backboneExtension,
    backboneFadeStart,
    scrollAnimate
  } = props;

  const itemRefs = useRef<HTMLDivElement[]>([]);

  const windowSize = useWindowSize();

  // Sort the timeline data
  const sortedTimelineData = useMemo<TimelineItemData[]>(() => {
    return Utilities.dateSortArray(
      timelineData,
      "title",
      "startDate",
      "endDate"
    );
  }, [timelineData]);

  // Scroll reveal
  useEffect(() => {
    if (scrollAnimate) {
      for (const itemEl of itemRefs.current)
        sr?.reveal(itemEl, srConfig());
    }
  }, []);

  const numRows = sortedTimelineData.length;

  const isMobile = (Utilities.getBreakpoint(windowSize.width!) <= Utilities.Breakpoint.tabPort);

  const renderItem = (
    itemData: TimelineItemData,
    rowNum: number,
    side: "left" | "right",
    idx: number
  ) => {
    return (
      <TimelineItem
        ref={(el) => itemRefs.current[idx] = el!}
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
          return renderItem(item, idx + 1, "right", idx);
        return renderItem(item, idx + 1, idx % 2 == 0 ? "right" : "left", idx);
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
  scrollAnimate: false
} as Partial<Props>;

export default Timeline;
