import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./ResumeButton.scss";
import classnames from "classnames";

export interface Props extends BaseProps {
  disabled?: boolean;
}

const ResumeButton: FunctionComponent<Props> = (props) => {
  const { disabled } = props;

  return (
    <a 
      className={classnames("ResumeButton", props.className, { disabled })}
      style={props.style}
      id={props.id}
      target="__blank"
      href="/resume.pdf"
    >
      <div className="ResumeButton__disabled-overlay"></div>
      {props.children}
    </a>
  );
};

ResumeButton.defaultProps = {
  disabled: false
} as Partial<Props>;

export default ResumeButton;