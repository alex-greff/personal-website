import React, { FunctionComponent } from "react";
import { BaseProps, ProjectItem } from "@/types";
import "./ProjectGridItem.scss";
import classnames from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import * as Utilities from "@/utilities";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export interface Props extends BaseProps {
  projectItem: ProjectItem;
}

const DEFAULT_THUMBNAIL_HEIGHT = "200px";

const ProjectGridItem: FunctionComponent<Props> = (props) => {
  const { projectItem } = props;

  const thumbnailImageData = getImage(projectItem.thumbnail);

  return (
    <Link
      to={`/projects/${projectItem.slug}`}
      className={classnames("ProjectGridItem", props.className)}
      id={props.id}
      style={{
        ...props.style,
        ...{
          "--item-color": Utilities.standardizeColor(projectItem.accentColor),
        },
      }}
    >
      <div className="ProjectGridItem__content">
        <div className="ProjectGridItem__image-container">
          <GatsbyImage
            className="ProjectGridItem__image"
            image={thumbnailImageData!}
            alt={`${projectItem.title}-thumbnail`}
            style={{height: projectItem.thumbnailHeight || DEFAULT_THUMBNAIL_HEIGHT}}
          />
        </div>
        <div className="ProjectGridItem__info-container">
          <div className="ProjectGridItem__title">
            {projectItem.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

ProjectGridItem.defaultProps = {} as Partial<Props>;

export default ProjectGridItem;
