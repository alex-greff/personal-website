import React, { FunctionComponent } from "react";
import "./LandingSection.scss";
import { BaseProps, DataProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { graphql, useStaticQuery } from "gatsby";

import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";
import GradientDivider from "@/components/ui/dividers/GradientDivider/GradientDivider";

export interface Props extends Omit<BaseProps, "id"> {}

const LandingSection: FunctionComponent<Props> = (props) => {
  const query = useStaticQuery(graphql`
    query MyQuery {
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
      accountForNav={true}
    >
      <ContentWrapper accountForNav={true}>
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
                <>
                  {firstItem ? null : (
                    <div className="LandingSection__word-divider"></div>
                  )}
                  <div className="LandingSection__descriptive-word">{word}</div>
                </>
              );
            }
          )}
        </div>
      </ContentWrapper>

      {/* TODO: remove */}
      {/* <div
        data-sal="entrance-up"
        style={{
          "--sal-duration": "1s",
        }}
        // ref={revealRef}
      >
        Landing Section
      </div> */}
    </FullPageSection>
  );
};

export default LandingSection;
