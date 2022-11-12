import React, { FunctionComponent, useMemo, useRef, useEffect } from "react";
import "./ProjectsSection.scss";
import { BaseProps, ProjectItem } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { sr, srConfig } from "@/utilities";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
import "datejs";

import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";
import GradientDivider from "@/components/ui/dividers/GradientDivider/GradientDivider";
import ProjectGrid from "@/components/visualization/ProjectGrid/ProjectGrid";

export interface Props extends Omit<BaseProps, "id"> {}

const ProjectsSection: FunctionComponent<Props> = (props) => {
  const query = useStaticQuery(graphql`
    query {
      allMdx(filter: { fields: { collection: { eq: "projects" } } }) {
        edges {
          node {
            frontmatter {
              title
              subtitle
              startDate
              endDate
              accentColor
              categories
              tags
              links {
                link
                type
              }
              thumbnail {
                childImageSharp {
                  gatsbyImageData(width: 2048, placeholder: BLURRED)
                }
              }
              thumbnailHeight
              imageHeight
            }
            body
            slug
          }
        }
      }
    }
  `);

  const titleRef = useRef(null);
  const dividerRef = useRef(null);

  const projectItems = useMemo<ProjectItem[]>(() => {
    const projectRawData = query.allMdx.edges as any[];

    // Note: the data is not sorted, the ProjectGrid component does this
    const projectItems = projectRawData.reduce(
      (acc: ProjectItem[], currNode) => {
        const currRawData = currNode.node;

        const currProjectItem: ProjectItem = {
          title: currRawData.frontmatter.title,
          subtitle: currRawData.frontmatter.subtitle,
          startDate: Date.parse(currRawData.frontmatter.startDate),
          endDate: currRawData.frontmatter.endDate
            ? Date.parse(currRawData.frontmatter.endDate)
            : null,
          accentColor: currRawData.frontmatter.accentColor,
          categories: currRawData.frontmatter.categories,
          tags: currRawData.frontmatter.tags,
          links: currRawData.frontmatter.links,
          mdxContent: currRawData.body,
          thumbnail: currRawData.frontmatter.thumbnail,
          thumbnailHeight: currRawData.frontmatter.thumbnailHeight,
          imageHeight: currRawData.frontmatter.imageHeight,
          slug: currRawData.slug
        };

        return [...acc, currProjectItem];
      },
      [] as ProjectItem[]
    );

    return projectItems;
  }, [query.allMdx]);

  // Scroll revealing
  useEffect(() => {
    const refs = [ titleRef, dividerRef ];
    for (const currRef of refs)
      sr?.reveal(currRef.current!, srConfig());
  }, []);

  return (
    <FullPageSection
      className={classnames("ProjectsSection", props.className)}
      style={props.style}
      name="projects"
    >
      <ContentWrapper wideness="normal">
        <div className="ProjectsSection__content">
          <div className="ProjectsSection__title" ref={titleRef}>Projects</div>
          <GradientDivider
            ref={dividerRef}
            className="ProjectsSection__divider"
            gradientFade="left-right"
            length="80rem"
          />
          <ProjectGrid
            projectItems={projectItems}
            className="ProjectsSection__project-grid"
            scrollAnimate={true}
          />
        </div>
      </ContentWrapper>
    </FullPageSection>
  );
};

export default ProjectsSection;
