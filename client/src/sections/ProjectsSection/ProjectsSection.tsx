import React, { FunctionComponent, useEffect, useRef } from "react";
import "./ProjectsSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { Link } from "gatsby";

export interface Props extends Omit<BaseProps, "id"> {};

const ProjectsSection: FunctionComponent<Props> = (props) => {

  return (
    <FullPageSection 
      className={classnames("ProjectsSection", props.className)}
      style={props.style}
      name="projects"
    >
      <div
        data-sal="entrance-up"
        style={{
          "--sal-duration": "1s"
        }}
      >
        Projects Section
        <br />
        <Link to="/projects/shabam">Shabam</Link>
      </div>
    </FullPageSection>
  );
};

export default ProjectsSection;