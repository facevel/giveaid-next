import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const Reports = () => {

  return (
    <>
      <h1>
        Donation Reports
      </h1>
    </>
  );
};

Reports.pageLayout = NgoPageLayout;

export default Reports;