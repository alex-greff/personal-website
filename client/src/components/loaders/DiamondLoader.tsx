import React, { FunctionComponent, useRef, useEffect, useMemo } from "react";
import { BaseProps } from "@/types";
import "./DiamondLoader.scss";
import classnames from "classnames";
import gsap from "gsap";

export interface Props extends BaseProps {
  duration: number;
  delay: number;
}

const GAP_VERT = 6;
const GAP_HORIZ = 6;
const OFFSET_VERT = 40;
const OFFSET_HORIZ = 100;
const EASING = "power4.inOut";

const DiamondLoader: FunctionComponent<Props> = (props) => {
  const { duration, delay } = props;
  const diamondRefs = useMemo(
    () =>
      Array(4)
        .fill(0)
        .map((i) => React.createRef<HTMLDivElement>()),
    []
  );
  const baseRef = useRef(null);

  const runStage1 = () => {
    // Top
    const tlTop = gsap.timeline();
    tlTop.fromTo(
      diamondRefs[0].current,
      { opacity: 0, top: -(OFFSET_VERT + GAP_VERT / 2) },
      { opacity: 1, top: -GAP_VERT / 2, duration, ease: EASING, delay }
    );

    // Bottom
    const tlBtm = gsap.timeline();
    tlBtm.fromTo(
      diamondRefs[2].current,
      { opacity: 0, bottom: -(OFFSET_VERT + GAP_VERT / 2) },
      { opacity: 1, bottom: -GAP_VERT / 2, duration, ease: EASING, delay }
    );

    // Right
    const tlRgt = gsap.timeline();
    tlRgt.fromTo(
      diamondRefs[1].current,
      { opacity: 0, right: -(OFFSET_HORIZ + GAP_HORIZ / 2) },
      { opacity: 1, right: -GAP_HORIZ / 2, duration, ease: EASING, delay }
    );

    // Left
    const tlLft = gsap.timeline();
    tlLft.fromTo(
      diamondRefs[3].current,
      { opacity: 0, left: -(OFFSET_HORIZ + GAP_HORIZ / 2) },
      { opacity: 1, left: -GAP_HORIZ / 2, duration, ease: EASING, delay }
    );

    // Base
    const tlBase = gsap.timeline();
    tlBase.to(baseRef.current, {
      scale: 0,
      rotateZ: "+=90",
      delay: Math.max(duration + delay - 1, 0),
      duration: 0.5,
      ease: "back.in(2)",
    });
  };

  useEffect(() => {
    runStage1();
  }, []);

  const renderDiamond = (direction: string, idx: number) => {
    return (
      <div
        className={classnames("DiamondLoader__diamond", direction)}
        ref={diamondRefs[idx]}
      ></div>
    );
  };

  return (
    <div
      className={classnames("DiamondLoader", props.className)}
      style={props.style}
      id={props.id}
      ref={baseRef}
    >
      {renderDiamond("top", 0)}
      {renderDiamond("right", 1)}
      {renderDiamond("bottom", 2)}
      {renderDiamond("left", 3)}
    </div>
  );
};

DiamondLoader.defaultProps = {} as Partial<Props>;

export default DiamondLoader;
