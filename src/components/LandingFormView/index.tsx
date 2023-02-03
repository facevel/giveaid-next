import React, {useEffect} from "react";
import {GoogleButton, Modal} from "components";
import {useUserContext} from "src/firebase/authContext";
import {useRouter} from "next/router";

export const LandingFormView = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = React.useState(false)
    const {user} = useUserContext();

    useEffect(() => {
        if (user) {
            // setModalOpen(false)
            // router.push("/donate")
        }
    }, [user])

    return (
        <div className={"container mx-auto flex flex-col justify-center items-center "}>
            {modalOpen &&
                <Modal title={"Let's Start Donating"} setModalState={setModalOpen} modalState={modalOpen}>
                    <div className="py-3 flex flex-col gap-5 items-center justify-center">
                        <p className="max-w-full text-center text-md">
                            Keep our site spam-free by logging in
                        </p>
                        <GoogleButton/>
                        <p className="max-w-sm text-center text-sm">
                            By creating an account, you agree to Giveaid&apos;s <a href="/terms-of-service"
                                                                                   className="text-blue-500 hover:underline font-semibold">Terms
                            of Service</a>, <a href="/privacy-policy"
                                               className="text-blue-500 hover:underline font-semibold">Privacy
                            Policy</a> and <a href="/acceptable-use"
                                              className="text-blue-500 hover:underline font-semibold">Acceptable
                            Use Policy</a>.
                        </p>
                    </div>
                </Modal>
            }
            <section className="bg-white dark:bg-gray-900 min-h-screen">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <a href="#"
                       className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                       role="alert">
                        <span className="text-xs bg-green-600 rounded-full text-white px-4 py-1.5 mr-3">New</span>
                        <span className="text-sm font-medium">Realtime tracking of donations</span>
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </a>
                    <p className="md:mb-4 text-4xl mb-2 font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Donate
                        Locally,</p>

                    <div
                        className={"flex flex-col lg:flex-row -space-y-2 lg:space-y-0 mb-5 justify-center items-center"}>
                        <p className="text-4xl font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Make
                            a difference</p> &nbsp; &nbsp;
                        <strong
                            className={"text-4xl font-extrabold leading-loose tracking-tight leading-none md:text-5xl lg:text-6xl text-green-600"}>Globally</strong>
                    </div>
                    <p className={"max-w-lg mx-auto  lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Asperiores eius eum facilis odit qui
                        quia! Consequuntur ratione recusandae saepe sint.</p>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"></p>
                    <div
                        className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <button onClick={() => router.push('/donate')}
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

            <div className={"mx-5 text-center lg:text-start"}>
                <hr className="border-gray-200  my-8  dark:border-gray-700 "/>
                <div className={"flex flex-col space-y-3 mx-2"}>
                    <p className={"font-bold text-3xl text-gray-700 lg:text-4xl"}>How does it work <span
                        className={"text-green-500"}>?</span></p>
                    <p className={" lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Accusantium aliquid at autem
                        consequuntur culpa cumque deleniti deserunt eligendi et expedita fugiat fugit harum hic
                        in ipsam labore laborum magnam mollitia nam natus, odit officia pariatur placeat quae
                        quisquam ratione recusandae rem repudiandae rerum velit, veniam veritatis vero
                        voluptatum! Nemo, obcaecati.</p>
                </div>
            </div>

            <div className={"mx-5 text-center lg:text-start"}>
                <hr className="border-gray-200  my-8  dark:border-gray-700 "/>
                <div className={"flex flex-col space-y-3 mx-2"}>
                    <p className={"font-bold text-3xl text-gray-700 lg:text-4xl"}>How does it work <span
                        className={"text-green-500"}>?</span></p>
                    <p className={" lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Accusantium aliquid at autem
                        consequuntur culpa cumque deleniti deserunt eligendi et expedita fugiat fugit harum hic
                        in ipsam labore laborum magnam mollitia nam natus, odit officia pariatur placeat quae
                        quisquam ratione recusandae rem repudiandae rerum velit, veniam veritatis vero
                        voluptatum! Nemo, obcaecati.</p>
                </div>
            </div>
        </div>
    )
}