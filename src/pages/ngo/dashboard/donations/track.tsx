import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const DonationTracking = () => {

  return (
    <>
      <h1>Donation Track</h1>
    </>
  );
};

DonationTracking.pageLayout = NgoPageLayout;

export default DonationTracking;