import * as React from "react";
import {NgoPageLayout} from "layouts";
import {IoShirt} from "react-icons/io5";
import {FaBook, FaBriefcaseMedical} from "react-icons/fa";
import {MdToys} from "react-icons/md";
import {HiComputerDesktop} from "react-icons/hi2";
import {GiForkKnifeSpoon} from "react-icons/gi";

/**
 * "Clothing"
 * "Electronics"
 * "Toys"
 * "Books"
 * "Food"
 * "Medical";
 */

const DonationInventory = () => {

    const Inventory = [
        {
            title: "Clothing",
            icon: <IoShirt size={20} className={"flex justify-center items-center"}/>,
            count: 10
        }, {
            title: "Medical",
            icon: <FaBriefcaseMedical size={20} className={"flex justify-center items-center"}/>,
            count: 20
        }, {
            title: "Books",
            icon: <FaBook size={20} className={"flex justify-center items-center"}/>,
            count: 40
        }, {
            title: "Toys",
            icon: <MdToys size={20} className={"flex justify-center items-center"}/>,
            count: 150
        }, {
            title: "Electronics",
            icon: <HiComputerDesktop size={20} className={"flex justify-center items-center"}/>,
            count: 50
        },
        {
            title: "Food",
            icon: <GiForkKnifeSpoon size={20} className={"flex justify-center items-center"}/>,
            count: 20
        }
    ]

    return (
        <>
            <h1>Donation Inventory</h1>
            <div className={'grid grid-cols-6 gap-2'}>
                {
                    Inventory.map((item, index) => {

                        return (
                            <div className={'bg-gray-100 p-4 rounded-lg shadow-sm col-span-1 gap-2'} key={index}>
                                <div className={'flex flex-row items-center justify-between'}>
                                    <h1 className={'text-2xl font-bold'}>{item.title}</h1>
                                    {item.icon}
                                </div>
                                <div className={'flex flex-row items-center justify-between'}>
                                    <span className={'text-md'}>
                                    in stock:{item.count}
                                    </span>
                                    <span>
                                    <button
                                        className={'bg-green-500 text-white text-sm rounded-sm px-2 py-0.5'}>View</button>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    );
};

DonationInventory.pageLayout = NgoPageLayout;

export default DonationInventory;