// @flow
import * as React from "react";
import {useEffect, useState} from "react";
import {
    RiHomeFill,
    RiHomeLine,
    RiNotification2Fill,
    RiNotification2Line,
    RiTruckFill,
    RiTruckLine,
    RiUserFill,
    RiUserLine
} from "react-icons/ri";
import {useRouter} from "next/router";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
};

const TabsLayout = (props: Props) => {

    const router = useRouter();
    const [currentTab, setCurrentTab] = useState("");


    useEffect(() => {
        //check url and set the first link to current tab
        setCurrentTab(router.pathname);
    }, [router]);


    const tabs = [
        {
            icon: <RiHomeFill/>,
            notSelectedIcon: <RiHomeLine/>,
            link: "/",
            name: "Home"
        },
        {
            icon: <RiTruckFill/>,
            notSelectedIcon: <RiTruckLine/>,
            link: "/tracking",
            name: "Tracking"
        },
        {
            icon: <RiNotification2Fill/>,
            notSelectedIcon: <RiNotification2Line/>,
            link: "/notification",
            name: "Notification"
        },
        {
            icon: <RiUserFill/>,
            notSelectedIcon: <RiUserLine/>,
            link: "/profile",
            name: "Profile"
        }
    ];

    return (
        <div className={"relative"}>
            <nav
                className={'sticky top-0 w-full h-20 bg-green-600 flex flex-row items-center justify-center text-xl z-20 drop-shadow-xl border-b-2 border-green-700'}>
                <img src={'/giveaid-logo.svg'} alt={'Give Aid Logo'}/>
            </nav>
            <div className={"min-h-[calc(100vh-20rem)] mb-20 w-full mx-auto"}>
                {props.children}
            </div>

            <div className={'fixed bottom-0 z-40 h-20 w-full bg-gray-100 dark:bg-gray-900 mx-auto rounded-t-2xl'}>
                <div
                    className={
                        "bg-gray-100 px-1 py-2 dark:bg-gray-900 max-w-md mx-auto flex flex-row justify-evenly gap-4 rounded-t-2xl"
                    }
                >
                    {tabs.map((item, index) => {
                        return (

                            <div
                                className={` flex h-full w-full flex-col gap-0.5 items-center justify-center rounded-3xl text-2xl outline-none 
                  ${
                                    item.link == currentTab
                                        ? "text-green-500 dark:text-green-100"
                                        : "text-gray-900 dark:text-gray-400"
                                }
                  `}
                                key={index}
                            >
                                <Link href={item.link}
                                      className={`${(currentTab === item.link) ? " w-full bg-green-200" : "w-0"} px-4 py-1 ease-out transition-all duration-300 rounded-full flex flex-row items-center justify-center`}>
                    <span className={"mx-auto transition-none duration-75"}>
                      {
                          item.link == currentTab ? item.icon : item.notSelectedIcon
                      }
                    </span>
                                </Link>
                                <span className={"text-xs"}>{item.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TabsLayout;
