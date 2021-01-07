import { Theme } from "@/types";
import useLocalStorage from "./useLocalStorage";

interface UseThemeReturn {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

export default function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useLocalStorage("theme", null); 

  // Theme not set, figure it out 
  if (theme === null) {
    // https://ourcodeworld.com/articles/read/1114/how-to-detect-if-the-user-prefers-a-light-or-dark-color-schema-in-the-browser-with-javascript-and-css
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
 
    setTheme((userPrefersDark) ? "theme-dark" : "theme-light");
  }

  return {
    theme,
    setTheme
  };
}