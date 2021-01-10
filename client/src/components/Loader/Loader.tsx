import React, {
  FunctionComponent,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import { BaseProps } from "@/types";
import "./Loader.scss";
import classnames from "classnames";
import gsap from "gsap";
import SiteContext, { LoadStatus } from "@/contexts/site-context";
import update from "immutability-helper";
import * as Constants from "@/constants";

import DiamondLoader from "@/components/loaders/DiamondLoader";

export interface Props extends Omit<BaseProps, "id"> {}

const DURATION = 2;
const DELAY = 0.5;

const FADE_DURATION = 0.5;

const Loader: FunctionComponent<Props> = (props) => {
  const { setSiteState } = useContext(SiteContext);
  const loaderRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [loaded, setloaded] = useState(false);

  const runTimeline = () => {
    // Fade out the loader
    const tl = gsap.timeline();
    tl.to(loaderRef.current, {
      opacity: 0,
      delay: DURATION + DELAY - 0.6,
      duration: FADE_DURATION,
      onStart: () => setFading(true),
      onComplete: () => { 
        setSiteState((prevState) =>
          update(prevState, { loadStatus: { $set: LoadStatus.COMPLETED } })
        );  
        setloaded(true); 
      },
    });
  }

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
      <DiamondLoader
        duration={DURATION}
        delay={DELAY}
      />
    </div>
  );
};

Loader.defaultProps = {} as Partial<Props>;

export default Loader;
