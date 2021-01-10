import "./FooterSection.scss";
import React, { FunctionComponent, useContext, useEffect } from "react";
import SiteContext from "@/contexts/site-context";
import { SizeMeProps, withSize } from "react-sizeme";
import update from "immutability-helper";
import { graphql, useStaticQuery } from "gatsby";

export const FooterSection: FunctionComponent<SizeMeProps> = ({ size }) => {
  const { setSiteState } = useContext(SiteContext);

  const query = useStaticQuery(graphql`
    query {
      allMdx(filter: { fields: { collection: { eq: "about" } } }) {
        edges {
          node {
            frontmatter {
              name
              repoLink
            }
          }
        }
      }
    }
  `);

  const aboutData = query.allMdx.edges[0].node;
  const name = aboutData.frontmatter.name;
  const repoLink = aboutData.frontmatter.repoLink;

  useEffect(() => {
    setSiteState((prevState) =>
      update(prevState, {
        footerWidth: { $set: size.width! },
        footerHeight: { $set: size.height! },
      })
    );
  }, [size]);

  return <div className="FooterSection">
    <a
      className="FooterSection__content"
      href={repoLink}
      target="_blank"
    >
      Designed and built by {name}
    </a>
  </div>;
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 50,
})(FooterSection);
