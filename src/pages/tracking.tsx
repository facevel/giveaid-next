import { HeadingView } from "@/components/HeadingView";
import { TrackingView } from "@/components/trackingView";
import React, { useState } from "react";
import { TabsLayout } from "layout";

const TrackingPage = () => {
  const [searchStatus, setSearch] = useState(false);

  return (
    <>
      <div
        className={
          "container mx-auto flex flex-col items-center justify-center"
        }
      >
        <HeadingView
          title={"Tracking"}
          className={"text-center"}
          description={
            "Track your donations and see how much you have donated."
          }
        />

        <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <form className={"mt-7"}>
            <div className="mb-6">
              <div className="after:mx-auto after:my-5 after:block after:h-10 after:w-[1px] after:bg-transparent after:border-r-2 after:border-dashed after:border-black">
                <label
                  htmlFor="text"
                  className="mb-2 block text-sm font-medium text-gray-500 dark:text-white"
                >
                  Tracking ID
                </label>
                <div
                  className={
                    "flex items-center justify-center space-x-6 text-gray-500"
                  }
                >
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Dwarka, New Delhi"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className={"mx-6 pt-12"}>
          <div className={`${searchStatus ? "" : "hidden"}`}>
            <TrackingView />
          </div>
        </div>
      </div>
    </>
  );
};

TrackingPage.pageLayout = TabsLayout;

export default TrackingPage;
