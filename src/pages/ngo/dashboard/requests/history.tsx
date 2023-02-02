import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const RequestsHistory = () => {

  return (
    <>
      <h1>Requests History</h1>
    </>
  );
};

RequestsHistory.pageLayout = NgoPageLayout;

export default RequestsHistory;