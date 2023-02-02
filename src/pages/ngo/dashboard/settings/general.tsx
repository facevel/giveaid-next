import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const General = () => {

  return (
    <>
      <h1>
        NGO General Settings
      </h1>
    </>
  );
};

General.pageLayout = NgoPageLayout;

export default General;