import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./TimelineItem.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";

import { TimelineItemData } from "@/components/visualization/Timeline/Timeline";

export interface Props extends BaseProps {
  backboneGap: string;
  backboneWidth: string;
  accentWidth?: string;
  pointerSize?: string;
  itemData: TimelineItemData;
  side: "right" | "left";
}

const TimelineItem: FunctionComponent<Props> = (props) => {
  const { backboneGap, backboneWidth, itemData, accentWidth, pointerSize, side } = props;

  return (
    <div
      className={classnames("TimelineItem", props.className, `side-${side}`)}
      style={{
        ...props.style,
        ...{
          "--backbone-gap": backboneGap,
          "--backbone-width": backboneWidth,
          "--accent-width": accentWidth,
          "--pointer-size": pointerSize,
          "--accent-color": Utilities.standardizeColor(itemData.accentColor)
        },
      }}
      id={props.id}
    >
      <div className="TimelineItem__accent"></div>
      <div className="TimelineItem__content">{side}</div>
      <div className="TimelineItem__pointer">
        <div className="TimelineItem__pointer-diamond"></div>
      </div>
    </div>
  );
};

TimelineItem.defaultProps = {
  accentWidth: "0.5rem",
  pointerSize: "1.2rem"
} as Partial<Props>;

export default TimelineItem;
