import * as React from "react";
import "./404.scss";

import FullPageSection from "@/components/wrappers/FullPageSection/FullPageSection";

const NotFoundPage = () => {
  return (
    <FullPageSection
      className="NotFound"
      name="404"
      accountForFooter={true}
      updateHash={false}
    >
      <div className="NotFound__content">
        <title className="NotFound__title">404 Page Not Found</title>
        <h1 className="NotFound__oops">Oops!</h1>
        <div className="NotFound__message">
          It looks like this page does not exist
        </div>
      </div>
    </FullPageSection>
  );
};

export default NotFoundPage;
