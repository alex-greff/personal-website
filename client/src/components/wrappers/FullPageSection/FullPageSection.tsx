import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./FullPageSection.scss";
import classnames from "classnames";

const FullPageSection: FunctionComponent<BaseProps> = (props) => {
  return (
    <footer 
      className={classnames("FullPageSection", props.className)}
      style={props.style}
      id={props.id}
    >
      {props.children}
    </footer>
  );
};

export default FullPageSection;