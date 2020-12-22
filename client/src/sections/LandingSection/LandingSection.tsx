import React, { FunctionComponent, useEffect, useRef, useContext } from "react";
import "./LandingSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import ScrollReveal from "scrollreveal";
import * as Utilities from "@/utilities";
import SiteContext from "@/contexts/site-context";

export interface Props extends Omit<BaseProps, "id"> {}

const LandingSection: FunctionComponent<Props> = (props) => {
  const { siteState } = useContext(SiteContext);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Here");
    ScrollReveal().reveal(revealRef.current!, Utilities.srConfig());
    // if (revealRef.current) {
    //   console.log("Here");
    //   ScrollReveal().reveal(revealRef.current!, Utilities.srConfig());
    // }
  }, []);

  // const test = (el: HTMLDivElement | null) => {
  //   // revealRef = el!;
  //   console.log("Here", el);
  //   ScrollReveal().reveal(el!, Utilities.srConfig());
  //   // ScrollReveal().reveal(revealRef.current!, Utilities.srConfig());
  // };

  return (
    <FullPageSection
      className={classnames("LandingSection", props.className)}
      style={props.style}
      id="home"
    >
      {/* {(siteState.loadCompleted) ? (<div
        // data-sal="entrance-up"
        // style={{
        //   "--sal-duration": "1s"
        // }}
        // ref={revealRef}
        ref={test}
      >
        Landing Section
      </div>) : null} */}

      <div
        // data-sal="entrance-up"
        // style={{
        //   "--sal-duration": "1s",
        // }}
        ref={revealRef}
      >
        Landing Section
      </div>
    </FullPageSection>
  );
};

export default LandingSection;
