
import React, { FunctionComponent } from "react";
import "./ProjectLayout.scss"
import { graphql, Link, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";

// Provide common components here
const shortcodes = { Link };

interface Props extends PageProps {
  data: {
    mdx: {
      id: string;
      body: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

const ProjectLayout: FunctionComponent<Props> = ({ data: { mdx } }) => {
  return (
    <FullPageSection 
      className="ProjectLayout" 
      accountForNav={true}
      name="project-info"
      updateHash={false}
    >
      <h1>{mdx.frontmatter.title}</h1>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </FullPageSection>
  );
};

export default ProjectLayout;

export const pageQuery = graphql`
  query ProjectQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;