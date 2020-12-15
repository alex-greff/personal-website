import React, { FunctionComponent } from "react";
import "./LandingSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";

export interface Props extends BaseProps {};

const LandingSection: FunctionComponent<Props> = (props) => {
  return (
    <FullPageSection 
      className={classnames("LandingSection", props.className)}
      style={props.style}
      id={props.id}
    >
      Landing Section
    </FullPageSection>
  );
};

export default LandingSection;