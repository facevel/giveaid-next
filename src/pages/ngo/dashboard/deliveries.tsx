import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const DeliveryManage = () => {

  return (
    <>
      <h1>Deliveries</h1>
    </>
  );
};

DeliveryManage.pageLayout = NgoPageLayout;

export default DeliveryManage;