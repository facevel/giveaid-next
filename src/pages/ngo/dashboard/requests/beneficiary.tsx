import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const Beneficiary = () => {

  return (
    <>
      <h1>Beneficiary of Requests</h1>
    </>
  );
};

Beneficiary.pageLayout = NgoPageLayout;

export default Beneficiary;