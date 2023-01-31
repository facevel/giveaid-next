import React from "react";
import {toast} from "react-toastify";

export const LandingFormView = () => {
    return (
        <div className={"container mx-auto flex flex-col justify-center items-center"}>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <a href="#"
                       className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                       role="alert">
                        <span className="text-xs bg-green-600 rounded-full text-white px-4 py-1.5 mr-3">New</span>
                        <span className="text-sm font-medium">Realtime tracking of donations</span>
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <p className="md:mb-4 text-4xl font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Donate
                        Locally,</p>

                    <p className="md:mb-4 text-4xl font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Make
                        a difference <strong className={"text-green-600"}>Globally</strong></p>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"></p>
                    <div
                        className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a href="#"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                            Learn more
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </a>
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
                    <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                        <form className={"mt-7"} onSubmit={(e) => {
                            e.preventDefault();
                        }
                        }>
                            <div className="mb-6">
                                <div
                                    className="after:block after:bg-transparent after:border-r-2 after:border-dashed after:border-black after:w-[1px] after:h-10 after:mx-auto after:my-5">
                                    <label htmlFor="text"
                                           className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Pickup
                                        Location</label>
                                    <div className={"flex space-x-6 text-gray-500 justify-center items-center"}>
                                        <input type="email" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="Dwarka, New Delhi" />
                                    </div>
                                </div>

                                <label htmlFor="text"
                                       className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Items to
                                    Donate
                                </label>
                                <div className={"flex space-x-6 text-gray-500 justify-center items-center"}>
                                    <select id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@flowbite.com" >
                                        <option value="1">Food</option>
                                        <option value="2">Clothes</option>
                                        <option value="3">Books</option>
                                        <option value="4">Furniture</option>
                                        <option value="5">Other</option>
                                    </select>
                                </div>
                                <button onClick={() => {
                                    toast.success("Thank you for reaching out to us. We will get back to you soon.")
                                }}
                                        className="inline-flex my-5 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                                    Proceed to Donate
                                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}