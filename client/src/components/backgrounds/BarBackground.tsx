import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./BarBackground.scss";
import classnames from "classnames";

// Note: make sure to match in the SCSS file
const NUM_BARS = 100;

export interface Props extends BaseProps {
  basePosition?: "left" | "right" | "top" | "bottom";
}

const BarBackground: FunctionComponent<Props> = (props) => {
  const { basePosition } = props;

  return (
    <div
      className={classnames("BarBackground", props.className)}
      style={props.style}
      id={props.id}
    >
      {Array(NUM_BARS)
        .fill(0)
        .map((_, idx) => (
          <div
            key={`bar-${idx}`}
            className={classnames(
              "BarBackground__bar",
              `BarBackground__bar-num-${idx}`,
              basePosition
            )}
          >
            <div className="BarBackground__bar-fill"></div>
          </div>
        ))}
    </div>
  );
};

BarBackground.defaultProps = {
  basePosition: "right"
} as Partial<Props>;

export default BarBackground;
