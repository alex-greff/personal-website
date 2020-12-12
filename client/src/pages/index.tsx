import "./index.scss";
import React, { FunctionComponent, useContext } from "react";
import "@/styles/main.scss";
import ThemeContext, { ThemeProvider } from "@/contexts/theme-context";

const Main: FunctionComponent = () => {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <main id="Main">
      <h1>Hello There</h1>
      <button onClick={() => switchTheme("theme-light")}>Light</button>
      <button onClick={() => switchTheme("theme-dark")}>Dark</button>
    </main>
  );
};

const index: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

export default index;
