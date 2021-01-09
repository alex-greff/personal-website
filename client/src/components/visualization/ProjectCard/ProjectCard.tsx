import React, { FunctionComponent } from "react";
import { BaseProps, ProjectItem } from "@/types";
import "./ProjectCard.scss";
import classnames from "classnames";
import { Link } from "gatsby";
import * as Utilities from "@/utilities";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import LinkIcon from "@/components/link/LinkIcon";

const DEFAULT_THUMBNAIL_HEIGHT = "200px";

// Provide common components here
const shortcodes = { Link };

export interface Props extends BaseProps {
  projectItem: ProjectItem
};

const ProjectCard: FunctionComponent<Props> = (props) => {
  const { projectItem } = props;

  const startDateStr = Utilities.getFormattedStartDate(
    projectItem.startDate,
    false
  );
  const endDateStr = Utilities.getFormattedEndDate(projectItem.endDate, false);

  const thumbnailImageData = getImage(projectItem.thumbnail);

  return (
    <div
      className={classnames("ProjectCard", props.className)}
      style={props.style}
      id={props.id}
    >
      <div className="ProjectCard__header-content">
        <div className="ProjectCard__links">
          {projectItem.links.map((link, idx) => (
            <LinkIcon key={`link-${idx}`} link={link} />
          ))}
        </div>
        <div className="ProjectCard__title">{projectItem.title}</div>
        <div className="ProjectCard__subtitle">{projectItem.subtitle}</div>
        <div className="ProjectCard__date">
          {startDateStr} - {endDateStr}
        </div>
      </div>

      <GatsbyImage
        className="ProjectCard__image"
        image={thumbnailImageData!}
        alt={`${projectItem.title}-image`}
        style={{
          height: projectItem.imageHeight || DEFAULT_THUMBNAIL_HEIGHT,
        }}
      />

      <div className="ProjectCard__content">
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{projectItem.mdxContent}</MDXRenderer>
        </MDXProvider>
      </div>

      <div className="ProjectCard__tags">
        <div className="ProjectCard__tag-title">Tags</div>
        <div className="ProjectCard__tag-list">
          {projectItem.tags.join(", ")}
        </div>
      </div>
    </div>
  );
};

ProjectCard.defaultProps = {

} as Partial<Props>;

export default ProjectCard;