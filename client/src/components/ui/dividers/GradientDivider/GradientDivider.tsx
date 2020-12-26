import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./GradientDivider.scss";
import classnames from "classnames";

export interface Props extends BaseProps {
  orientation?: "vertical" | "horizontal";
  length?: string;
  thickness?: string;
  style?: Omit<React.CSSProperties, "width" | "height">;
}

const GradientDivider: FunctionComponent<Props> = (props) => {
  const { orientation, length, thickness } = props;

  const sizingStyles =
    orientation === "vertical"
      ? { maxHeight: length, width: thickness }
      : { height: thickness, maxWidth: length };

  return (
    <div
      className={classnames("GradientDivider", props.className, orientation)}
      style={{ ...props.style, ...sizingStyles }}
      id={props.id}
    ></div>
  );
};

GradientDivider.defaultProps = {
  orientation: "horizontal",
  length: "100%",
  thickness: "3px",
} as Partial<Props>;

export default GradientDivider;
