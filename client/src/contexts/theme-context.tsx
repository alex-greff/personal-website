import React, { FunctionComponent, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ThemeID } from "@/types";
import { defaultTheme } from "@/constants/themes";

const THEME_CHANGE_DURATION = 200;

interface ThemeContextValue {
  theme: ThemeID | null;
  switchTheme: (newTheme: string) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: null,
  switchTheme: () => {}
});

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", null);
  const switchTheme = (newTheme: string) => {
    // Add the theme change class to make the theme change to smoothly
    const gatsbyRoot = document.querySelector("#___gatsby");
    gatsbyRoot?.classList.add("theme-change");

    // Change the theme
    const root = document.body;
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);

    setTimeout(() => {
      // Theme change animation is done, remove the class
      gatsbyRoot?.classList.remove("theme-change");
    }, THEME_CHANGE_DURATION);
  };

  // Set the current theme
  useEffect(() => {
    switchTheme(theme || defaultTheme);
  });

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;