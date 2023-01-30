import {HeadingView} from "@/components/HeadingView";
import {TrackingView} from "@/components/trackingView";
import React, {useState} from "react";

export default function TrackingPage() {
    const [searchStatus, setSearch] = useState(false);

    return (
        <>
            <div className={"container mx-auto flex flex-col justify-center items-center"}>
                <HeadingView title={"Tracking"} className={"text-center"}
                             description={"Track your donations and see how much you have donated."}/>

                <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    <form className={"mt-7"}>
                        <div className="mb-6">
                            <div
                                className="after:block after:bg-black after:w-[1px] after:h-10 after:mx-auto after:my-5">
                                <label htmlFor="text"
                                       className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Tracking ID</label>
                                <div className={"flex space-x-6 text-gray-500 justify-center items-center"}>
                                    <input type="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Dwarka, New Delhi" required/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={"pt-12 mx-6"}>
                    <div className={`${searchStatus ? "" : "hidden"}`}>
                    <TrackingView/>
                    </div>
                </div>
            </div>
        </>
    )
}