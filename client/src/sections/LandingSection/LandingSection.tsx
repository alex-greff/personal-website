import React, { FunctionComponent, useEffect, useRef } from "react";
import "./LandingSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import ScrollReveal from "scrollreveal";
import * as Utilities from "@/utilities";

export interface Props extends Omit<BaseProps, "id"> {};

const LandingSection: FunctionComponent<Props> = (props) => {
  const revealRef = useRef(null);

  useEffect(() => {
    ScrollReveal().reveal(revealRef.current!, Utilities.srConfig());
  }, []);

  return (
    <FullPageSection 
      className={classnames("LandingSection", props.className)}
      style={props.style}
      id="home"
    >
      <div
        // data-sal="entrance-up"
        // style={{
        //   "--sal-duration": "1s"
        // }}
        ref={revealRef}
      >
        Landing Section
      </div>
    </FullPageSection>
  );
};

export default LandingSection;