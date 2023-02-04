// @flow
import * as React from "react";
import {NgoPageLayout} from "layouts";
import {router} from "next/client";

const NgoPage = () => {
    return (
        <section className={"min-h-screen"}>
            <div className={'w-full h-20 bg-green-600'}>
                <div className={'container flex flex-row h-full w-full mx-auto items-center justify-start px-4'}>
                    <div className={"flex flex-row items-end gap-1"}>
                        <img src={"/giveaid-logo.svg"} alt={"Give Aid Logo"} />
                        <span className={"text-sm font-bold text-white mb-1"}>
                    NGO
                </span>
                    </div>
                </div>
            </div>

        </section>


    );
};

// NgoPage.pageLayout = NgoPageLayout;

export default NgoPage;
