import React, { FunctionComponent, useEffect, useRef } from "react";
import "./AboutSection.scss";
import { BaseProps } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";
import GradientDivider from "@/components/ui/dividers/GradientDivider/GradientDivider";
import LinkItem from "@/components/items/LinkItem";

export interface Props extends Omit<BaseProps, "id"> {};

const AboutSection: FunctionComponent<Props> = (props) => {
  const query = useStaticQuery(graphql`
    query {
      profileImage: file(relativePath: { eq: "profile-picture.png" }) {
        childImageSharp {
          gatsbyImageData(maxWidth: 2048, layout: FLUID, placeholder: TRACED_SVG)
        }
      }

      allMdx(filter: { fields: { collection: { eq: "about" } } }) {
        edges {
          node {
            frontmatter {
              bio
              links {
                link
                type
              }
              skills {
                items
                type
              }
            }
          }
        }
      }
    }
  `);

  const profileImageData = getImage(query.profileImage);
  const aboutData = query.allMdx.edges[0].node;

  const links: { type: string, link: string }[] = aboutData.frontmatter.links;
  const skills: { type: string, items: string[] }[] = aboutData.frontmatter.skills;

  return (
    <FullPageSection 
      className={classnames("AboutSection", props.className)}
      style={props.style}
      name="about"
    >
      <ContentWrapper wideness="thin">
        <div className="AboutSection__main-content">
          <div className="AboutSection__profile-pic-container">
            <div className="AboutSection__profile-pic-subcontainer">
              <GatsbyImage image={profileImageData!} alt="Profile Image" />
            </div>
          </div>
          <div className="AboutSection__header-container">
            <div className="AboutSection__header-subcontainer">
              <div className="AboutSection__title">About Me</div>
              <div className="AboutSection__links">
                {links.map((link, idx) => (
                  <LinkItem key={`link-${idx}`} iconType={link.type} to={link.link} />
                ))}
              </div>
            </div>
            <GradientDivider className="AboutSection__divider AboutSection__divider-desktop" gradientFade="right" />
            <GradientDivider className="AboutSection__divider AboutSection__divider-mobile" gradientFade="left-right" />
          </div>
          <div className="AboutSection__bio">
            {aboutData.frontmatter.bio}
          </div>
        </div>

        {/* <div
          data-sal="entrance-up"
          style={{
            "--sal-duration": "1s"
          }}
        >
          About Section
        </div> */}
      </ContentWrapper>
    </FullPageSection>
  );
};

export default AboutSection;