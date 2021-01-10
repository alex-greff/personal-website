import React, { FunctionComponent, useContext } from "react";
import { BaseProps } from "@/types";
import "./ThemeToggle.scss";
import classnames from "classnames";
import ThemeContext from "@/contexts/theme-context";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import useHydrationFixer from "@/hooks/useHydrationFixer";

const ThemeToggle: FunctionComponent<BaseProps> = (props) => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const ssrKey = useHydrationFixer();

  const dark = theme === "theme-dark";

  const toggleTheme = () => {
    if (theme === "theme-light")
      switchTheme("theme-dark");
    else
    switchTheme("theme-light");
  };

  return (
    <div 
      key={ssrKey}
      className={classnames("ThemeToggle", props.className, { dark })}
      style={props.style}
      id={props.id}
      onClick={toggleTheme}
    >
      <div className="ThemeToggle__handle">
        <Brightness7Icon className="ThemeToggle__icon ThemeToggle__light-icon" />
        <NightsStayIcon className="ThemeToggle__icon ThemeToggle__dark-icon" />
      </div>
    </div>
  );
};

export default ThemeToggle;