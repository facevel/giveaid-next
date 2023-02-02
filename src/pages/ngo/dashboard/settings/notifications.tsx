import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const Notifications = () => {

  return (
    <>
      <h1>
        NGO Notifications Settings
      </h1>
    </>
  );
};

Notifications.pageLayout = NgoPageLayout;

export default Notifications;