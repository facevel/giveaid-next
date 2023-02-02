import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const ManageRequests = () => {

  return (
      <>
        <h1>Manage Requests</h1>
      </>
  );
};

ManageRequests.pageLayout = NgoPageLayout;

export default ManageRequests;