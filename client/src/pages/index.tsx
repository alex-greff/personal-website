import "./index.scss";
import React, { FunctionComponent } from "react";
import "@/styles/main.scss";

import LandingSection from "@/sections/LandingSection/LandingSection";
import AboutSection from "@/sections/AboutSection/AboutSection";
import ExperienceSection from "@/sections/ExperienceSection/ExperienceSection";
import ProjectsSection from "@/sections/ProjectsSection/ProjectsSection";

const Main: FunctionComponent = () => {
  return (
    <main id="Main">
      <LandingSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      

      {/* TODO: remove */}
      {/* <h1>Hello There</h1>
      <button onClick={() => switchTheme("theme-light")}>Light</button>
      <button onClick={() => switchTheme("theme-dark")}>Dark</button> */}      
    </main>
  );
};

export default Main;
