import "./index.scss";
import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import "@/styles/main.scss";
import { DataProps } from "@/types";

import LandingSection from "@/sections/LandingSection/LandingSection";
import AboutSection from "@/sections/AboutSection/AboutSection";
import ExperienceSection from "@/sections/ExperienceSection/ExperienceSection";
import ProjectsSection from "@/sections/ProjectsSection/ProjectsSection";

interface Props extends DataProps {}

const Main: FunctionComponent<Props> = ({ data }) => {
  return (
    <>
      <Helmet title={data.site.siteMetadata.title}/>
      <main id="Main">
        <LandingSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />   
      </main>
    </>
  );
};

export default Main;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
