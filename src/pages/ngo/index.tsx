// @flow
import * as React from "react";
import {router} from "next/client";
import {useEffect, useState} from "react";
import {GoogleButton, Modal} from "components";
import {useUserContext} from "@/firebase/authContext";
import {useRouter} from "next/router";

const NgoPage = () => {

    const { user, logout, loggingIn, isAuthLoading  } = useUserContext();

    const [getStartedModal, setGetStartedModal] = useState(false);

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if( !isAuthLoading && user){
            setGetStartedModal(false)
            //after login the user will be sent to dashboard
            router.push('/ngo/dashboard')
        }
    },[loggingIn])
    return (
        <section className={"min-h-screen"}>
            <div className={'w-full h-20 bg-green-600'}>
                <div className={'container flex flex-row h-full w-full mx-auto items-center justify-start px-4'}>
                    <div className={"flex flex-row items-end gap-1"}>
                        <img src={"/giveaid-logo.svg"} alt={"Give Aid Logo"}/>
                        <span className={"text-sm font-bold text-white mb-1"}>
                    NGO
                </span>
                    </div>
                </div>
            </div>

            <section className="bg-white dark:bg-gray-900 min-h-screen">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                   <div className={"my-10"}></div>
                    <p className="md:mb-4 text-4xl mb-2 font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Unite for Impact:</p>

                    <div
                        className={"flex flex-col lg:flex-row -space-y-2 lg:space-y-0 mb-5 justify-center items-center"}>
                        <p className="text-4xl font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Join the Movement of</p> &nbsp; &nbsp;
                        <strong
                            className={"text-4xl font-extrabold leading-loose tracking-tight leading-none md:text-5xl lg:text-6xl text-green-600"}> Empowered NGOs</strong>
                    </div>
                    <p className={"max-w-lg mx-auto  lg:text-lg"}>Transform Lives and Communities with Your Dedicated Work: Sign Up Today to Receive Support from Caring Donors
                    </p>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"></p>
                    <div
                        className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <button onClick={() => setGetStartedModal(true)}
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                            Get Started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <a href="#"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                            </svg>
                            Watch video
                        </a>
                    </div>
                </div>
                <div>
                    <img className={"px-5 mx-auto"} src="/illus.svg" alt=""/>
                </div>
            </section>
            <Modal
                title={"Lets Connect!"}
                setModalState={setGetStartedModal}
                modalState={getStartedModal}
            >
                <div className="flex flex-col items-center justify-center gap-5 py-3">
                    <p className="text-md max-w-full text-center">
                        Keep our site spam-free by logging in
                    </p>
                    <GoogleButton type={"ngo"}/>
                    <p className="max-w-sm text-center text-sm">
                        By creating an account, you agree to Giveaid&apos;s{" "}
                        <a
                            href="/terms-of-service"
                            className="font-semibold text-blue-500 hover:underline"
                        >
                            Terms of Service
                        </a>
                        ,{" "}
                        <a
                            href="/privacy-policy"
                            className="font-semibold text-blue-500 hover:underline"
                        >
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                            href="/acceptable-use"
                            className="font-semibold text-blue-500 hover:underline"
                        >
                            Acceptable Use Policy
                        </a>
                        .
                    </p>
                </div>
            </Modal>
            <div className={"mx-5 text-center lg:text-start"}>
                <hr className="border-gray-200 my-8 dark:border-gray-700 "/>
                <div className={"flex flex-col space-y-3 mx-2"}>
                    <p className={"font-bold text-3xl text-gray-700 lg:text-4xl"}>How does it work <span
                        className={"text-green-500"}>?</span></p>
                    <p className={"lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Accusantium aliquid at autem
                        consequuntur culpa cumque deleniti deserunt eligendi et expedita fugiat fugit harum hic
                        in ipsam labore laborum magnam mollitia nam natus, odit officia pariatur placeat quae
                        quisquam ratione recusandae rem repudiandae rerum velit, veniam veritatis vero
                        voluptatum! Nemo, obcaecati.</p>
                </div>
            </div>

        </section>


    );
};

// NgoPage.pageLayout = NgoPageLayout;

export default NgoPage;
