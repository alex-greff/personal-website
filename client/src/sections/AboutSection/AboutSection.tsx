import React, { FunctionComponent, useEffect, useRef } from "react";
import "./AboutSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";

export interface Props extends Omit<BaseProps, "id"> {};

const AboutSection: FunctionComponent<Props> = (props) => {

  return (
    <FullPageSection 
      className={classnames("AboutSection", props.className)}
      style={props.style}
      name="about"
    >
      <div
        data-sal="entrance-up"
        style={{
          "--sal-duration": "1s"
        }}
      >
        About Section
      </div>
    </FullPageSection>
  );
};

export default AboutSection;