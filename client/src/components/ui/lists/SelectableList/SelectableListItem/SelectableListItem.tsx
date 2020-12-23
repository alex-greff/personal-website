import React, { FunctionComponent, useRef, useEffect } from "react";
import { BaseProps } from "@/types";
import "./SelectableListItem.scss";
import classnames from "classnames";
import { Link } from "gatsby";

import { SelectionItem } from "../SelectableList";

export interface Props extends BaseProps {
  item: SelectionItem;
  useLink?: boolean;
  onClick?: (e: React.MouseEvent) => unknown;
  handleRef?: (ref: React.RefObject<HTMLElement>) => unknown;
};

const SelectableListItem: FunctionComponent<Props> = (props) => {
  const { id, display, href, disabled } = props.item;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Pass up the ref to the parent
    if (props.handleRef)
      props.handleRef(ref);
  }, []);

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // e.preventDefault(); // TODO: remove?

    if (props.onClick) 
      props.onClick(e);
  };

  if (props.useLink) {
    return (
      <Link 
        className={classnames(
          "SelectableListItem", 
          props.className,
          { disabled }
        )}
        style={props.style}
        id={props.id}
        to={href!}
        ref={ref}
        onClick={handleOnClick}
      >
        {(typeof display === "function") ? display(id) : display}
      </Link>
    );
  }

  const Tag = (href) ? "a" : "div";

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
      onClick={handleOnClick}
    >
      {(typeof display === "function") ? display(id) : display}
    </Tag>
  );
};

SelectableListItem.defaultProps = {
  useLink: false
} as Partial<Props>;

export default SelectableListItem;