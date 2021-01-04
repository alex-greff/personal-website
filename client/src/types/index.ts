export type ThemeID = "theme-light" | "theme-dark";

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export interface DataProps {
  data: any;
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  startDate: Date | null;
  endDate: Date | null;
  accentColor: string;
  categories: string[];
  tags: string[];
  links: { type: string; link: string }[];
  mdxContent: any;
  thumbnail: any;
  thumbnailHeight?: string;
  slug: string;
}