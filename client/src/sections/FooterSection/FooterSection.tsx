import "./FooterSection.scss";
import React, { FunctionComponent, useContext, useEffect } from "react";
import SiteContext from "@/contexts/site-context";
import { SizeMeProps, withSize } from "react-sizeme";
import update from "immutability-helper";

export const FooterSection: FunctionComponent<SizeMeProps> = ({ size }) => {
  const { setSiteState } = useContext(SiteContext);

  useEffect(() => {
    setSiteState((prevState) =>
      update(prevState, {
        footerWidth: { $set: size.width! },
        footerHeight: { $set: size.height! },
      })
    );
  }, [size]);

  return <div className="FooterSection">Footer</div>;
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 50,
})(FooterSection);
