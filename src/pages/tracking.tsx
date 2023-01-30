import {TrackingView} from "@/components/trackingView";
import React, {useState} from "react";

export default function TrackingPage() {
    const [searchStatus, setSearch] = useState(false);

    return (
        <>
            <div className={"container mx-auto flex flex-col justify-center items-center"}>

                <section className="bg-white dark:bg-gray-900">
                    <div
                        className={`${searchStatus ? "" : ""} py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12`}>
                        <p className="md:mb-4 text-4xl font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Realtime
                            Tracking</p>

                        <p className="md:mb-4 text-4xl font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                            <strong className={"text-green-600"}>Globally</strong></p>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"></p>
                        <div
                            className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <a href="#"
                               className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                                Learn more
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                            {!searchStatus && (
                                <form className={"mt-7"} onSubmit={(e) => {
                                    e.preventDefault();
                                }
                                }>
                                    <div className="mb-6">
                                        <label htmlFor="text"
                                               className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Waybill
                                            Number</label>
                                        <div className={"flex space-x-6 text-gray-500 justify-center items-center"}>
                                            <input type="number" id="email"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-400"
                                                   placeholder="1234455677"/>
                                        </div>
                                        <button onClick={() => {
                                            setSearch(true);
                                        }}
                                                className="inline-flex my-5 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                                            Track
                                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                <div className={"pt-12 mx-6"}>
                    <div className={`${searchStatus ? "" : "hidden"}`}>
                        <TrackingView setSearch={setSearch}/>
                    </div>
                </div>
            </div>
        </>
    )
}