import React, { FunctionComponent } from "react";
import { BaseProps } from "@/types";
import "./LinkItem.scss";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";

import { definition as faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { definition as faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { definition as faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { definition as faSoundcloud } from "@fortawesome/free-brands-svg-icons/faSoundcloud";
import { definition as faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";
import { definition as faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { definition as faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { definition as faPinterest } from "@fortawesome/free-brands-svg-icons/faPinterest";
import { definition as faSnapchat } from "@fortawesome/free-brands-svg-icons/faSnapchat";
import { definition as faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { definition as faVimeo } from "@fortawesome/free-brands-svg-icons/faVimeo";
import { definition as faDocker } from "@fortawesome/free-brands-svg-icons/faDocker";
import { definition as faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { definition as faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { definition as faLink } from "@fortawesome/free-solid-svg-icons/faLink";

const ICON_MAPPINGS = {
  github: faGithub,
  linkedin: faLinkedin,
  email: faEnvelope,
  soundcloud: faSoundcloud,
  website: faExternalLinkAlt,
  facebook: faFacebook,
  instagram: faInstagram,
  pinterest: faPinterest,
  snapchat: faSnapchat,
  youtube: faYoutube,
  vimeo: faVimeo,
  docker: faDocker,
  twitter: faTwitter,
  download: faDownload,
  default: faLink,
} as { [icon: string]: any};

export interface Props extends BaseProps {
  style?: Omit<React.CSSProperties, "width" | "height">;
  iconType: string;
  to: string;
  newTab?: boolean;
  size?: string;
}

const getIconMapping = (iconType: string) => {
  const iconMapping = ICON_MAPPINGS[iconType];
  return (iconMapping) ? iconMapping : ICON_MAPPINGS["default"];
};

const LinkItem: FunctionComponent<Props> = (props) => {
  const { iconType, to, newTab, size } = props;

  const icon = getIconMapping(iconType);

  return (
    <a
      className={classnames("LinkItem", props.className)}
      style={{...props.style, width: size, height: size }}
      id={props.id}
      href={to}
      // href='mailto:kjcoco13@gmail.com'
      target={newTab ? "_blank" : "_self"}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

LinkItem.defaultProps = {
  newTab: true,
  size: "2rem"
} as Partial<Props>;

export default LinkItem;
