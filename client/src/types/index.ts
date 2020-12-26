export type ThemeID = "theme-light" | "theme-dark";

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export interface DataProps {
  data: any;
}