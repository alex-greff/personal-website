import React, { FunctionComponent, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ThemeID } from "@/types";
import { defaultTheme } from "@/constants/themes";

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
    const root = document.body;
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);
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