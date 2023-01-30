// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import {
  RiHomeFill, RiHomeLine,
  RiNotification2Fill, RiNotification2Line,
  RiTruckFill, RiTruckLine,
  RiUserFill, RiUserLine
} from "react-icons/ri";
import { useRouter } from "next/router";
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
      icon: <RiTruckFill />,
      notSelectedIcon: <RiTruckLine />,
      link: "/tracking",
      name: "Tracking"
    },
    {
      icon: <RiNotification2Fill />,
      notSelectedIcon: <RiNotification2Line />,
      link: "/notification",
      name: "Notification"
    },
    {
      icon: <RiUserFill />,
      notSelectedIcon: <RiUserLine />,
      link: "/profile",
      name: "Profile"
    }
  ];

  return (
    <div className={""}>
      <nav className={'sticky top-0 w-full h-20 bg-green-500 flex flex-row items-center justify-center text-xl'}>
        <img src={'/giveaid-logo.svg'} alt={'Give Aid Logo'}/>
      </nav>
      <div className={"top-0 min-h-[calc(100vh)] w-full"}>
        {props.children}
      </div>
      <div
        className={
          "sticky bottom-0 flex h-20 w-full flex-row justify-evenly gap-4 rounded-t-2xl bg-gray-100 px-1 py-2 dark:bg-gray-900"
        }
      >
        {tabs.map((item, index) => {
          return (

            <div
              className={`flex h-full w-full flex-col gap-2 items-center justify-center rounded-3xl text-2xl outline-none 
              ${
                item.link == currentTab
                  ? "text-green-500 dark:text-green-100"
                  : "text-gray-900 dark:text-gray-400"
              }
              `}
              key={index}
            >
              <Link href={item.link}>
                <span>
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
  );
};

export default TabsLayout;
