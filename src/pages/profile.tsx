// @flow
import * as React from "react";
import {useState} from "react";

import {IoIosArrowDown} from "react-icons/io";
import {useUserContext} from "@/firebase/authContext";
import {GoogleButton} from "components";
import {motion} from "framer-motion";
import {TabsLayout} from "layouts";

const Profile = () => {
    const [isDonoOpen, setDono] = useState(false);
    const [isAddressOpen, setAddress] = useState(false);

    const {user, logout} = useUserContext();

    const donoArr = [
        {
            imgSrc: "https://unsplash.it/200/200/?random=test",
            imgAlt: "",
            donoTitle: "To Kilkari Old Age Home",
            donoText: "Clothes, Food",
        },
        {
            imgSrc: "https://unsplash.it/200/200/?random=test",
            imgAlt: "",
            donoTitle: "To Kilkari Old Age Home",
            donoText: "Clothes, Food",
        },
        {
            imgSrc: "https://unsplash.it/200/200/?random=test",
            imgAlt: "",
            donoTitle: "To Kilkari Old Age Home",
            donoText: "Clothes, Food",
        },
    ];

    const addressArr = [
        {
            addressTitle: "SMILE Delhi",
            addressText: "<>",
        },
        {
            addressTitle: "Kilkari",
            addressText: "<>",
        },
        {
            addressTitle: "Animal Shelter",
            addressText: "<>",
        },
    ];

    return (
        <div
            className={"mx-auto flex h-screen flex-col items-center justify-start py-5"}
        >
            <div
                className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                <div className="flex justify-end px-4 pt-4">
                    <button
                        id="dropdownButton"
                        className="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        type="button"
                    >
                        <span className="sr-only">Open dropdown</span>
                        <svg
                            className="h-6 w-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                    </button>
                    <div
                        id="dropdown"
                        className="z-10 hidden w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700"
                    >
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Export Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-y-0 pb-10">
                    {
                        user ?
                            <>
                                <img
                                    className="mb-3 h-24 w-24 rounded-full border"
                                    src={user?.photoURL}
                                    alt="Bonnie image"
                                />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {user?.displayName}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </span>
                                <span className={'text-red-400 text-sm underline cursor-pointer'} onClick={logout}>
                  ( Logout )
                </span>
                            </>
                            :
                            <>
                                <h1>Login to Continue</h1>
                                <div className="mt-4 flex space-x-3 pb-6 md:mt-6">
                                    <GoogleButton/>
                                </div>
                            </>
                    }

                    <div className="mt-4 flex space-x-3 pb-6 md:mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg bg-green-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            My Donations
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                            Messages
                        </a>
                    </div>

                    <div
                        className={`w-full items-center border-t border-gray-200 text-xl overflow-hidden`}
                    >
                        <div className={"mx-6 flex flex-row justify-between py-6 z-50"}>
                            <span className={""}>My Donations</span>
                            <button
                                className={`${
                                    isDonoOpen ? "rotate-180" : "rotate-0"
                                } transition-all duration-100`}
                                onClick={() => {
                                    setDono(!isDonoOpen);
                                }}
                            >
                                <IoIosArrowDown/>
                            </button>
                        </div>
                        {isDonoOpen && (
                            <div className={"z-10 flex w-full flex-col py-2"}>
                                {donoArr.map((entry, index) => {
                                    return (

                                        <motion.div key={index}
                                                    initial={{opacity: 0, x: 200}}
                                                    animate={{opacity: 1, x: 0}}
                                                    exit={{opacity: 0, x: 200}}
                                                    transition={{duration: index * 0.07 + 0.3, type: "spring"}}
                                                    className={"z-10 flex w-full flex-col py-2"}
                                        >
                                            <div className={
                                                "mx-6 flex flex-row items-center justify-start gap-x-2 border-t border-gray-200 py-2"
                                            }
                                            >
                                                <img
                                                    src={entry.imgSrc}
                                                    alt={entry.imgAlt}
                                                    className={"h-12 w-12 rounded-lg z-0"}
                                                />
                                                <div className={"flex flex-col justify-start text-sm"}>
                                                    <span className={"font-medium"}>{entry.donoTitle}</span>
                                                    <span className={"ml-1 font-light tracking-tighter"}>
                          {entry.donoText}
                        </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div
                        className={`w-full items-center border-t border-gray-200 text-xl`}
                    >
                        <div className={"mx-6 flex flex-row justify-between py-6"}>
                            <span className={""}>Saved Adresses</span>
                            <button
                                className={`${
                                    isAddressOpen ? "rotate-180" : "rotate-0"
                                } transition-all duration-100`}
                                onClick={() => {
                                    setAddress(!isAddressOpen);
                                }}
                            >
                                <IoIosArrowDown/>
                            </button>
                        </div>
                        {isAddressOpen && (
                            <div className={"flex w-full flex-col py-2"}>
                                {addressArr.map((entry, index) => {
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{opacity: 0, x: 200}}
                                            animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: 200}}
                                            transition={{duration: index * 0.07 + 0.3, type: "spring"}}
                                            className={"z-10 flex w-full flex-col py-2"}

                                        >
                                            <div

                                                className={
                                                    "mx-6 flex flex-row items-center justify-start gap-x-2 border-t border-gray-200 py-2"
                                                }
                                            >
                                                <div className={"flex flex-col justify-start text-sm"}>
                        <span className={"font-medium"}>
                          {entry.addressTitle}
                        </span>
                                                    <span className={"ml-1 font-light tracking-tighter"}>
                          {entry.addressText}
                        </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                    </div>
                    )}
                </div>
            </div>
        </div>
</div>
)
    ;
};

Profile.pageLayout = TabsLayout;

export default Profile;
