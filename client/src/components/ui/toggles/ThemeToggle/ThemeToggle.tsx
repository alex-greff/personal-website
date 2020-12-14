import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./ThemeToggle.scss";
import classnames from "classnames";

export interface Props extends BaseProps {

};

const ThemeToggle: FunctionComponent<Props> = (props) => {
  return (
    <div 
      className={classnames("ThemeToggle", props.className)}
      style={props.style}
      id={props.id}
    >
      theme toggle
    </div>
  );
};

ThemeToggle.defaultProps = {

} as Partial<Props>;

export default ThemeToggle;