import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./MdxRenderer.scss";
import classnames from "classnames";

export interface Props extends BaseProps {

};

const MdxRenderer: FunctionComponent<Props> = (props) => {
  return (
    <div 
      className={classnames("MdxRenderer", props.className)}
      style={props.style}
      id={props.id}
    >
      
    </div>
  );
};

MdxRenderer.defaultProps = {

} as Partial<Props>;

export default MdxRenderer;