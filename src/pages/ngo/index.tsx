// @flow
import * as React from "react";
import { NgoPageLayout } from "layouts";
import { CardBarChart, CardLineChart, GoogleButton } from "components";

const NgoPage = () => {
  return (
    <div className={'flex flex-col justify-start items-center w-full min-h-[calc(100vh-10rem)]'}>
      <div className={'my-10'}>
        <h1 className={'text-5xl leading- font-extrabold text-center'}>
          Become a part of the Give Aid community,
          <br />
          and help us make a difference.
        </h1>

      </div>

    </div>
  );
};

NgoPage.pageLayout = NgoPageLayout;

export default NgoPage;
