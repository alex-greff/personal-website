import React, { FunctionComponent, useEffect, useRef } from "react";
import "./ExperienceSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";

import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";

export interface Props extends Omit<BaseProps, "id"> {};

const ExperienceSection: FunctionComponent<Props> = (props) => {

  return (
    <FullPageSection 
      className={classnames("ExperienceSection", props.className)}
      style={props.style}
      name="experience"
    >
      <ContentWrapper>
        <div
          data-sal="entrance-up"
          style={{
            "--sal-duration": "1s"
          }}
        >
          Experience Section
        </div>
      </ContentWrapper>
    </FullPageSection>
  );
};

export default ExperienceSection;