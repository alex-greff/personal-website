import React, { FunctionComponent, useRef, useEffect } from "react";
import { BaseProps, ProjectItem } from "@/types";
import "./ProjectGridItem.scss";
import classnames from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import * as Utilities from "@/utilities";
import { sr, srConfig } from "@/utilities";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export interface Props extends BaseProps {
  projectItem: ProjectItem;
  scrollAnimate?: boolean;
}

const DEFAULT_THUMBNAIL_HEIGHT = "200px";

const ProjectGridItem: FunctionComponent<Props> = (props) => {
  const { projectItem, scrollAnimate } = props;

  const contentRef = useRef(null);

  // Scroll revealing
  useEffect(() => {
    if (scrollAnimate) {
      const refs = [ contentRef ];
      for (const currRef of refs)
        sr?.reveal(currRef.current!, srConfig());
    }
  }, []);

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
      <div className="ProjectGridItem__content" ref={contentRef}>
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

ProjectGridItem.defaultProps = {
  scrollAnimate: false
} as Partial<Props>;

export default ProjectGridItem;
