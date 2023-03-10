import { TrackingView } from "@/components/trackingView";
import React, { useState } from "react";
import { TabsLayout } from "@/layouts";

function TrackingPage() {
    const [searchStatus, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
      <>
          <div
            className={
                "container mx-auto flex flex-col items-center justify-center"
            }
          >
              <section className="bg-white dark:bg-gray-900">
                  <div
                    className={`${
                      searchStatus ? "" : ""
                    } mx-auto max-w-screen-xl py-8 px-4 text-center lg:py-16 lg:px-12`}
                  >
                      <p
                        className="text-4xl font-extrabold leading-loose leading-none tracking-tight text-gray-900 dark:text-white md:mb-4 md:text-5xl lg:text-6xl">
                          Realtime Tracking
                      </p>

                      <p
                        className="text-4xl font-extrabold leading-loose leading-none tracking-tight text-gray-900 dark:text-white md:mb-4 md:text-5xl lg:text-6xl">
                          <strong className={"text-green-600"}>Globally</strong>
                      </p>
                      <p
                        className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"></p>
                      <div
                        className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 lg:mb-16">
                          <a
                            href="#"
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 py-3 px-5 text-center text-base font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                          >
                              Learn more
                              <svg
                                className="ml-2 -mr-1 h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                              </svg>
                          </a>
                      </div>
                      <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                          {!searchStatus && (
                            <form
                              className={"mt-7"}
                              onSubmit={(e) => {
                                  e.preventDefault();
                              }}
                            >
                                <div className="mb-6">
                                    <label
                                      htmlFor="text"
                                      className="mb-2 block text-sm font-medium text-gray-500 dark:text-white"
                                    >
                                        Waybill Number
                                    </label>
                                    <div
                                      className={
                                          "flex items-center justify-center space-x-6 text-gray-500"
                                      }
                                    >
                                        <input
                                          type="number"
                                          id="email"
                                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                          placeholder="1234455677"
                                        />
                                    </div>
                                    <button
                                      onClick={() => {
                                          setLoading(true);
                                          setTimeout(() => {
                                              setSearch(true);
                                              setLoading(false);
                                          }, 1500);
                                      }}
                                      className="my-5 inline-flex items-center justify-center rounded-lg bg-green-600 py-3 px-5 text-center text-base font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                                    >
                                        Track
                                        <svg
                                          className="ml-2 -mr-1 h-5 w-5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                              fillRule="evenodd"
                                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                          )}
                      </div>
                  </div>
              </section>

              <div className={"mx-6 mb-20 pt-12"}>
                  {loading && (
                    <svg
                      aria-hidden="true"
                      className="mr-2 inline h-8 w-8 animate-spin fill-green-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                    </svg>
                  )}
                  {searchStatus && !loading && <TrackingView setSearch={setSearch} />}
              </div>
          </div>
      </>
    );
}

TrackingPage.pageLayout = TabsLayout

export default TrackingPage