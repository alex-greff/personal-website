import React, { FunctionComponent } from "react";
import { BaseProps, SkillItem } from "@/types";
import "./SkillDisplay.scss";
import classnames from "classnames";

export interface Props extends BaseProps {
  skill: SkillItem;
  titleWidth?: string;
};

const SkillDisplay: FunctionComponent<Props> = (props) => {
  const { skill, titleWidth } = props;
  const skillText = skill.items.join(", ");

  return (
    <div 
      className={classnames("SkillDisplay", props.className)}
      style={{...props.style, ...{ "--title-width": titleWidth }}}
      id={props.id}
    >
      <div className="SkillDisplay__title">{skill.type}</div>
      <div className="SkillDisplay__skills">{skillText}</div>
    </div>
  );
};

SkillDisplay.defaultProps = {
  titleWidth: "12rem"
} as Partial<Props>;

export default SkillDisplay;