
import React, { FunctionComponent } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { ThemeProvider } from "@/contexts/theme-context";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

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
    <ThemeProvider>
      <div>
        <h1>{mdx.frontmatter.title}</h1>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </ThemeProvider>
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