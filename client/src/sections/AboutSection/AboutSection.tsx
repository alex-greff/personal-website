import React, { FunctionComponent } from "react";
import "./AboutSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";

export interface Props extends BaseProps {};

const AboutSection: FunctionComponent<Props> = (props) => {
  return (
    <FullPageSection 
      className={classnames("AboutSection", props.className)}
      style={props.style}
      id={props.id}
    >
      About Section
    </FullPageSection>
  );
};

export default AboutSection;