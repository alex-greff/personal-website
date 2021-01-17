import React, { FunctionComponent, useEffect, useState } from "react";
import { Theme } from "@/types";
import { defaultTheme } from "@/constants/themes";
import useTheme from "@/hooks/useTheme";

const THEME_CHANGE_DURATION = 200;

interface ThemeContextValue {
  theme: Theme | null;
  switchTheme: (newTheme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: null,
  switchTheme: () => {}
});

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const { theme, setTheme } = useTheme();

  const [firstTime, setFirstTime] = useState<Boolean>(true);

  const switchTheme = (newTheme: Theme) => {
    // Add the theme change class to make the theme change to smoothly
    const gatsbyRoot = document.querySelector("#___gatsby");
    if (!firstTime)
      gatsbyRoot?.classList.add("theme-change");
    else
      setFirstTime(false);
    
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
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;