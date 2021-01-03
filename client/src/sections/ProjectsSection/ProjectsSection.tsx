import React, { FunctionComponent, useMemo } from "react";
import "./ProjectsSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";

import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";
import GradientDivider from "@/components/ui/dividers/GradientDivider/GradientDivider";
import ProjectGrid, {
  ProjectItem,
} from "@/components/visualization/ProjectGrid/ProjectGrid";

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
                  gatsbyImageData(maxWidth: 2048, layout: FLUID, placeholder: TRACED_SVG)
                }
              }
              thumbnailHeight
            }
            body
            slug
          }
        }
      }
    }
  `);

  const projectItems = useMemo<ProjectItem[]>(() => {
    const projectRawData = query.allMdx.edges as any[];

    // Note: the data is not sorted, the ProjectGrid component does this
    const projectItems = projectRawData.reduce(
      (acc: ProjectItem[], currNode) => {
        const currRawData = currNode.node;

        const currProjectItem: ProjectItem = {
          title: currRawData.frontmatter.title,
          subtitle: currRawData.frontmatter.subtitle,
          startDate: new Date(currRawData.frontmatter.startDate),
          endDate: currRawData.frontmatter.endDate
            ? new Date(currRawData.frontmatter.endDate)
            : null,
          accentColor: currRawData.frontmatter.accentColor,
          categories: currRawData.frontmatter.categories,
          tags: currRawData.frontmatter.tags,
          links: currRawData.frontmatter.links,
          mdxContent: currRawData.body,
          thumbnail: currRawData.frontmatter.thumbnail,
          thumbnailHeight: currRawData.frontmatter.thumbnailHeight,
          slug: currRawData.slug
        };

        return [...acc, currProjectItem];
      },
      [] as ProjectItem[]
    );

    return projectItems;
  }, [query.allMdx]);

  return (
    <FullPageSection
      className={classnames("ProjectsSection", props.className)}
      style={props.style}
      name="projects"
    >
      <ContentWrapper wideness="normal">
        <div className="ProjectsSection__content">
          <div className="ProjectsSection__title">Projects</div>
          <GradientDivider
            className="ProjectsSection__divider"
            gradientFade="left-right"
            length="80rem"
          />
          <ProjectGrid
            projectItems={projectItems}
            className="ProjectsSection__project-grid"
            
          />
        </div>
        {/* <div
          data-sal="entrance-up"
          style={{
            "--sal-duration": "1s"
          }}
        >
          Projects Section
          <br />
          <Link to="/projects/shabam">Shabam</Link>
        </div> */}
      </ContentWrapper>
    </FullPageSection>
  );
};

export default ProjectsSection;
