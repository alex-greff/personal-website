import React, { FunctionComponent, useEffect, useRef } from "react";
import "./AboutSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import ScrollReveal from "scrollreveal";

export interface Props extends Omit<BaseProps, "id"> {};

const AboutSection: FunctionComponent<Props> = (props) => {

  const revealRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // console.log("Here");
  //   // ScrollReveal().reveal(revealRef.current!, Utilities.srConfig());
  //   if (revealRef.current) {
  //     console.log("Here");
  //     ScrollReveal().reveal(revealRef.current!, Utilities.srConfig());
  //   }
  // }, []);

  return (
    <FullPageSection 
      className={classnames("AboutSection", props.className)}
      style={props.style}
      id="about"
    >
      <div
        data-sal="entrance-up"
        style={{
          "--sal-duration": "1s"
        }}
        // ref={revealRef}
      >
        About Section
      </div>
    </FullPageSection>
  );
};

export default AboutSection;