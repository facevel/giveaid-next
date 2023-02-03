// @flow
import * as React from "react";
import {NgoPageLayout} from "layouts";
import {router} from "next/client";

const NgoPage = () => {
    return (
        <section className={"min-h-screen"}>
            <div className={'flex flex-col justify-start items-center w-full min-h-[calc(100vh-10rem)]'}>
                <h1 className={"text-4xl font-bold mt-16"}><span className={"text-green-500 text-5xl"}>Empower Your Cause:</span> Register
                    Your Charity to Receive Donations Today!</h1>
                <img src={"./charity.jpg"} className={"max-w-2xl mt-6"}></img>
            </div>
            <div
                className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <button onClick={()=>{}}
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                    Get Started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </section>


    );
};

NgoPage.pageLayout = NgoPageLayout;

export default NgoPage;
