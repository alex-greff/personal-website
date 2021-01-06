import React, { FunctionComponent, useEffect, useRef } from "react";
import "./AboutSection.scss";
import { BaseProps, LinkItem, SkillItem } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";

import ContentWrapper from "@/components/wrappers/ContentWrapper/ContentWrapper";
import GradientDivider from "@/components/ui/dividers/GradientDivider/GradientDivider";
import LinkIcon from "@/components/link/LinkIcon";
import SkillDisplay from "@/components/visualization/SkillDisplay/SkillDisplay";

const shortcodes = { Link };

export interface Props extends Omit<BaseProps, "id"> {}

const AboutSection: FunctionComponent<Props> = (props) => {
  const query = useStaticQuery(graphql`
    query {
      profileImage: file(relativePath: { eq: "profile-picture.png" }) {
        childImageSharp {
          gatsbyImageData(
            maxWidth: 2048
            layout: FLUID
            placeholder: TRACED_SVG
          )
        }
      }

      allMdx(filter: { fields: { collection: { eq: "about" } } }) {
        edges {
          node {
            body
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

  const links: LinkItem[] = aboutData.frontmatter.links;
  const skills: SkillItem[] = aboutData.frontmatter.skills;

  return (
    <FullPageSection
      className={classnames("AboutSection", props.className)}
      style={props.style}
      name="about"
    >
      <ContentWrapper wideness="thin" centered={true}>
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
                  <LinkIcon key={`link-${idx}`} link={link} />
                ))}
              </div>
            </div>
            <GradientDivider
              className="AboutSection__divider AboutSection__divider-desktop"
              gradientFade="right"
            />
            <GradientDivider
              className="AboutSection__divider AboutSection__divider-mobile"
              gradientFade="left-right"
            />
          </div>
          <div className="AboutSection__bio">{aboutData.frontmatter.bio}</div>
        </div>

        <div className="AboutSection__about-content">
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{aboutData.body}</MDXRenderer>
          </MDXProvider>
        </div>

        <div className="AboutSection__skills">
          <div className="AboutSection__skill-title">
            Skills and Technologies:
          </div>
          <div className="AboutSection__skill-list">
            {skills.map((skill, idx) => (
              <SkillDisplay 
                key={`skill-${idx}`} 
                className="AboutSection__skill-item"
                skill={skill} 
              />
            ))}
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
