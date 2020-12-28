import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./TimelineItem.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";

import { TimelineItemData } from "@/components/visualization/Timeline/Timeline";

export interface Props extends BaseProps {
  colGap: string;
  rowGap: string;
  backboneWidth: string;
  itemData: TimelineItemData;
  side: "right" | "left";
}

const TimelineItem: FunctionComponent<Props> = (props) => {
  const { colGap, rowGap, backboneWidth, itemData, side } = props;

  return (
    <div
      className={classnames("TimelineItem", props.className, `side-${side}`)}
      style={{
        ...props.style,
        ...{
          "--col-gap": colGap,
          "--row-gap": rowGap,
          "--backbone-width": backboneWidth,
          "--accent-color": Utilities.standardizeColor(itemData.accentColor)
        },
      }}
      id={props.id}
    >
      {/* TODO: implement */}
      {side} 
    </div>
  );
};

TimelineItem.defaultProps = {} as Partial<Props>;

export default TimelineItem;
