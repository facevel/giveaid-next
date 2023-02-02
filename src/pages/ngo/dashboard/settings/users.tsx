import * as React from "react";
import { NgoPageLayout } from "layouts";
import { withProtectedForNGO } from "@/firebase/routes";


const Users = () => {

  return (
    <>
      <h1>
        NGO Users
      </h1>
    </>
  );
};

Users.pageLayout = NgoPageLayout;

export default Users;