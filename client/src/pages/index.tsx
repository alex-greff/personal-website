import "./index.scss";
import React, { FunctionComponent, useContext } from "react";
import "@/styles/main.scss";
import ThemeContext from "@/contexts/theme-context";

import LandingSection from "@/sections/LandingSection/LandingSection";
import AboutSection from "@/sections/AboutSection/AboutSection";

const Main: FunctionComponent = () => {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <main id="Main">
      <LandingSection />
      <AboutSection />

      {/* TODO: remove */}
      {/* <h1>Hello There</h1>
      <button onClick={() => switchTheme("theme-light")}>Light</button>
      <button onClick={() => switchTheme("theme-dark")}>Dark</button> */}
    </main>
  );
};

export default Main;
