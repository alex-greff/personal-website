import "./FooterSection.scss";
import React, { FunctionComponent, useContext, useEffect } from "react";
import FooterContext from "@/contexts/footer-context";
import { SizeMeProps, withSize } from "react-sizeme";

export const FooterSection: FunctionComponent<SizeMeProps> = ({ size }) => {
  const { setFooterState } = useContext(FooterContext);

  useEffect(() => {
    setFooterState({
      width: size.width!,
      height: size.height!
    });
  }, [size]);

  return (
    <div className="FooterSection">
      Footer
    </div>
  )
};

export default withSize({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 50
})(FooterSection);