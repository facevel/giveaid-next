// @flow
import * as React from "react";
import {useState} from "react";
import {TabsLayout} from "@/layout";
import {IoIosArrowDown} from "react-icons/all";

const Profile = () => {
    const [isDonoOpen, setDono] = useState(false)
    const [isAddressOpen, setAddress] = useState(false)

    const donoArr = [
        {
            imgSrc: 'https://unsplash.it/200/200/?random=test',
            imgAlt: '',
            donoTitle: 'To Kilkari Old Age Home',
            donoText: 'Clothes, Food'
        },
        {
            imgSrc: 'https://unsplash.it/200/200/?random=test',
            imgAlt: '',
            donoTitle: 'To Kilkari Old Age Home',
            donoText: 'Clothes, Food'
        },        {
            imgSrc: 'https://unsplash.it/200/200/?random=test',
            imgAlt: '',
            donoTitle: 'To Kilkari Old Age Home',
            donoText: 'Clothes, Food'
        }
    ]

    const addressArr = [
        {
            addressTitle: 'SMILE Delhi',
            addressText: '<>'
        },
        {
            addressTitle: 'Kilkari',
            addressText: '<>'
        },
        {
            addressTitle: 'Animal Shelter',
            addressText: '<>'
        }
    ]

    return (
        <div className={"flex flex-col items-center justify-center mx-auto h-screen"}>
            <div
                className="w-full -mt-20 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown"
                            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                            type="button">
                        <span className="sr-only">Open dropdown</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                    </button>
                    <div id="dropdown"
                         className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export
                                    Data</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-0 pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full border"
                         src="https://api.dicebear.com/5.x/personas/svg?seed=Lily"
                         alt="Bonnie image"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Nitin Verma</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Star Donor</span>
                    <div className="flex mt-4 space-x-3 md:mt-6 pb-6">
                        <a href="#"
                           className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">My
                            Donations
                        </a>
                        <a href="#"
                               className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                            Messages
                        </a>
                    </div>
                    <div
                        className={`w-full border-t border-gray-200 text-xl items-center`}>
                        <div className={"py-6 flex flex-row justify-between mx-6"}>
                        <span className={""}>
                            My Donations
                        </span>
                            <button className={`${isDonoOpen ? "rotate-180" : "rotate-0"} transition-all duration-100`}
                                    onClick={() => {
                                        setDono(!isDonoOpen)
                                    }}><IoIosArrowDown/>
                            </button>
                        </div>
                        { isDonoOpen &&
                        <div className={"flex flex-col py-2 w-full"}>
                            {
                                donoArr.map((entry, index) => {
                                    return(
                                        <div key={index} className={"border-t border-gray-200 py-2 flex flex-row justify-start items-center gap-x-2 mx-6"}>
                                            <img src={entry.imgSrc} alt={entry.imgAlt} className={"w-12 h-12 rounded-lg"}/>
                                            <div className={"flex flex-col text-sm justify-start"}>
                                                <span className={"font-medium"}>{entry.donoTitle}</span>
                                                <span className={"font-light tracking-tighter ml-1"}>{entry.donoText}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        }
                    </div>
                    <div
                        className={`w-full border-t border-gray-200 text-xl items-center`}>
                        <div className={"py-6 flex flex-row justify-between mx-6"}>
                        <span className={""}>
                            Saved Adresses
                        </span>
                            <button className={`${isAddressOpen ? "rotate-180" : "rotate-0"} transition-all duration-100`}
                                    onClick={() => {
                                        setAddress(!isAddressOpen)
                                    }}><IoIosArrowDown/>
                            </button>
                        </div>
                        { isAddressOpen &&
                            <div className={"flex flex-col py-2 w-full"}>
                                {
                                    addressArr.map((entry, index) => {
                                        return(
                                            <div key={index} className={"border-t border-gray-200 py-2 flex flex-row justify-start items-center gap-x-2 mx-6"}>
                                                <div className={"flex flex-col text-sm justify-start"}>
                                                    <span className={"font-medium"}>{entry.addressTitle}</span>
                                                    <span className={"font-light tracking-tighter ml-1"}>{entry.addressText}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

Profile.pageLayout = TabsLayout;

export default Profile;