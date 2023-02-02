import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const DonationDonors = () => {

  return (
    <>
      <h1>Donation Donors</h1>
    </>
  );
};

DonationDonors.pageLayout = NgoPageLayout;

export default DonationDonors;