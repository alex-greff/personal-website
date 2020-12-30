import React, { FunctionComponent, useMemo, useRef } from "react";
import { BaseProps } from "@/types";
import "./ProjectGrid.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";
import { CSSGrid as Grid } from "react-stonecutter";
import useThrottledResizeObserver from "@/hooks/useThrottledResizeObserver";
import useWindowSize from "@/hooks/useWindowSize";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const RESIZE_TROTTLE = 100;

export interface ProjectItem {
  title: string;
  subtitle: string;
  startDate: Date | null;
  endDate: Date | null;
  accentColor: string;
  categories: string[];
  tags: string[];
  thumbnailImage: string;
  links: { type: string; link: string }[];
  mdxContent: any;
}

export interface Props extends BaseProps {
  projectItems: ProjectItem[];
}

const ProjectGrid: FunctionComponent<Props> = (props) => {
  const { projectItems } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const { height: rootHeight, width: rootWidth } = useThrottledResizeObserver(
    RESIZE_TROTTLE,
    rootRef
  );
  const breakpoint = useBreakpoint();

  const sortedProjectItems = useMemo<ProjectItem[]>(() => {
    return Utilities.dateSortArray(
      projectItems,
      "title",
      "startDate",
      "endDate",
      "end-dates"
    );
  }, [projectItems]);

  const isMobile = breakpoint <= Utilities.Breakpoint.phone;

  return (
    <div
      className={classnames("ProjectGrid", props.className)}
      style={props.style}
      id={props.id}
      ref={rootRef}
    >
      <Grid
        component="div"
        columns={isMobile ? 1 : 2}
        columnWidth={isMobile ? rootWidth : rootWidth / 2}
        duration={200}
      >
        {sortedProjectItems.map((item, idx) => (
          <div key={idx}>
            {item.title}
            <br />
          </div>
        ))}
      </Grid>
    </div>
  );
};

ProjectGrid.defaultProps = {} as Partial<Props>;

export default ProjectGrid;
