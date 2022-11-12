import React, { FunctionComponent, useEffect, useRef } from "react";
import "./AboutSection.scss";
import { BaseProps, LinkItem, SkillItem } from "@/types";
import classnames from "classnames";
import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";
import * as Utilities from "@/utilities";
import { sr, srConfig } from "@/utilities";
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
            width: 2048
            placeholder: BLURRED
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

  const titleRef = useRef(null);
  const linksRef = useRef(null);
  const dividerRef = useRef(null);
  const headerRef = useRef(null);
  const bioRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const profilePicRef = useRef(null);

  const profileImageData = getImage(query.profileImage);
  const aboutData = query.allMdx.edges[0].node;

  const links: LinkItem[] = aboutData.frontmatter.links;
  const skills: SkillItem[] = aboutData.frontmatter.skills;

  // Scroll revealing
  useEffect(() => {
    const refs = [
      titleRef,
      linksRef,
      dividerRef,
      headerRef,
      bioRef,
      aboutRef,
      skillsRef,
      profilePicRef
    ];
    for (const currRef of refs) sr?.reveal(currRef.current!, srConfig());
  }, []);

  return (
    <FullPageSection
      className={classnames("AboutSection", props.className)}
      style={props.style}
      name="about"
    >
      <ContentWrapper wideness="thin" centered={true}>
        <div className="AboutSection__main-content">
          <div className="AboutSection__profile-pic-container">
            <div
              className="AboutSection__profile-pic-subcontainer"
              ref={profilePicRef}
            >
              <GatsbyImage image={profileImageData!} alt="Profile Image" />
            </div>
          </div>
          <div className="AboutSection__header-container" ref={headerRef}>
            <div className="AboutSection__header-subcontainer">
              <div className="AboutSection__title" ref={titleRef}>
                About Me
              </div>
              <div className="AboutSection__links" ref={linksRef}>
                {links.map((link, idx) => (
                  <LinkIcon key={`link-${idx}`} link={link} />
                ))}
              </div>
            </div>
            <GradientDivider
              ref={dividerRef}
              className="AboutSection__divider AboutSection__divider-desktop"
              gradientFade="right"
            />
            <GradientDivider
              className="AboutSection__divider AboutSection__divider-mobile"
              gradientFade="left-right"
            />
          </div>
          <div className="AboutSection__bio" ref={bioRef}>
            {aboutData.frontmatter.bio}
          </div>
        </div>

        <div className="AboutSection__about-content" ref={aboutRef}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{aboutData.body}</MDXRenderer>
          </MDXProvider>
        </div>

        <div className="AboutSection__skills" ref={skillsRef}>
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
      </ContentWrapper>
    </FullPageSection>
  );
};

export default AboutSection;
