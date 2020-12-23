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

export interface Props extends Omit<BaseProps, "id"> {}

const Loader: FunctionComponent<Props> = (props) => {
  const { setSiteState } = useContext(SiteContext);
  const loaderRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [loaded, setloaded] = useState(false);

  const runTimeline = () => {
    const tl = gsap.timeline();
    tl.to(loaderRef.current, {
      duration: 1,
      onComplete: () => {
        setSiteState((prevState) =>
          update(prevState, { loadStatus: { $set: LoadStatus.FADING } })
        );
      },
    });
    // Fade out the loader
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.3,
      onStart: () => setFading(true),
      onComplete: () => { 
        setSiteState((prevState) =>
          update(prevState, { loadStatus: { $set: LoadStatus.COMPLETED } })
        );  
        setloaded(true); 
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
