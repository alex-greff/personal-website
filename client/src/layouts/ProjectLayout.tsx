import React, { FunctionComponent, useMemo } from "react";
import "./ProjectLayout.scss";
import { graphql, Link, PageProps } from "gatsby";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";
import { ProjectItem } from "@/types";
import "datejs";

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import ProjectCard from "@/components/visualization/ProjectCard/ProjectCard";

interface Props extends PageProps {
  data: {
    mdx: any;
  };
}

const ProjectLayout: FunctionComponent<Props> = ({ data: { mdx } }) => {
  const projectItem = useMemo<ProjectItem>(() => {
    return {
      title: mdx.frontmatter.title,
      subtitle: mdx.frontmatter.subtitle,
      startDate: mdx.frontmatter.startDate
        ? Date.parse(mdx.frontmatter.startDate)
        : null,
      endDate: mdx.frontmatter.endDate
        ? Date.parse(mdx.frontmatter.endDate)
        : null,
      accentColor: mdx.frontmatter.accentColor,
      tags: mdx.frontmatter.tags,
      categories: mdx.frontmatter.categories,
      links: mdx.frontmatter.links,
      thumbnail: mdx.frontmatter.thumbnail,
      thumbnailHeight: mdx.frontmatter.thumbnailHeight,
      imageHeight: mdx.frontmatter.imageHeight,
      mdxContent: mdx.body,
      slug: mdx.slug,
    };
  }, [mdx]);

  return (
    <FullPageSection
      className="ProjectLayout"
      accountForNav={true}
      accountForFooter={true}
      name="project-info"
      updateHash={false}
    >
      <ContentWrapper wideness="normal">
        <div className="ProjectLayout__content">
          <Link to="/#projects" className="ProjectLayout__back-button">
            <KeyboardArrowLeft className="ProjectLayout__back-icon" />
            <div className="ProjectLayout__back-text">Back</div>
          </Link>
          <ProjectCard
            className="ProjectLayout__project"
            projectItem={projectItem}
          />
        </div>
      </ContentWrapper>
    </FullPageSection>
  );
};

export default ProjectLayout;

export const pageQuery = graphql`
  query ProjectQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
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
            gatsbyImageData(
              width: 2048
              placeholder: BLURRED
            )
          }
        }
        thumbnailHeight
        imageHeight
      }
      body
      slug
    }
  }
`;
