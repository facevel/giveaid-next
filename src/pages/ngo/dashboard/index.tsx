// @flow
import * as React from "react";
import { CardBarChart, CardLineChart } from "components";
import { withProtectedForNGO } from "@/firebase/routes";
import { ReactNode } from "react";
import { NgoPageLayout } from "layouts";
import {HiArchive} from "react-icons/hi";
import {BsStarFill} from "react-icons/bs";
import {FaDonate, FaRecycle} from "react-icons/fa";



const NgoPage = () => {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
          <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
            <div className="flex-auto p-4" data-read-aloud-multi-block="true">
              <div className="flex flex-wrap">
                <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                  <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                    Items Received
                  </h5>
                  <span className="text-blueGray-700 text-xl font-semibold">
                    350
                  </span>
                </div>
                <div className="relative w-auto flex-initial pl-4">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500 p-3 text-center text-white shadow-lg">
                    <i className="far fa-chart-bar"><HiArchive/></i>
                  </div>
                </div>
              </div>
              <p className="text-blueGray-400 mt-4 text-sm">
                <span className="mr-2 text-emerald-500">
                  <i className="fas fa-arrow-up"></i> +34.8%
                </span>
                <span className="whitespace-nowrap">compared to last month.</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
          <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
            <div className="flex-auto p-4" data-read-aloud-multi-block="true">
              <div className="flex flex-wrap">
                <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                  <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                    NGO Rating
                  </h5>
                  <span className="text-blueGray-700 text-xl font-semibold">
                    4.7/5
                  </span>
                </div>
                <div className="relative w-auto flex-initial pl-4">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 p-3 text-center text-white shadow-lg">
                    <i className="fas fa-chart-pie"><BsStarFill/></i>
                  </div>
                </div>
              </div>
              <p className="text-blueGray-400 mt-4 text-sm">
                <span className="mr-2 text-red-500">
                  <i className="fas fa-arrow-down"></i> -2.91%
                </span>
                <span className="whitespace-nowrap">compared to last month.   </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
          <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
            <div className="flex-auto p-4" data-read-aloud-multi-block="true">
              <div className="flex flex-wrap">
                <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                  <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                    Waste Averted
                  </h5>
                  <span className="text-blueGray-700 text-xl font-semibold">
                    400 KG
                  </span>
                </div>
                <div className="relative w-auto flex-initial pl-4">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 p-3 text-center text-white shadow-lg">
                    <i className="fas fa-users"><FaRecycle/></i>
                  </div>
                </div>
              </div>
              <p className="text-blueGray-400 mt-4 text-sm">
                <span className="mr-2 text-green-500">
                  <i className="fas fa-arrow-down"></i> +12.13%
                </span>
                <span className="whitespace-nowrap">compared to last month.</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
          <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
            <div className="flex-auto p-4" data-read-aloud-multi-block="true">
              <div className="flex flex-wrap">
                <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                  <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                    New First Time Donors
                  </h5>
                  <span className="text-blueGray-700 text-xl font-semibold">
                    11
                  </span>
                </div>
                <div className="relative w-auto flex-initial pl-4">
                  <div
                    className="bg-yellow-700 inline-flex h-12 w-12 items-center justify-center rounded-full p-3 text-center text-white shadow-lg">
                    <i className="fas fa-percent"><FaDonate/></i>
                  </div>
                </div>
              </div>
              <p className="text-blueGray-400 mt-4 text-sm">
                <span className="mr-2 text-emerald-500">
                  <i className="fas fa-arrow-up"></i> +11%
                </span>
                <span className="whitespace-nowrap">compared to last month.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap">
        <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
          <CardLineChart />
        </div>

        <div className="w-full px-4 xl:w-4/12">
          <CardBarChart />
        </div>
      </div>
    </div>
  );
};

NgoPage.pageLayout = NgoPageLayout;


// export default withProtectedForNGO(NgoPage);
export default NgoPage;
