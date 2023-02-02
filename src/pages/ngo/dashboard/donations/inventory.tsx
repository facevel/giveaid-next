import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const DonationInventory = () => {

  return (
    <>
      <h1>Donation Inventory</h1>
    </>
  );
};

DonationInventory.pageLayout = NgoPageLayout;

export default DonationInventory;