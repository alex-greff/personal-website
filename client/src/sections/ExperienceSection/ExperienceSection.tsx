import React, { FunctionComponent, useEffect, useRef, useMemo } from "react";
import "./ExperienceSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { sr, srConfig } from "@/utilities";
import { graphql, useStaticQuery } from "gatsby";
import "datejs";

import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";
import GradientDivider from "@/components/ui/dividers/GradientDivider/GradientDivider";
import Timeline, {
  TimelineItemData,
} from "@/components/visualization/Timeline/Timeline";

export interface Props extends Omit<BaseProps, "id"> {}

const ExperienceSection: FunctionComponent<Props> = (props) => {
  const query = useStaticQuery(graphql`
    query {
      allMdx(filter: { fields: { collection: { eq: "experience" } } }) {
        edges {
          node {
            frontmatter {
              title
              subtitle
              startDate
              endDate
              accentColor
            }
            body
          }
        }
      }
    }
  `);

  const titleRef = useRef(null);
  const dividerRef = useRef(null);

  const timelineData = useMemo<TimelineItemData[]>(() => {
    const experiencesData = query.allMdx.edges as any[];

    // Note: the data is not sorted, the Timeline component does this

    const timelineData = experiencesData.reduce(
      (acc: TimelineItemData[], currNode) => {
        const currData = currNode.node;
        const currTimelineData: TimelineItemData = {
          title: currData.frontmatter.title,
          subtitle: currData.frontmatter.subtitle,
          startDate: Date.parse(currData.frontmatter.startDate),
          endDate: currData.frontmatter.endDate
            ? Date.parse(currData.frontmatter.endDate)
            : null,
          accentColor: currData.frontmatter.accentColor,
          mdxContent: currData.body,
        };

        return [...acc, currTimelineData];
      },
      [] as TimelineItemData[]
    );

    return timelineData;
  }, [query.allMdx]);

  // Scroll revealing
  useEffect(() => {
    const refs = [ titleRef, dividerRef ];
    for (const currRef of refs)
      sr?.reveal(currRef.current!, srConfig());
  }, []);

  return (
    <FullPageSection
      className={classnames("ExperienceSection", props.className)}
      style={props.style}
      name="experience"
    >
      <ContentWrapper wideness="wide">
        <div className="ExperienceSection__content">
          <div className="ExperienceSection__title" ref={titleRef}>
            Experience &#38; Education
          </div>
          <GradientDivider
            ref={dividerRef}
            className="ExperienceSection__divider"
            gradientFade="left-right"
            length="80rem"
          />
          <Timeline
            className="ExperienceSection__timeline"
            timelineData={timelineData}
            scrollAnimate={true}
          />
        </div>
      </ContentWrapper>
    </FullPageSection>
  );
};

export default ExperienceSection;
