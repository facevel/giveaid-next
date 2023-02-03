// @flow
import * as React from "react";
import { NgoPageLayout } from "layouts";
import { CardBarChart, CardLineChart, GoogleButton } from "components";

const NgoPage = () => {
  return (
    <div className={'flex flex-col justify-start items-center w-full min-h-[calc(100vh-10rem)]'}>
        <h1 className={"text-4xl font-bold mt-16"}><span className={"text-green-500 text-5xl font-black"}>Empower Your Cause:</span> Register Your Charity to Receive Donations Today!</h1>

        <img src={"./charity.jpg"} className={"max-w-2xl mt-6"}></img>
    </div>

  );
};

NgoPage.pageLayout = NgoPageLayout;

export default NgoPage;
