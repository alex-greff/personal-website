import React, { FunctionComponent } from "react";
import "./LandingSection.scss";
import { BaseProps, DataProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { graphql, useStaticQuery } from "gatsby";
import { Parallax, Background } from "react-parallax";

import GradientDivider from "@/components/ui/dividers/GradientDivider/GradientDivider";
import BarBackground from "@/components/backgrounds/BarBackground";

export interface Props extends Omit<BaseProps, "id"> {}

const LandingSection: FunctionComponent<Props> = (props) => {
  const query = useStaticQuery(graphql`
    query {
      allMdx(filter: { fields: { collection: { eq: "about" } } }) {
        edges {
          node {
            frontmatter {
              name
              descriptive_words
            }
          }
        }
      }
    }
  `);

  const data = query.allMdx.edges[0].node;

  return (
    <FullPageSection
      className={classnames("LandingSection", props.className)}
      style={props.style}
      name="home"
    >
      <Parallax strength={500} className="LandingSection__parallax">
        <div className="LandingSection__content">
          <div className="LandingSection__name">{data.frontmatter.name}</div>
          <GradientDivider
            className="LandingSection__divider"
            orientation="horizontal"
            length="70rem"
          />
          <div className="LandingSection__descriptive-words-list">
            {data.frontmatter.descriptive_words.map(
              (word: string, idx: number) => {
                const firstItem = idx === 0;
                return (
                  <React.Fragment key={idx}>
                    {firstItem ? null : (
                      <div className="LandingSection__word-divider"></div>
                    )}
                    <div className="LandingSection__descriptive-word">{word}</div>
                  </React.Fragment>
                );
              }
            )}
          </div>
        </div>

        <Background className="LandingSection__paralax-bg">
          <BarBackground
            className="LandingSection__background"
            basePosition="left"
          />
        </Background>
      </Parallax>
    </FullPageSection>
  );
};

export default LandingSection;
