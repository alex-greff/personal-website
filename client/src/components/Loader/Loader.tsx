import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import { BaseProps } from "@/types";
import "./Loader.scss";
import classnames from "classnames";
import gsap from "gsap";

export interface Props extends Omit<BaseProps, "id"> {
  onFinishLoading: () => void;
}

const Loader: FunctionComponent<Props> = (props) => {
  const { onFinishLoading } = props;
  const loaderRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [loaded, setloaded] = useState(false);

  const timelineComplete = () => {
    setloaded(true);
    onFinishLoading();
  };

  const runTimeline = () => {
    const tl = gsap.timeline();
    tl.to(loaderRef.current, { duration: 1 });
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.3,
      onStart: () => setFading(true),
      onComplete: () => {
        timelineComplete();
      },
    });
  };

  useEffect(() => {
    runTimeline();
  }, []);

  return (
    <div
      className={classnames(props.className, { loaded, fading })}
      style={props.style}
      id="Loader"
      ref={loaderRef}
    >
      Loading...
    </div>
  );
};

Loader.defaultProps = {} as Partial<Props>;

export default Loader;
