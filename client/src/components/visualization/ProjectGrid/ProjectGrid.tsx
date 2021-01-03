import React, { FunctionComponent, useMemo, useRef } from "react";
import { BaseProps } from "@/types";
import "./ProjectGrid.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";
import { CSSGrid, SpringGrid, layout, measureItems  } from "react-stonecutter";
import useThrottledResizeObserver from "@/hooks/useThrottledResizeObserver";
import useWindowSize from "@/hooks/useWindowSize";
import { useBreakpoint } from "@/hooks/useBreakpoint";

import ProjectGridItem from "./ProjectGridItem/ProjectGridItem";

const RESIZE_TROTTLE = 100;

const Grid = measureItems(CSSGrid, { measureImages: true });

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

  const numCols = (isMobile) ? 1 : 2;
  const gutterHeight = (isMobile) ? 15 : 20;
  const gutterWidth = (isMobile) ? 15 : 20;
  const availableWidth = rootWidth - gutterWidth * (numCols - 1);
  const colWidth = availableWidth / numCols;

  return (
    <div
      className={classnames("ProjectGrid", props.className)}
      style={props.style}
      id={props.id}
      ref={rootRef}
    >
      <Grid
        component="div"
        columns={numCols}
        columnWidth={colWidth}
        duration={200}
        layout={layout.pinterest}
        gutterHeight={gutterHeight}
        gutterWidth={gutterWidth}
      >
        {sortedProjectItems.map((item, idx) => (
          <div 
            key={idx}
            className="ProjectGrid__item-wrapper" 
            style={{width: `${colWidth}px`}}
          >
            <ProjectGridItem projectItem={item} key={idx} />
          </div>
        ))}
      </Grid>
    </div>
  );
};

ProjectGrid.defaultProps = {} as Partial<Props>;

export default ProjectGrid;
