import React, { FunctionComponent, useMemo, useRef, useState } from "react";
import { BaseProps, ProjectItem } from "@/types";
import "./ProjectGrid.scss";
import classnames from "classnames";
import * as Utilities from "@/utilities";
import { CSSGrid, SpringGrid, layout, measureItems } from "react-stonecutter";
import useThrottledResizeObserver from "@/hooks/useThrottledResizeObserver";
import useWindowSize from "@/hooks/useWindowSize";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { projectCategories, projectCategoryAll } from "@/constants";

import SelectableList, {
  SelectionItem,
} from "@/components/ui/lists/SelectableList/SelectableList";
import ProjectGridItem from "./ProjectGridItem/ProjectGridItem";

const RESIZE_TROTTLE = 100;

const Grid = measureItems(CSSGrid, { measureImages: true });

const projectCategoryItems: SelectionItem[] = projectCategories.map((category) => {
  return { id: category, display: category };
});

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
  const [categoryIdx, setCategoryIdx] = useState(0);

  const sortedProjectItems = useMemo<ProjectItem[]>(() => {
    return Utilities.dateSortArray(
      projectItems,
      "title",
      "startDate",
      "endDate",
      "end-dates"
    );
  }, [projectItems]);

  const filteredProjectItems = useMemo<ProjectItem[]>(() => {
    const currCategory = projectCategories[categoryIdx];

    if (currCategory === projectCategoryAll) 
      return sortedProjectItems;
    
    const filteredProjectItems = sortedProjectItems.filter((item) => {
      return item.categories.includes(currCategory);
    });
    return filteredProjectItems;

  }, [sortedProjectItems, categoryIdx]);

  const handleCategoryChange = (item: SelectionItem, idx: number) => {
    setCategoryIdx(idx);
  };

  const isMobile = breakpoint <= Utilities.Breakpoint.phone;
  const hasProjects = filteredProjectItems.length > 0;

  const numCols = (hasProjects) ? isMobile ? 1 : 2 : 1;
  const gutterHeight = isMobile ? 15 : 20;
  const gutterWidth = isMobile ? 15 : 20;
  const availableWidth = rootWidth - gutterWidth * (numCols - 1);
  const colWidth = availableWidth / numCols;

  return (
    <div
      className={classnames("ProjectGrid", props.className)}
      style={props.style}
      id={props.id}
      ref={rootRef}
    >
      <SelectableList
        className="ProjectGrid__category-filter"
        items={projectCategoryItems}
        selectedIdx={categoryIdx}
        onClick={handleCategoryChange}
        useLink={false}
        alignItems="center"
      />

      <Grid
        component="div"
        columns={numCols}
        columnWidth={colWidth}
        duration={200}
        layout={layout.pinterest}
        gutterHeight={gutterHeight}
        gutterWidth={gutterWidth}
      >
        {(filteredProjectItems.length > 0) ? filteredProjectItems.map((item, idx) => (
          <div
            key={`project-${item.title}`}
            className="ProjectGrid__item-wrapper"
            style={{ width: `${colWidth}px` }}
          >
            <ProjectGridItem projectItem={item} key={idx} />
          </div>
        )) : (
          <div 
            key="no-projects"
            className="ProjectGrid__no-projects"
          >
            No projects
          </div>
        )}
      </Grid>
    </div>
  );
};

ProjectGrid.defaultProps = {} as Partial<Props>;

export default ProjectGrid;
