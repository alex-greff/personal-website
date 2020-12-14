import React, { FunctionComponent, useRef, useEffect } from "react";
import { BaseProps } from "@/types";
import "./SelectableListItem.scss";
import classnames from "classnames";

import { SelectionItem } from "../SelectableList";

export interface Props extends BaseProps {
  item: SelectionItem;
  onClick?: (e: React.MouseEvent) => unknown;
  handleRef?: (ref: React.RefObject<HTMLElement>) => unknown;
};

const SelectableListItem: FunctionComponent<Props> = (props) => {
  const { id, display, href, disabled } = props.item;
  const ref = useRef<HTMLElement>(null);

  const Tag = (href) ? "a" : "div";

  useEffect(() => {
    // Pass up the ref to the parent
    if (props.handleRef)
      props.handleRef(ref);
  }, []);

  return (
    <Tag
      className={classnames(
        "SelectableListItem", 
        props.className,
        { disabled }
      )}
      style={props.style}
      id={props.id}
      href={href}
      ref={ref}
      onClick={props.onClick}
    >
      {(typeof display === "function") ? display(id) : display}
    </Tag>
  );
};

SelectableListItem.defaultProps = {

} as Partial<Props>;

export default SelectableListItem;