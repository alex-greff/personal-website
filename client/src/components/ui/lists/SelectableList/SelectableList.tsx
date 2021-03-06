import React, {
  FunctionComponent,
  useRef,
  useEffect,
  useState,
  forwardRef,
} from "react";
import { BaseProps } from "@/types";
import "./SelectableList.scss";
import classnames from "classnames";
import gsap from "gsap";
import useThrottledResizeObserver from "@/hooks/useThrottledResizeObserver";

import SelectableListItem from "./SelectableListItem/SelectableListItem";

const CURSOR_ANIM_OFFSET = 30;
const DEFAULT_WIDTH = 10;

export type SelectionItemID = string | number;

export interface SelectionItem {
  id: SelectionItemID;
  display: string | ((id: SelectionItemID) => JSX.Element);
  href?: string;
  disabled?: boolean;
}

interface CursorState {
  width: number;
  left: number;
  top: number;
}

export interface Props extends BaseProps {
  items: SelectionItem[];
  selectedIdx?: number;
  orientation?: "horizontal" | "vertical";
  alignItems?: "start" | "center" | "end";
  useLink?: boolean;
  onClick?: (item: SelectionItem, idx: number) => unknown;
}

const SelectableList = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { items, orientation, alignItems, selectedIdx, onClick } = props;
  const { ref: rootRef, height: rootHeight } = useThrottledResizeObserver(50);
  const cursorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLElement[]>([]);
  const [currSelectedIdx, setCurrSelectedIdx] = useState<number>(selectedIdx!);
  const [cursorState, setCursorState] = useState<CursorState>({
    width: 0,
    top: 0,
    left: 0,
  });

  // Update the cursor's location every time the root element's height changes
  useEffect(() => {
    changeSelection(currSelectedIdx, false);
  }, [rootHeight]);

  // Updates the location of the cursor
  const changeSelection = (newSelectedIdx: number, animate = true) => {
    const targetElem =
      newSelectedIdx >= 0 ? itemRefs.current[newSelectedIdx] : null;
    const cursorElem = cursorRef.current!;

    if (targetElem == null) {
      if (!animate) {
        gsap.set(cursorElem, {
          width: DEFAULT_WIDTH,
          opacity: 0,
        });
      } else {
        const tl = gsap.timeline();
        tl.to(cursorElem, {
          duration: 0.3,
          left: cursorElem.offsetLeft + CURSOR_ANIM_OFFSET,
          opacity: 0,
        });
      }

      // Update state
      setCursorState({
        width: DEFAULT_WIDTH,
        top: cursorElem.offsetTop,
        left: cursorElem.offsetLeft + CURSOR_ANIM_OFFSET,
      });
      setCurrSelectedIdx(newSelectedIdx);

      return;
    }

    const newWidth = targetElem.offsetWidth;
    const newTop = targetElem.offsetHeight + targetElem.offsetTop;
    const newLeft = targetElem.offsetLeft;

    gsap.killTweensOf(cursorElem);

    if (!animate) {
      gsap.set(cursorElem, {
        width: newWidth,
        top: newTop,
        left: newLeft,
      });
    } else {
      // The target location is below the current cursor location:
      // Slide out right and come in left
      if (newTop > cursorState.top) {
        const tl = gsap.timeline();
        tl.to(cursorElem, {
          duration: 0.3,
          left: cursorState.left + CURSOR_ANIM_OFFSET,
          opacity: 0,
          onComplete: () => {
            gsap.set(cursorElem, {
              left: newLeft + CURSOR_ANIM_OFFSET,
              top: newTop,
              width: newWidth,
              opacity: 0,
            });
          },
        });
        tl.to(cursorElem, {
          duration: 0.3,
          left: newLeft,
          opacity: 1,
        });
      }
      // The target location is above the current cursor location:
      // Slide out left and come in right
      else if (newTop < cursorState.top) {
        const tl = gsap.timeline();
        tl.to(cursorElem, {
          duration: 0.3,
          left: cursorState.left - CURSOR_ANIM_OFFSET,
          opacity: 0,
          onComplete: () => {
            gsap.set(cursorElem, {
              left: newLeft - CURSOR_ANIM_OFFSET,
              top: newTop,
              width: newWidth,
              opacity: 0,
            });
          },
        });
        tl.to(cursorElem, {
          duration: 0.3,
          left: newLeft,
          opacity: 1,
        });
      }
      // The target location is on the same level as the current location:
      // Slide over
      else {
        gsap.to(cursorElem, {
          duration: 0.3,
          width: newWidth,
          top: newTop,
          left: newLeft,
        });
      }
    }

    // Update state
    setCursorState({ width: newWidth, top: newTop, left: newLeft });
    setCurrSelectedIdx(newSelectedIdx);
  };

  // // Update the cursor location every time the selection changes
  useEffect(() => {
    if (selectedIdx != currSelectedIdx) {
      changeSelection(selectedIdx!);
    }

    return () => gsap.killTweensOf(cursorRef.current!);
  }, [selectedIdx]);

  const renderSelectableItem = (item: SelectionItem, idx: number) => {
    return (
      <SelectableListItem
        key={idx}
        className="SelectableList__item"
        item={item}
        useLink={props.useLink}
        handleRef={(itemRef) => (itemRefs.current[idx] = itemRef.current!)}
        onClick={() => (onClick ? onClick(item, idx) : null)}
      />
    );
  };

  return (
    <div ref={ref} className="SelectableList__container">
      <div
        className={classnames("SelectableList", props.className, orientation)}
        style={props.style}
        id={props.id}
        ref={rootRef}
      >
        <div
          className="SelectableList__items"
          style={{ justifyContent: alignItems }}
        >
          {items.map((item, idx) => renderSelectableItem(item, idx))}
        </div>
        <div className="SelectableList__cursor" ref={cursorRef}></div>
      </div>
    </div>
  );
});

SelectableList.defaultProps = {
  // selectedIdx: 0,
  orientation: "horizontal",
  useLink: false,
  alignItems: "start",
} as Partial<Props>;

export default SelectableList;
